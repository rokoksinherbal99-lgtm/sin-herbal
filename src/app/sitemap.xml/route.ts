import { db } from "@/db";
import { products } from "@/db/schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

export const dynamic = "force-dynamic";

export async function GET() {
  const allProducts = await db.select().from(products);

  const urls = [
    { loc: "", priority: "1.0", changefreq: "daily" },
    { loc: "/products", priority: "0.9", changefreq: "daily" },
    { loc: "/cart", priority: "0.3", changefreq: "monthly" },
    { loc: "/checkout", priority: "0.3", changefreq: "monthly" },
    ...allProducts.map((p) => ({
      loc: `/products/${p.slug}`,
      priority: "0.8",
      changefreq: "weekly" as const,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${BASE_URL}${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
