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
  manufacturer TEXT DEFAULT 'PR UD Putra Bintang Timur, Malang',
  stock INTEGER NOT NULL DEFAULT 0,
  batch_number TEXT,
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

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  product_id TEXT REFERENCES products(id),
  city TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_visible ON testimonials(visible);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
`;

export async function migrate() {
  await sql.unsafe(createTablesSQL);
}

export async function seed() {
  const existingCats = await db.select().from(schema.categories);
  if (existingCats.length > 0) return;

  await db.insert(schema.categories).values([
    { id: "cat-1", name: "Kretek", slug: "kretek" },
    { id: "cat-2", name: "Filter", slug: "filter" },
    { id: "cat-3", name: "Kopi", slug: "kopi" },
  ]);

  const existingSettings = await db.select().from(schema.settings);
  if (existingSettings.length === 0) {
    await db.insert(schema.settings).values([
      { key: "wa_phone", value: "6281383863456" },
      { key: "address", value: "Ruko Sentra Niaga Blok A1 No. 5, Pakisaji, Malang 65162" },
      { key: "email", value: "info@sinherbal.com" },
      { key: "shipping_info", value: "Gratis ongkir untuk area tertentu (syarat & ketentuan berlaku)" },
      { key: "operating_hours", value: "Senin - Sabtu 08.00 - 17.00\nMinggu 09.00 - 14.00" },
    ]);
  }

  const existingTestimonials = await db.select().from(schema.testimonials);
  if (existingTestimonials.length === 0) {
    await db.insert(schema.testimonials).values([
      { id: "t1", name: "Budi Santoso", text: "Udah 3 bulan pake Rokok Sin Herbal Original, beneran beda sama rokok biasa. Rempahnya terasa, lebih enteng di tenggorokan.", productId: "p1", city: "Surabaya" },
      { id: "t2", name: "Dewi Lestari", text: "Awalnya ragu karena baru denger, tapi setelah coba Menthol rasanya seger banget. Cocok buat yang mau beralih ke herbal.", productId: "p2", city: "Jakarta" },
      { id: "t3", name: "Rina Wijaya", text: "Teh Herbal Sin jadi andalan tiap santai di rumah. Rasanya pas, gak pahit. Anak-anak juga suka. Recomended!", productId: "p4", city: "Bandung" },
      { id: "t4", name: "Agus Prasetyo", text: "Pesen Kapsul Herbal buat orang tua, katanya badannya terasa lebih bugar. Pengiriman cepet, packing rapi.", productId: "p6", city: "Malang" },
      { id: "t5", name: "Fitriani", text: "Minyak Herbalnya enak dipake pijat, hangatnya pas. Udah repeat order 2 kali. Pelayanannya ramah.", productId: "p5", city: "Semarang" },
      { id: "t6", name: "Hendra Gunawan", text: "Baru pertama beli rokok herbal online, barang sampai sesuai pesanan. Pasti bakal order lagi.", productId: "p3", city: "Medan" },
    ]);
  }

  await db.insert(schema.products).values([
    { id: "p1", name: "Rokok Sin Herbal Original", slug: "rokok-sin-herbal-original", description: "Rokok herbal original dengan campuran bahan alami pilihan. Dikemas secara tradisional dengan komposisi herbal premium yang memberikan rasa khas dan nikmat. Produk legal terdaftar di Bea dan Cukai.", price: 25000, images: "/images/product-1.svg", categoryId: "cat-1", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 50, featured: true },
    { id: "p2", name: "Rokok Sin Herbal Menthol", slug: "rokok-sin-herbal-menthol", description: "Varian menthol yang menyegarkan dengan perpaduan herbal alami. Memberikan sensasi dingin dan nikmat di setiap hisapan. Cocok untuk penggemar rasa menthol.", price: 27000, images: "/images/product-2.svg", categoryId: "cat-2", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 40, featured: true },
    { id: "p3", name: "Rokok Sin Herbal Light", slug: "rokok-sin-herbal-light", description: "Varian light dengan kadar herbal ringan dan rasa yang lembut. Produk unggulan untuk mereka yang menginginkan pengalaman merokok herbal yang lebih ringan.", price: 23000, images: "/images/product-3.svg", categoryId: "cat-2", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 60, featured: true },
    { id: "p4", name: "Kopi Mega Remeng", slug: "kopi-mega-remeng", description: "Kopi bubuk pilihan dengan racikan khas Sin Herbal. Nikmat disajikan hangat, cocok untuk menemani santai Anda.", price: 15000, images: "/images/product-4.svg", categoryId: "cat-3", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 100, featured: true },
    { id: "p5", name: "Minyak Herbal Sin", slug: "minyak-herbal-sin", description: "Minyak herbal untuk pemijatan dan terapi alami. Terbuat dari ekstrak bahan-bahan herbal pilihan yang memberikan rasa hangat dan nyaman.", price: 35000, images: "/images/product-5.svg", categoryId: "cat-3", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 30, featured: false },
    { id: "p6", name: "Kapsul Herbal Sin", slug: "kapsul-herbal-sin", description: "Kapsul herbal ekstrak alami untuk menjaga daya tahan tubuh. Dikemas dalam bentuk kapsul yang praktis dan mudah dikonsumsi sehari-hari.", price: 45000, images: "/images/product-6.svg", categoryId: "cat-3", manufacturer: "PR UD Putra Bintang Timur, Malang", stock: 25, featured: false },
  ]);
}

export async function migrateExisting() {
  // 1. Rename old categories
  await sql.unsafe(`UPDATE categories SET name='Kretek', slug='kretek' WHERE slug='rokok-herbal'`);
  await sql.unsafe(`UPDATE categories SET name='Filter', slug='filter' WHERE slug='minuman-suplemen'`);
  // 2. Add Kopi category
  await sql.unsafe(`INSERT INTO categories (id, name, slug) SELECT 'cat-3','Kopi','kopi' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug='kopi')`);
  // 3. Move SKM products from Kretek → Filter
  await sql.unsafe(`UPDATE products SET category_id='cat-2' WHERE category_id='cat-1' AND product_type='Rokok Herbal SKM'`);
  // 4. Move non-smoke/herbal products from Filter → Kopi
  await sql.unsafe(`UPDATE products SET category_id='cat-3' WHERE category_id='cat-2' AND product_type IN ('Minuman Herbal','Minyak Herbal','Suplemen')`);
  // 5. Update p4 (Teh Herbal Sin → Kopi Mega Remeng)
  await sql.unsafe(`UPDATE products SET name='Kopi Mega Remeng', slug='kopi-mega-remeng', description='Kopi bubuk pilihan dengan racikan khas Sin Herbal. Nikmat disajikan hangat, cocok untuk menemani santai Anda.', category_id='cat-3' WHERE id='p4'`);
  // 6. Drop old columns
  for (const col of ["compare_price", "product_type", "content_type", "has_smoke", "expiry_date"]) {
    try { await sql.unsafe(`ALTER TABLE products DROP COLUMN IF EXISTS ${col};`); } catch {}
  }
  // 7. Add order status constraint (idempotent via DO block)
  await sql.unsafe(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_status_check') THEN
        ALTER TABLE orders ADD CONSTRAINT orders_status_check
          CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'));
      END IF;
    END $$;
  `);
  // 8. Create sessions table for existing databases
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, created_at TIMESTAMP NOT NULL DEFAULT NOW(), expires_at TIMESTAMP NOT NULL)`);
  // 9. Add indexes for existing databases
  const indexes = [
    "CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)",
    "CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at)",
    "CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)",
    "CREATE INDEX IF NOT EXISTS idx_testimonials_visible ON testimonials(visible)",
    "CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at)",
    "CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at)",
    "CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)",
  ];
  for (const idx of indexes) {
    try { await sql.unsafe(idx); } catch {}
  }
}

export async function teardown() {
  await sql.unsafe(`
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS testimonials;
    DROP TABLE IF EXISTS audit_logs;
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS settings;
  `);
}
