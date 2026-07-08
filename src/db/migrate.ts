import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const createTablesSQL = `
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  images TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  product_type TEXT NOT NULL DEFAULT 'Herbal',
  manufacturer TEXT DEFAULT 'PR UD Putra Bintang Timur, Malang',
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total INTEGER NOT NULL,
  payment_id TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id),
  product_id TEXT NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
);
`;

export async function migrate() {
  await sql.unsafe(createTablesSQL);
}

export async function seed() {
  const existingCats = await db.select().from(schema.categories);
  if (existingCats.length > 0) return;

  await db.insert(schema.categories).values([
    { id: "cat-1", name: "Rokok Herbal", slug: "rokok-herbal" },
    { id: "cat-2", name: "Minuman & Suplemen", slug: "minuman-suplemen" },
  ]);

  await db.insert(schema.products).values([
    { id: "p1", name: "Rokok Sin Herbal Original", slug: "rokok-sin-herbal-original", description: "Rokok herbal original dengan campuran bahan alami pilihan. Dikemas secara tradisional dengan komposisi herbal premium yang memberikan rasa khas dan nikmat. Produk legal terdaftar di Bea dan Cukai.", price: 25000, images: "/images/product-1.svg", categoryId: "cat-1", productType: "Rokok Herbal SKT", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 50, featured: true },
    { id: "p2", name: "Rokok Sin Herbal Menthol", slug: "rokok-sin-herbal-menthol", description: "Varian menthol yang menyegarkan dengan perpaduan herbal alami. Memberikan sensasi dingin dan nikmat di setiap hisapan. Cocok untuk penggemar rasa menthol.", price: 27000, images: "/images/product-2.svg", categoryId: "cat-1", productType: "Rokok Herbal SKM", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 40, featured: true },
    { id: "p3", name: "Rokok Sin Herbal Light", slug: "rokok-sin-herbal-light", description: "Varian light dengan kadar herbal ringan dan rasa yang lembut. Produk unggulan untuk mereka yang menginginkan pengalaman merokok herbal yang lebih ringan.", price: 23000, images: "/images/product-3.svg", categoryId: "cat-1", productType: "Rokok Herbal SKT", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 60, featured: true },
    { id: "p4", name: "Teh Herbal Sin", slug: "teh-herbal-sin", description: "Teh herbal khas Sin Herbal dengan campuran rempah-rempah pilihan. Nikmat disajikan hangat, cocok untuk menemani santai Anda.", price: 15000, images: "/images/product-4.svg", categoryId: "cat-2", productType: "Minuman Herbal", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 100, featured: true },
    { id: "p5", name: "Minyak Herbal Sin", slug: "minyak-herbal-sin", description: "Minyak herbal untuk pemijatan dan terapi alami. Terbuat dari ekstrak bahan-bahan herbal pilihan yang memberikan rasa hangat dan nyaman.", price: 35000, images: "/images/product-5.svg", categoryId: "cat-2", productType: "Minyak Herbal", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 30, featured: false },
    { id: "p6", name: "Kapsul Herbal Sin", slug: "kapsul-herbal-sin", description: "Kapsul herbal ekstrak alami untuk menjaga daya tahan tubuh. Dikemas dalam bentuk kapsul yang praktis dan mudah dikonsumsi sehari-hari.", price: 45000, images: "/images/product-6.svg", categoryId: "cat-2", productType: "Suplemen", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 25, featured: false },
  ]);
}

export async function teardown() {
  await sql.unsafe(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
  `);
}
