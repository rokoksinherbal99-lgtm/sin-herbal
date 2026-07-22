import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

const sql = postgres("postgresql://neondb_owner:npg_NeTgDFEd53zk@ep-autumn-bird-aiy75440-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require");
const db = drizzle(sql);

const TSI = "https://www.tridayasinergi.com/images/content/logo";

const remaining = [
  { name: "Kopi Original", image: "https://www.tridayasinergi.com/images/content/prod_korg.jpg", price: 40000, description: "Dibuat dari 100% biji kopi pilihan tanpa pemanis buatan dengan tambahan madu asli, mempertahankan cita rasa kopi asli dengan rasa manis yang otentik. -Hitamnya Bikin Paham-" },
  { name: "Kopi Mana Kopi", image: "https://www.tridayasinergi.com/images/content/prod_kmk.jpg", price: 57600, description: "Sebuah racikan kopi yang dipadukan dengan jahe, madu, adas, kapulaga dalam komposisi yang PAS. Melahirkan cita rasa yang unik untuk memenuhi kebutuhan kafein Anda sekaligus menjaga daya tahan tubuh. -Nikmat yang Pertama, Sehat yang Utama-" },
  { name: "Sin Precision White", image: `${TSI}/PRECISION_WHITE.png`, price: 24500, description: "SIN Precision White merupakan produk Sigaret Kretek Tangan dengan desain yang ergonomis dan solid. Hadir dengan warna putih yang elegan, memberikan pengalaman merokok yang berbeda." },
  { name: "Sin New Normal Menthol", image: `${TSI}/SNNMENTHOL.png`, price: 27500, description: "SIN NEW NORMAL MENTHOL lahir di tengah Pandemi Covid-19 sebagai bentuk empati untuk memberikan harga yang lebih terjangkau. Sin New Normal mengusung tagline NEW YOU. Dengan HARAPAN baru semoga juga melahirkan SEMANGAT baru." },
  { name: "Sin New Normal Mind", image: `${TSI}/SNNMND.png`, price: 23000, description: "SIN NEW NORMAL MIND lahir di tengah Pandemi Covid-19 sebagai bentuk empati untuk memberikan harga yang lebih terjangkau. Sin New Normal mengusung tagline NEW PASSION. Sigaret Kretek Mesin dengan cita rasa mild." },
  { name: "Sin New Normal ORG", image: `${TSI}/SNNORG.png`, price: 13500, description: "SIN NEW NORMAL ORG lahir di tengah Pandemi Covid-19 sebagai bentuk empati untuk memberikan harga yang lebih terjangkau. Sin New Normal mengusung tagline NEW HOPE. Sigaret Kretek Tangan dengan harga terjangkau." },
];

async function main() {
  for (const item of remaining) {
    const [existing] = await db.select().from(products).where(eq(products.name, item.name)).limit(1);
    if (!existing) {
      console.log(`NOT FOUND: ${item.name}`);
      continue;
    }
    await db.update(products).set({
      images: item.image,
      price: item.price,
      description: item.description,
      updatedAt: new Date(),
    }).where(eq(products.id, existing.id));
    console.log(`UPDATED: ${item.name}`);
  }
  console.log("Done.");
  await sql.end();
}
main().catch(console.error);
