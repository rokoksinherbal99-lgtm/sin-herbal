import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

async function main() {
  await db.insert(schema.categories).values([
    { id: "cat-1", name: "Herbal Premium", slug: "herbal-premium" },
    { id: "cat-2", name: "Herbal Tradisional", slug: "herbal-tradisional" },
  ]);

  await db.insert(schema.products).values([
    { id: "p1", name: "Rokok Sin Herbal Original", slug: "rokok-sin-herbal-original", description: "Rokok herbal original dengan campuran bahan alami pilihan.", price: 25000, images: "/images/product-1.jpg", categoryId: "cat-1", stock: 50, featured: true },
    { id: "p2", name: "Rokok Sin Herbal Menthol", slug: "rokok-sin-herbal-menthol", description: "Varian menthol yang menyegarkan.", price: 27000, images: "/images/product-2.jpg", categoryId: "cat-1", stock: 40, featured: true },
    { id: "p3", name: "Rokok Sin Herbal Light", slug: "rokok-sin-herbal-light", description: "Varian light dengan kadar herbal ringan.", price: 23000, images: "/images/product-3.jpg", categoryId: "cat-1", stock: 60, featured: true },
    { id: "p4", name: "Teh Herbal Sin", slug: "teh-herbal-sin", description: "Teh herbal khas Sin Herbal.", price: 15000, images: "/images/product-4.jpg", categoryId: "cat-2", stock: 100, featured: true },
    { id: "p5", name: "Minyak Herbal Sin", slug: "minyak-herbal-sin", description: "Minyak herbal untuk pemijatan.", price: 35000, images: "/images/product-5.jpg", categoryId: "cat-2", stock: 30, featured: false },
    { id: "p6", name: "Kapsul Herbal Sin", slug: "kapsul-herbal-sin", description: "Kapsul herbal ekstrak alami.", price: 45000, images: "/images/product-6.jpg", categoryId: "cat-2", stock: 25, featured: false },
  ]);

  console.log("Seed berhasil!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
