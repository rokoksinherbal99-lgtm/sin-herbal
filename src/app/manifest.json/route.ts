import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

  const manifest = {
    name: "Sin Herbal",
    short_name: "Sin Herbal",
    description: "Toko herbal alami berkualitas. Pesan via WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    orientation: "portrait-primary",
    icons: [
      { src: "/images/TRST.png", sizes: "any", type: "image/png", purpose: "any maskable" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    categories: ["shopping", "health", "lifestyle"],
    lang: "id-ID",
    dir: "ltr",
  };

  return NextResponse.json(manifest);
}
