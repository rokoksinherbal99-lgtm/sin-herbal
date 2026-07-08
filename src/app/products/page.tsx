import Link from "next/link";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import ProductGrid from "./product-grid";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const rows = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(desc(products.createdAt));
  const allProducts = rows.map(r => ({ ...r.products, category: r.categories }));
  const allCategories = await db.select().from(categories);

  const productsJson = JSON.parse(JSON.stringify(allProducts));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Produk</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-800">Semua Produk</h1>
      <p className="mt-2 text-gray-600">Jelajahi koleksi produk herbal kami.</p>
      <ProductGrid products={productsJson} categories={allCategories} />
    </div>
  );
}
