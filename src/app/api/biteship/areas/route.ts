import { NextRequest, NextResponse } from "next/server";

const BITESHIP_BASE = "https://api.biteship.com";
const API_KEY = process.env.BITESHIP_API_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input || input.length < 2) {
    return NextResponse.json({ success: false, areas: [] });
  }

  try {
    const res = await fetch(
      `${BITESHIP_BASE}/v1/maps/areas?countries=ID&input=${encodeURIComponent(input)}&type=single`,
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Biteship areas error:", err);
    return NextResponse.json({ success: false, areas: [] }, { status: 500 });
  }
}
