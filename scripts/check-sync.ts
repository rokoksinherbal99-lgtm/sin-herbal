import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { products } from "../src/db/schema";

const sql = postgres("postgresql://neondb_owner:npg_NeTgDFEd53zk@ep-autumn-bird-aiy75440-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require");
const db = drizzle(sql);

async function main() {
  const rows = await db.select({ name: products.name, price: products.price, images: products.images }).from(products);
  for (const r of rows) {
    const isTsi = r.images?.includes("tridayasinergi.com");
    console.log(`${isTsi ? "✓" : "✗"} ${r.name} | Rp${r.price.toLocaleString("id-ID")} | ${r.images?.substring(0, 60)}`);
  }
  await sql.end();
}
main().catch(console.error);
