import { NextRequest, NextResponse } from "next/server";
import { checkCSRF } from "@/lib/api/security";

const BITESHIP_BASE = "https://api.biteship.com";
const API_KEY = process.env.BITESHIP_API_KEY || "";

export async function POST(request: NextRequest) {
  const csrfRes = checkCSRF(request);
  if (csrfRes) return csrfRes;
  try {
    const body = await request.json();
    const { origin_area_id, destination_area_id, weight } = body;

    if (!origin_area_id || !destination_area_id || !weight) {
      return NextResponse.json(
        { success: false, message: "Parameter tidak lengkap" },
        { status: 400 }
      );
    }

    const res = await fetch(`${BITESHIP_BASE}/v1/rates/couriers`, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin_area_id,
        destination_area_id,
        couriers: "jnt",
        items: [
          {
            name: "Paket Sin Herbal",
            value: 50000,
            weight: Math.round(weight * 1000),
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, message: data.message || data.error || "Gagal mendapatkan tarif" },
        { status: 400 }
      );
    }

    const originInfo = data.origin;
    const destinationInfo = data.destination;
    const jntPricing = (data.pricing || []).filter(
      (p: any) => p.courier_code === "jnt"
    );

    return NextResponse.json({
      success: true,
      origin: originInfo,
      destination: destinationInfo,
      pricing: jntPricing,
    });
  } catch (err) {
    console.error("Biteship rates error:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
