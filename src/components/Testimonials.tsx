"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  product: string | null;
  productImg: string | null;
  city: string;
}

export default function Testimonials() {
  const [list, setList] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setList)
      .catch(() => {});
  }, []);

  if (list.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#D5E0D3]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#2C4C3B]">— Cerita dari Mereka —</span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Apa Kata Pelanggan</h2>
          <div className="organic-divider mx-auto mt-4 max-w-[120px]" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {list.map((t, i) => (
            <div key={`${t.name}-${i}`} className="group rounded-sm border border-[#D5E0D3] bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <Quote className="h-8 w-8 text-[#ABC1A7]" strokeWidth={1.5} />
              <p className="mt-3 font-sans leading-relaxed text-[#5D8356]">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[#D5E0D3] pt-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#EDF2ED] ring-2 ring-[#ABC1A7]/20">
                  {t.productImg ? (
                    <Image src={t.productImg} alt={t.product || "Testimonial"} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1A3626] to-[#2C4C3B] font-serif text-sm font-bold text-white">{t.name[0]}</div>
                  )}
                </div>
                <div>
                  <p className="font-serif font-bold text-[#1A3626]">{t.name}</p>
                  <p className="font-sans text-xs text-[#ABC1A7]">{t.product} &middot; {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
