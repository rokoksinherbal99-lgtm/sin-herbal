import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import HomeFAQ from "@/components/HomeFAQ";
import BannerSlider from "@/components/BannerSlider";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { Package, ShieldCheck, Truck, BadgeCheck, ChevronRight, MessageCircle, Leaf, DollarSign, FileText, MapPin, Store } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sin Herbal — Toko Herbal Alami Terpercaya",
  description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas. Belanja herbal online aman & mudah di Sin Herbal.",
};

export const dynamic = "force-dynamic";

async function queryWithTimeout<T>(fn: () => Promise<T>, ms = 15000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Database query timed out")), ms)
  );
  return Promise.race([fn(), timeout]);
}

export default async function HomePage() {
  const [featuredProducts, allCategories] = await Promise.all([
    queryWithTimeout(() => db.select().from(products).where(eq(products.featured, true)).limit(8)),
    queryWithTimeout(() => db.select().from(categories)),
  ]);

  return (
    <>
      {/* 1. Banner Slider */}
      <BannerSlider />

      {/* 2. Welcome + Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">Welcome to Our Site</p>
              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#1A3626] md:text-5xl">Sin Herbal</h2>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
              <p className="mt-4 font-serif text-lg italic text-[#2C4C3B]">Agen Resmi Produk Sin</p>
              <p className="mt-1 font-sans text-sm text-[#5D8356]">Alternatif rokok alami</p>
            </div>
          </FadeInUp>
          <div className="mt-12 grid gap-8 border-t border-[#D5E0D3] pt-12 sm:grid-cols-2 md:grid-cols-4">
            {[
              { icon: Package, title: "Pilihan Produk Lengkap", desc: "Berbagai varian rokok herbal dan minuman serbuk kemasan sachet tersedia untuk Anda." },
              { icon: DollarSign, title: "Harga Termurah", desc: "Kami memberikan penawaran harga terbaik dan paling ekonomis di kelasnya." },
              { icon: ShieldCheck, title: "100% Original", desc: "Semua produk dijamin keasliannya. Kami adalah distributor resmi produk Sin." },
              { icon: Truck, title: "Pengiriman Aman & Cepat", desc: "Dukung ekspedisi express yang mampu menjangkau seluruh wilayah Indonesia." },
            ].map((item) => (
              <div key={item.title} className="group text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF2ED] transition group-hover:bg-[#D5E0D3]">
                  <item.icon className="h-7 w-7 text-[#2C4C3B]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-serif font-bold text-[#1A3626]">{item.title}</h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-[#5D8356]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Seller */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Paling Laris —</span>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Produk Best Seller</h2>
              </div>
              <Link href="/products" className="hidden items-center gap-1 font-sans text-sm font-semibold text-[#2C4C3B] transition hover:text-[#1A3626] sm:inline-flex">
                Semua Produk <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </FadeInUp>
          <StaggerContainer className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {featuredProducts.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard id={p.id} name={p.name} slug={p.slug} price={p.price} image={p.images} stock={p.stock} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 border border-[#ABC1A7] px-6 py-3 font-sans text-sm font-semibold text-[#2C4C3B] transition hover:bg-[#EDF2ED]">
              Semua Produk <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Categories */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Kategori Produk —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Menyediakan Rokok dan Minuman Serbuk Kemasan Sachet</h2>
            </div>
          </FadeInUp>
          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2">
            {allCategories.map((cat, i) => (
              <StaggerItem key={cat.id}>
                <Link
                  href={`/products?cat=${cat.slug}`}
                  className="group relative flex items-center overflow-hidden rounded-sm border border-[#D5E0D3] bg-white p-8 transition-all duration-300 hover:border-[#ABC1A7]/50 hover:shadow-lg md:p-10"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-serif text-5xl font-bold text-[#ABC1A7]/40 md:text-7xl">0{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold tracking-tight text-[#1A3626] md:text-3xl">{cat.name}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#2C4C3B] transition group-hover:gap-2">
                        View <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#EDF2ED] opacity-50 transition group-hover:scale-150" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Keunggulan Produk */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Keunggulan Produk —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Mengapa Memilih Produk Kami</h2>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
            </div>
          </FadeInUp>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: BadgeCheck, title: "Terdaftar di Direktorat Jenderal Bea dan Cukai", desc: "Produk kami telah terdaftar secara resmi dan diawasi oleh instansi terkait." },
              { icon: Leaf, title: "Mengandung Rempah-rempah Khas Nusantara", desc: "Dibuat dari bahan-bahan alami pilihan yang tumbuh subur di tanah air." },
              { icon: DollarSign, title: "Harga Terjangkau dan Ramah di Kantong", desc: "Kualitas premium dengan harga yang bersahabat untuk semua kalangan." },
            ].map((item) => (
              <div key={item.title} className="group text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:shadow-md">
                  <item.icon className="h-9 w-9 text-[#2C4C3B]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-[#1A3626]">{item.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#5D8356]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tentang Toko */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-5xl font-bold italic text-[#1A3626]">Tentang Toko</span>
            </div>
          </FadeInUp>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { icon: Store, title: "Profil", desc: "Kenali lebih dekat toko kami", href: "/tentang-kami" },
              { icon: FileText, title: "Blog Info", desc: "Artikel dan informasi terbaru", href: "/journal" },
              { icon: MapPin, title: "Contact us", desc: "Hubungi kami untuk informasi lebih", href: "/kontak" },
              { icon: Package, title: "Product", desc: "Lihat koleksi produk lengkap", href: "/products" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-sm border border-[#D5E0D3] bg-white transition-all duration-200 hover:border-[#ABC1A7]/50 hover:shadow-lg"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-[#EDF2ED] to-[#D5E0D3] flex items-center justify-center">
                  <item.icon className="h-12 w-12 text-[#2C4C3B]/60 transition group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#1A3626]">{item.title}</h3>
                  <p className="mt-1 font-sans text-sm text-[#5D8356]">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— FAQ —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Pertanyaan yang Sering Diajukan</h2>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
            </div>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <div className="mt-10">
              <HomeFAQ />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A3626] via-[#2C4C3B] to-[#1A3626] py-20">
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ABC1A7]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#81A27B]/10 blur-3xl" />
        <FadeInUp>
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">Mulai Percakapan</h2>
            <p className="mt-3 font-sans text-lg text-[#D5E0D3]/70">Kami hadir di WhatsApp. Untuk pesanan, pertanyaan, atau sekadar ngobrol tentang daun.</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6281383863456"}`}
              target="_blank"
              className="mt-8 inline-flex items-center gap-2 border border-[#ABC1A7]/30 bg-white px-7 py-3.5 font-sans text-sm font-semibold text-[#1A3626] transition-all duration-200 hover:bg-white active:scale-[0.97]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              Ajak Ngobrol
            </a>
          </div>
        </FadeInUp>
      </section>
    </>
  );
}
