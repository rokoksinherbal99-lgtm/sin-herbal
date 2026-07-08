"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Apakah bisa kirim ke seluruh Indonesia?", a: "Ya, kami melayani pengiriman ke seluruh Indonesia melalui jasa ekspedisi terpercaya." },
  { q: "Apakah produknya original?", a: "100% original. Kami distributor resmi. Garansi uang kembali jika tidak original." },
  { q: "Bagaimana cara pesan?", a: "Pesan via website atau WhatsApp. Kami proses cepat dan antar ke seluruh Indonesia." },
  { q: "Apa manfaat produk Sin Herbal?", a: "Terbuat dari bahan alami, tanpa nikotin, tidak adiktif, aman dikonsumsi." },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all ${open === i ? "shadow-md" : ""}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-gray-50/50"
          >
            <span className="font-semibold text-gray-900">{faq.q}</span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition duration-200 ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="border-t border-gray-100 px-6 py-5 animate-fade-in">
              <p className="leading-relaxed text-gray-600">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
