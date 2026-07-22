import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

const sql = postgres("postgresql://neondb_owner:npg_NeTgDFEd53zk@ep-autumn-bird-aiy75440-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require");
const db = drizzle(sql);

const TSI_BASE = "https://www.tridayasinergi.com/images/content/logo";

const tsiData: Record<string, { image: string; price: number; description: string; type?: string }> = {
  "sin platinum tsi": {
    image: `${TSI_BASE}/SPT.png`,
    price: 17500,
    description: "SIN Platinum TSI pada awal kemunculannya adalah dengan Merk Sin Platinum Special, dikarenakan perubahan pada regulasi, produk ini telah mengalami dua kali perubahan nama merk. Produk Sigaret Kretek Tangan (SKT) pertama yang dipercayakan oleh PR. UD. Putra Bintang Timur untuk dipasarkan oleh PT. Tridaya Sinergi Indonesia.",
    type: "SKT",
  },
  "sin kujang mas tsi": {
    image: `${TSI_BASE}/SKM.png`,
    price: 17500,
    description: "SIN Kujang Mas TSI bersama dengan SIN Platinum TSI merupakan produk Sigaret Kretek Tangan pertama yang dipercayakan oleh PR. UD. Putra Bintang Timur untuk dipasarkan oleh PT. Tridaya Sinergi Indonesia. Aroma kretek khas Nusantara dengan cita rasa yang unik.",
    type: "SKT",
  },
  "sin sinergi mind": {
    image: `${TSI_BASE}/SM.png`,
    price: 26000,
    description: "Produk variant Filter pertama yang diluncurkan untuk Mitra TSI, SIN Sinergi Mind merupakan variant produk Mild yang memiliki rasa yang dapat bersaing dengan produk-produk konvensional. Sigaret Kretek Mesin (SKM) dengan cita rasa mild yang halus.",
    type: "SKM",
  },
  "sin provost 19 tsi": {
    image: `${TSI_BASE}/SPV19.png`,
    price: 24500,
    description: "SIN Provost 19 TSI merupakan produk unggulan dari Sang Peracik KH. R. Abdul Malik yang dibuat khusus untuk dipasarkan oleh PT. Tridaya Sinergi Indonesia. Produk terbaik dari variant SIN yang pernah ada. Sigaret Kretek Tangan premium.",
    type: "SKT",
  },
  "sin sapu jagat": {
    image: `${TSI_BASE}/SPJ.png`,
    price: 24500,
    description: "Berdasarkan permintaan pasar TSI, maka KH. R. Abdul Malik membuat produk yang tidak kalah dengan produk-produk sebelumnya dengan Harga Jual yang sangat terjangkau. Sigaret Kretek Tangan dengan kualitas terbaik.",
    type: "SKT",
  },
  "sin trust menthol": {
    image: `${TSI_BASE}/TRSTM.png`,
    price: 27000,
    description: "Pengembangan dari SIN Trust dengan penambahan Menthol, membuat SIN Trust Menthol memiliki cita rasa khusus yang sangat digemari oleh penikmat Olahan Tembakau Putih Menthol. Sigaret Kretek Mesin dengan sensasi menthol yang menyegarkan.",
    type: "SKM",
  },
  "sin platinum filter": {
    image: `${TSI_BASE}/SPF.png`,
    price: 30500,
    description: "Produk Sigaret Kretek Mesin Reguler, untuk merangkul konsumen yang terbiasa dengan Produk Filter Reguler. SIN Platinum Filter memiliki cita rasa yang khas dan dikemas dengan apik dan mudah untuk dibawa.",
    type: "SKM",
  },
  "sin sinergi mind menthol": {
    image: `${TSI_BASE}/SMM.png`,
    price: 15000,
    description: "Merupakan pengembangan pada variant produk Mild dengan penambahan Menthol yang menambah cita rasa menjadi luar biasa dan lebih mantap. Sigaret Kretek Mesin Mild dengan sentuhan menthol.",
    type: "SKM",
  },
  "sin trust": {
    image: `${TSI_BASE}/TRST.png`,
    price: 31000,
    description: "SIN Trust adalah produk olahan tembakau yang menggunakan tembakau murni dan merupakan hadiah dari KH. R. Abdul Malik untuk PT. Tridaya Sinergi Indonesia atas amanahnya selama ini. Sigaret Kretek Mesin premium.",
    type: "SKM",
  },
  "sin kujang mas filter": {
    image: `${TSI_BASE}/SKMF.png`,
    price: 24500,
    description: "SIN Kujang Mas Filter diluncurkan pada Bulan Ramadhan 1438 H. Produk ini diciptakan atas banyaknya permintaan dari para pecinta SIN KUJANG MAS yang menginginkan dalam varian Filter. Sigaret Kretek Mesin dengan cita rasa khas kretek.",
    type: "SKM",
  },
  "sin krakatau": {
    image: `${TSI_BASE}/SKRA.png`,
    price: 57500,
    description: "SIN Krakatau diluncurkan pada tanggal 17 Agustus 2018 di Kota Serang. Produk ini merupakan produk yang memiliki keunggulan-keunggulan yang ada pada produk-produk sebelumnya. Sigaret Kretek Tangan premium dengan kualitas terbaik.",
    type: "SKT",
  },
  "sin new normal org": {
    image: `${TSI_BASE}/SNNORG.png`,
    price: 13500,
    description: "SIN NEW NORMAL ORG lahir di tengah Pandemi Covid-19 sebagai bentuk empati untuk memberikan harga yang lebih terjangkau. Sin New Normal mengusung tagline NEW HOPE. Sigaret Kretek Tangan dengan harga terjangkau.",
    type: "SKT",
  },
  "sin new normal mind": {
    image: `${TSI_BASE}/SNNMND.png`,
    price: 23000,
    description: "SIN NEW NORMAL MIND lahir di tengah Pandemi Covid-19 sebagai bentuk empati untuk memberikan harga yang lebih terjangkau. Sin New Normal mengusung tagline NEW PASSION. Sigaret Kretek Mesin dengan cita rasa mild.",
    type: "SKM",
  },
  "sin new normal menthol": {
    image: `${TSI_BASE}/SNNMENTHOL.png`,
    price: 27500,
    description: "SIN NEW NORMAL MENTHOL lahir di tengah Pandemi Covid-19 sebagai bentuk empati untuk memberikan harga yang lebih terjangkau. Sin New Normal mengusung tagline NEW YOU. Dengan HARAPAN baru semoga juga melahirkan SEMANGAT baru.",
    type: "SKM",
  },
  "sin precision white": {
    image: `${TSI_BASE}/PRECISION_WHITE.png`,
    price: 24500,
    description: "SIN Precision White merupakan produk Sigaret Kretek Tangan dengan desain yang ergonomis dan solid. Hadir dengan warna putih yang elegan, memberikan pengalaman merokok yang berbeda.",
    type: "SKT",
  },
  "sin precision": {
    image: `${TSI_BASE}/PRECISION_GREEN.png`,
    price: 25500,
    description: "Perkenalkan produk premium kami SIN Precision, dimana kualitas bertemu dengan keakuratan. Kami bangga memilih bahan terbaik untuk menciptakan produk olahan tembakau non filter menggunakan tembakau Srintil, salah satu tembakau terbaik di Indonesia yang membuat SIN Precision terasa uniknya dibanding produk lainnya. -From Green to Great-",
    type: "SKT",
  },
  "kopi mana kopi": {
    image: "https://www.tridayasinergi.com/images/content/prod_kmk.jpg",
    price: 57600,
    description: "Sebuah racikan kopi yang dipadukan dengan jahe, madu, adas, kapulaga dalam komposisi yang PAS. Melahirkan cita rasa yang unik untuk memenuhi kebutuhan kafein Anda sekaligus menjaga daya tahan tubuh. -Nikmat yang Pertama, Sehat yang Utama-",
    type: "Kopi",
  },
  "kopi original": {
    image: "https://www.tridayasinergi.com/images/content/prod_korg.jpg",
    price: 40000,
    description: "Dibuat dari 100% biji kopi pilihan tanpa pemanis buatan dengan tambahan madu asli, mempertahankan cita rasa kopi asli dengan rasa manis yang otentik. -Hitamnya Bikin Paham-",
    type: "Kopi",
  },
  "sin sinergi encode": {
    image: `${TSI_BASE}/SINENC.png`,
    price: 30000,
    description: "Hasil peracikan dengan formula spesial yang tidak akan kamu temukan dimana-mana, dengan ekstrak sari buah nanas yang membawa kesegaran, sehingga cuma kamu yang bisa menikmati cita rasa energik ini. Sigaret Kretek Mesin dengan rasa nanas yang unik.",
    type: "SKM",
  },
};

async function main() {
  const rows = await db.select().from(products);
  let updated = 0;

  for (const product of rows) {
    const key = product.name.toLowerCase().trim();
    const tsi = tsiData[key];

    if (!tsi) {
      console.log(`SKIP (no match): ${product.name}`);
      continue;
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (tsi.image && product.images !== tsi.image) {
      updates.images = tsi.image;
    }
    if (tsi.price && product.price !== tsi.price) {
      updates.price = tsi.price;
    }
    if (tsi.description && product.description !== tsi.description) {
      updates.description = tsi.description;
    }

    if (Object.keys(updates).length > 1) {
      await db.update(products).set(updates as any).where(eq(products.id, product.id));
      const changes = Object.keys(updates).filter(k => k !== "updatedAt");
      console.log(`UPDATED: ${product.name} [${changes.join(", ")}]`);
      updated++;
    } else {
      console.log(`OK (no change): ${product.name}`);
    }
  }

  console.log(`\nDone. ${updated}/${rows.length} products updated.`);
  await sql.end();
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
