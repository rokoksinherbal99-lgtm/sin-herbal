import Link from "next/link";
import { BookOpen, Leaf, Shield, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jurnal Herbal - Sin Herbal",
  description: "Artikel dan informasi seputar rokok herbal, gaya hidup sehat alami, dan tips berhenti merokok dari Sin Herbal.",
};

const ARTICLES = [
  {
    slug: "manfaat-rokok-herbal",
    title: "Manfaat Rokok Herbal bagi Kesehatan",
    excerpt: "Rokok herbal menjadi alternatif bagi mereka yang ingin mengurangi dampak buruk rokok tembakau. Berikut manfaat dan kandungannya.",
    icon: Leaf,
    category: "Rokok Herbal",
    date: "10 Juli 2026",
    readTime: "5 menit",
  },
  {
    slug: "cara-berhenti-merokok-alami",
    title: "7 Cara Berhenti Merokok secara Alami",
    excerpt: "Ingin berhenti merokok? Coba 7 cara alami ini yang bisa membantu mengurangi kecanduan nikotin secara bertahap.",
    icon: Heart,
    category: "Gaya Hidup",
    date: "8 Juli 2026",
    readTime: "7 menit",
  },
  {
    slug: "teh-herbal-nusantara",
    title: "Mengenal Teh Herbal Nusantara dan Khasiatnya",
    excerpt: "Dari daun mint hingga jahe merah, Indonesia kaya akan bahan teh herbal. Simak khasiat dan cara penyajiannya.",
    icon: BookOpen,
    category: "Teh Herbal",
    date: "5 Juli 2026",
    readTime: "6 menit",
  },
  {
    slug: "legalitas-produk-herbal",
    title: "Legalitas Produk Herbal di Indonesia",
    excerpt: "Pentingnya memilih produk herbal yang terdaftar resmi dan memiliki izin edar. Panduan lengkap untuk konsumen cerdas.",
    icon: Shield,
    category: "Edukasi",
    date: "3 Juli 2026",
    readTime: "4 menit",
  },
];

export default function JournalPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A3626] via-[#2C4C3B] to-[#1A3626] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#2C4C3B]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-[#FDFBF7]/10 backdrop-blur-sm shadow-sm">
            <BookOpen className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
          <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#D5E0D3]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#2C4C3B]">Jurnal Herbal</span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Artikel & Informasi</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#F9F6F0]/80">
            Seputar rokok herbal, teh herbal, gaya hidup sehat, dan tips berhenti merokok.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {ARTICLES.map((article, i) => {
              const Icon = article.icon;
              return (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group border-[#D5E0D3] bg-white rounded-sm p-6 shadow-sm transition-all hover:shadow-md hover:border-[#ABC1A7]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2C4C3B] to-[#1A3626] shadow-sm">
                      <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#2C4C3B]">{article.category}</span>
                      <p className="text-xs text-[#ABC1A7]">{article.date} · {article.readTime}</p>
                    </div>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-[#1A3626] group-hover:text-[#2C4C3B] transition-colors">{article.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5D8356]">{article.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2C4C3B] group-hover:gap-2 transition-all">
                    Baca Selengkapnya <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="organic-divider mx-auto mt-4 max-w-[120px]" />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A3626] via-[#2C4C3B] to-[#1A3626] py-16">
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ingin Berkontribusi?</h2>
          <p className="mt-3 text-lg text-[#ABC1A7]">Punya artikel atau pengalaman seputar herbal? Kirimkan ke kami.</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6281383863456"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 gap-2.5"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  );
}
