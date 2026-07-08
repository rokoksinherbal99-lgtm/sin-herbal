"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";

const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890";
const DISPLAY_PHONE = `0${WA_PHONE.slice(2, 5)}-${WA_PHONE.slice(5, 9)}-${WA_PHONE.slice(9)}`;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Sin Herbal!%0A%0ANama: ${form.name}%0AEmail: ${form.email}%0APesan: ${form.message}`;
    window.open(`https://wa.me/${WA_PHONE}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1 text-sm font-semibold text-white/90 backdrop-blur-sm">Kontak</span>
          <h1 className="mt-4 text-4xl font-bold text-white">Hubungi Kami</h1>
          <p className="mt-2 text-emerald-100/80">Punya pertanyaan? Silakan hubungi kami.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Alamat", content: "Ruko Sentra Niaga Blok A1 No. 5, Jl. Raya Malang–Surabaya KM 43, Pakisaji, Malang 65162", href: null },
              { icon: Phone, title: "Telepon", content: DISPLAY_PHONE, href: `tel:${WA_PHONE}` },
              { icon: MessageCircle, title: "WhatsApp", content: DISPLAY_PHONE, href: `https://wa.me/${WA_PHONE}` },
              { icon: Mail, title: "Email", content: "info@sinherbal.com", href: "mailto:info@sinherbal.com" },
            ].map((item) => (
              <div key={item.title} className="card-hover flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} className="text-sm text-emerald-600 transition hover:text-emerald-700 hover:underline">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Tinggalkan Pesan</h3>
              <p className="mt-1 text-sm text-gray-400">Pesan akan dikirim via WhatsApp.</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Lengkap" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Pesan Anda" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
                <button type="submit" className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${
                  sent
                    ? "bg-emerald-500 shadow-emerald-200"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-200 hover:from-emerald-500 hover:to-emerald-400"
                }`}>
                  {sent ? (
                    "Pesan Terkirim!"
                  ) : (
                    <span className="flex items-center justify-center gap-2"><Send className="h-4 w-4" /> Kirim via WhatsApp</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
