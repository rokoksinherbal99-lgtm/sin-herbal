import { NextRequest, NextResponse } from "next/server";

const CDN = "https://cdn.jsdelivr.net/gh/izzulabadi/api-wilayah-indonesia-2026@v1.0.4/api";

async function fetchJson(url: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const districtName = searchParams.get("district");
  const cityName = searchParams.get("city");
  const provinceName = searchParams.get("province");

  if (!districtName || !cityName) {
    return NextResponse.json({ success: false, villages: [], error: "Parameter district dan city diperlukan" });
  }

  try {
    // Step 1: Find province
    let provinceId = "";
    if (provinceName) {
      const provinces = await fetchJson(`${CDN}/provinces.json`) as { id: string; name: string }[];
      const found = provinces.find((p) => p.name.toLowerCase() === provinceName.toLowerCase());
      if (found) provinceId = found.id;
    }

    // Step 2: Find regency/city
    const regenciesUrl = provinceId ? `${CDN}/regencies/${provinceId}.json` : `${CDN}/regencies.json`;
    const regencies = await fetchJson(regenciesUrl) as { id: string; provinceId: string; name: string }[];
    const normalize = (s: string) => s.toLowerCase().replace(/^(kota|kabupaten|kab\.)\s*/i, "").replace(/\s+/g, "");
    const city = regencies.find((r) => normalize(r.name) === normalize(cityName));
    if (!city) {
      return NextResponse.json({ success: false, villages: [], error: `Kota ${cityName} tidak ditemukan` });
    }

    // Step 3: Find district
    const districts = await fetchJson(`${CDN}/districts/${city.id}.json`) as { id: string; regencyId: string; name: string }[];
    const district = districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
    if (!district) {
      return NextResponse.json({ success: false, villages: [], error: `Kecamatan ${districtName} tidak ditemukan` });
    }

    // Step 4: Fetch villages
    const villages = await fetchJson(`${CDN}/villages/${district.id}.json`) as { id: string; districtId: string; name: string }[];
    const names = villages.map((v) => v.name).sort((a, b) => a.localeCompare(b, "id"));

    return NextResponse.json({ success: true, villages: names.map((n) => ({ name: n })) });

  } catch (e: any) {
    return NextResponse.json({ success: false, villages: [], error: e.message });
  }
}
