import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description: "Lihat koleksi lengkap produk herbal Sin Herbal. Herbal alami berkualitas untuk kesehatan Anda.",
};

export default async function ProductsPage() {
  const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
  const allCategories = await db.select().from(categories);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800">Semua Produk</h1>
      <p className="mt-2 text-gray-600">Jelajahi koleksi produk herbal kami.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {allProducts.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            slug={p.slug}
            price={p.price}
            image={p.images}
          />
        ))}
      </div>

      {allProducts.length === 0 && (
        <p className="mt-12 text-center text-gray-400">Belum ada produk tersedia.</p>
      )}
    </div>
  );
}
