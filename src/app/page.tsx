import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import { Leaf, Shield, Truck, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await db.select().from(products).where(eq(products.featured, true)).limit(8);

  return (
    <>
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold text-green-900 md:text-5xl">
            Herbal Alami untuk Hidup Sehat
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Temukan berbagai produk herbal berkualitas untuk mendukung kesehatan Anda
            secara alami. 100% bahan alami pilihan.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Lihat Produk
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Produk Unggulan</h2>
            <Link href="/products" className="text-sm font-medium text-green-700 hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                image={p.images}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Leaf, title: "100% Alami", desc: "Bahan herbal pilihan terbaik" },
              { icon: Shield, title: "Terjamin", desc: "Produk berkualitas dan terpercaya" },
              { icon: Truck, title: "Gratis Ongkir", desc: "Untuk pembelian minimal Rp100rb" },
              { icon: Star, title: "Terbaik", desc: "Rekomendasi pelanggan setia" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <item.icon className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
