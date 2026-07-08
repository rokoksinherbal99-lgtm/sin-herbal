import { Leaf, Shield, Star, CheckCircle, MessageCircle, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Sin Herbal adalah distributor resmi produk herbal berkualitas dengan bahan alami pilihan. 100% original, harga terjangkau, tanpa minimal pembelian.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1 text-sm font-semibold text-white/90 backdrop-blur-sm">Tentang Kami</span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Sin Herbal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100/80">
            Distributor resmi produk herbal berkualitas dengan bahan alami pilihan. 100% original, harga terjangkau.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 space-y-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Produk Kami</span>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">Bahan Alami Pilihan</h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Produk kami dibuat dari bahan-bahan alami pilihan seperti daun mint, daun sirih, daun kemangi, dan rempah-rempah khas nusantara. Tanpa nikotin, tidak adiktif, dan aman dikonsumsi.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Kami juga menyediakan minuman serbuk herbal yang merupakan perpaduan kopi pilihan, ekstrak sayuran, dan akar-akar tanaman yang menetralisir efek kafein.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "100% Bahan Alami" },
                { icon: CheckCircle, text: "Produk Original & Terdaftar" },
                { icon: CheckCircle, text: "Harga Terjangkau" },
                { icon: CheckCircle, text: "Tanpa Minimal Pembelian" },
                { icon: CheckCircle, text: "Pengiriman ke Seluruh Indonesia" },
              ].map((item, i) => (
                <div key={item.text} className={`card-hover flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm stagger-${i + 1}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Terdaftar Resmi", desc: "Produk kami terdaftar di Direktorat Jenderal Bea dan Cukai. Legalitas terjamin." },
              { icon: Leaf, title: "Bahan Alami Pilihan", desc: "Mengandung rempah-rempah khas nusantara dengan kualitas terbaik." },
              { icon: Star, title: "Harga Terjangkau", desc: "Kualitas premium dengan harga yang ramah di kantong." },
            ].map((item, i) => (
              <div key={item.title} className={`card-hover rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm stagger-${i + 1}`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Jadi Reseller atau Distributor?</h2>
          <p className="mt-3 text-lg text-emerald-100/80">Hubungi kami via WhatsApp untuk info kemitraan.</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890"}`}
            target="_blank"
            className="btn-primary mt-8 gap-2.5 bg-white text-emerald-800 shadow-xl hover:from-white hover:to-white hover:text-emerald-700"
          >
            <MessageCircle className="h-5 w-5" />
            Hubungi WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
