import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL);
try {
  const rows = await sql`SELECT name, images, featured FROM products ORDER BY created_at DESC LIMIT 10`;
  for (const r of rows) {
    const img = r.images ? r.images.slice(0, 80) : '(empty)';
    console.log(`${r.name} | featured=${r.featured} | ${img}`);
  }
} catch(e) {
  console.error('Error:', e.message);
}
process.exit(0);
