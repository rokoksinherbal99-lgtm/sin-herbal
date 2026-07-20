import { NextRequest, NextResponse } from "next/server";

const CDN = "https://cdn.jsdelivr.net/gh/izzulabadi/api-wilayah-indonesia-2026@v1.0.4/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const regencyId = searchParams.get("regencyId");

  if (!regencyId) {
    return NextResponse.json({ success: false, districts: [], error: "Parameter regencyId diperlukan" });
  }

  try {
    const res = await fetch(`${CDN}/districts/${regencyId}.json`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json() as { id: string; regencyId: string; name: string }[];
    const districts = data.map((d) => ({ id: d.id, name: d.name }));
    return NextResponse.json({ success: true, districts });
  } catch (e: any) {
    return NextResponse.json({ success: false, districts: [], error: e.message });
  }
}
