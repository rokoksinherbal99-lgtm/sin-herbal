import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function main() {
  const catId = "cat-1";
  const cat2Id = "cat-2";

  await db.insert(schema.categories).values([
    { id: catId, name: "Herbal Premium", slug: "herbal-premium" },
    { id: cat2Id, name: "Herbal Tradisional", slug: "herbal-tradisional" },
  ]);

  await db.insert(schema.products).values([
    { id: "p1", name: "Rokok Sin Herbal Original", slug: "rokok-sin-herbal-original", description: "Rokok herbal original dengan campuran bahan alami pilihan.", price: 25000, images: "/images/product-1.jpg", categoryId: catId, stock: 50, featured: true },
    { id: "p2", name: "Rokok Sin Herbal Menthol", slug: "rokok-sin-herbal-menthol", description: "Varian menthol yang menyegarkan.", price: 27000, images: "/images/product-2.jpg", categoryId: catId, stock: 40, featured: true },
    { id: "p3", name: "Rokok Sin Herbal Light", slug: "rokok-sin-herbal-light", description: "Varian light dengan kadar herbal ringan.", price: 23000, images: "/images/product-3.jpg", categoryId: catId, stock: 60, featured: true },
    { id: "p4", name: "Teh Herbal Sin", slug: "teh-herbal-sin", description: "Teh herbal khas Sin Herbal.", price: 15000, images: "/images/product-4.jpg", categoryId: cat2Id, stock: 100, featured: true },
    { id: "p5", name: "Minyak Herbal Sin", slug: "minyak-herbal-sin", description: "Minyak herbal untuk pemijatan.", price: 35000, images: "/images/product-5.jpg", categoryId: cat2Id, stock: 30, featured: false },
    { id: "p6", name: "Kapsul Herbal Sin", slug: "kapsul-herbal-sin", description: "Kapsul herbal ekstrak alami.", price: 45000, images: "/images/product-6.jpg", categoryId: cat2Id, stock: 25, featured: false },
  ]);

  console.log("Seed berhasil!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
