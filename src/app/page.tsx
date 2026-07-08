import Link from "next/link";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import HomeFAQ from "@/components/HomeFAQ";
import { Leaf, Shield, Truck, Star, ChevronRight, Sparkles, Package, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await db.select().from(products).where(eq(products.featured, true)).limit(8);
  const allCategories = await db.select().from(categories);

  return (
    <>
      {/* Hero */}
      <section className="hero-pattern relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-200 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Distributor Resmi Produk Herbal
            </span>
          </div>
          <h1 className="mt-6 animate-fade-in-up stagger-1 text-4xl font-extrabold leading-tight text-white md:text-6xl md:leading-tight">
            Herbal Alami
            <br />
            <span className="bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">untuk Hidup Sehat</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-in-up stagger-2 text-lg text-emerald-100/80">
            100% bahan alami pilihan. Harga terjangkau, kualitas terbaik.
          </p>
          <div className="mt-8 flex animate-fade-in-up stagger-3 flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-primary gap-2 text-base shadow-emerald-500/25">
              <Package className="h-5 w-5" />
              Lihat Produk
            </Link>
            <Link href="/harga" className="btn-secondary gap-2 text-base border-emerald-400/30 text-emerald-100 hover:text-emerald-800">
              Daftar Harga
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Mengapa Kami?</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Mengapa Memilih Sin Herbal?</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Leaf, title: "100% Alami", desc: "Bahan herbal pilihan terbaik dari nusantara" },
              { icon: Shield, title: "Produk Original", desc: "Terdaftar resmi Bea & Cukai" },
              { icon: Truck, title: "Gratis Ongkir", desc: "Syarat & ketentuan berlaku" },
              { icon: Star, title: "Harga Terjangkau", desc: "Kualitas premium, harga bersahabat" },
            ].map((item, i) => (
              <div key={item.title} className={`card-hover group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm stagger-${i + 1}`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200 transition group-hover:shadow-emerald-300 group-hover:scale-110">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategori Produk */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">Kategori</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Kategori Produk</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {allCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/products?cat=${cat.slug}`}
                className={`group card-hover relative overflow-hidden rounded-2xl p-8 md:p-10 ${i === 0 ? "bg-gradient-to-br from-emerald-600 to-emerald-800" : "bg-gradient-to-br from-amber-600 to-amber-800"}`}
              >
                <div className="pointer-events-none absolute -top-6 -right-6 h-32 w-32 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />
                <h3 className="relative text-2xl font-bold text-white md:text-3xl">{cat.name}</h3>
                <p className="relative mt-2 text-white/70">Lihat koleksi produk {cat.name}</p>
                <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition group-hover:gap-3">
                  Jelajahi <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Unggulan / Best Seller */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Best Seller</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Produk Unggulan</h2>
            </div>
            <Link href="/products" className="btn-secondary hidden md:inline-flex gap-2 text-sm">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} image={p.images} productType={p.productType} stock={p.stock} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="btn-secondary gap-2">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Keunggulan Produk */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Keunggulan</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Keunggulan Produk Kami</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Terdaftar Resmi", desc: "Produk terdaftar di Direktorat Jenderal Bea dan Cukai. Legalitas terjamin." },
              { icon: Leaf, title: "Bahan Alami Pilihan", desc: "Mengandung rempah-rempah khas nusantara pilihan dengan kualitas terbaik." },
              { icon: Sparkles, title: "Kualitas Premium", desc: "Dibuat dengan standar kualitas tinggi. Harga bersaing untuk produk premium." },
            ].map((item, i) => (
              <div key={item.title} className={`card-hover group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm stagger-${i + 1}`}>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-emerald-50/50 to-white py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">Pertanyaan Umum</h2>
            <p className="mt-2 text-gray-500">Pertanyaan yang sering diajukan pelanggan kami.</p>
          </div>
          <div className="mt-10">
            <HomeFAQ />
          </div>
          <div className="mt-6 text-center">
            <Link href="/faq" className="btn-secondary gap-2 text-sm">
              Lihat Semua FAQ <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Siap Order?</h2>
            <p className="mt-3 text-lg text-emerald-100/80">Hubungi kami via WhatsApp untuk pesan atau jadi reseller.</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890"}`}
              target="_blank"
              className="btn-primary mt-8 gap-2.5 bg-white text-emerald-800 shadow-xl hover:bg-emerald-50 hover:from-white hover:to-white hover:text-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              Hubungi WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
