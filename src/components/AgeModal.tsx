"use client";

import { useEffect, useState } from "react";
import { Shield, X } from "lucide-react";

const STORAGE_KEY = "sinherbal_age_verified";

export default function AgeModal() {
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    if (!verified) setShow(true);
  }, []);

  const confirm = () => {
    if (!agreed) return;
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  const leave = () => {
    window.location.href = "https://google.com";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-sm border border-[#D5E0D3] bg-white p-8 shadow-2xl shadow-black/20 animate-scale-in">
        <button
          onClick={leave}
          className="absolute top-4 right-4 rounded-sm p-1.5 text-[#ABC1A7] transition hover:bg-[#EDF2ED] hover:text-[#1A3626]"
          aria-label="Tutup"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm border border-[#ABC1A7]/30 bg-[#EDF2ED]">
          <Shield className="h-8 w-8 text-[#1A3626]" strokeWidth={1.5} />
        </div>

        <h2 className="text-center font-serif text-xl font-bold tracking-tight text-[#1A3626]">
          Perhatian
        </h2>

        <p className="mt-3 text-center font-sans text-sm leading-relaxed text-[#5D8356]">
          Produk ini adalah pilihan sadar untuk mereka yang telah cukup umur.
        </p>
        <p className="mt-2 text-center font-sans text-sm leading-relaxed text-[#5D8356]">
          Dengan memasuki situs ini, Anda menyatakan bahwa Anda berusia minimal <strong className="text-[#1A3626]">21 tahun</strong> dan bersedia menikmati produk ini dengan bijak & bertanggung jawab.
        </p>

        <div className="mt-6 flex items-start gap-3">
          <input
            id="age-agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded-sm border-[#ABC1A7] text-[#2C4C3B] focus:ring-[#2C4C3B]"
          />
          <label htmlFor="age-agree" className="font-sans text-xs leading-relaxed text-[#5D8356]">
            Saya memahami bahwa produk ini diperuntukkan bagi dewasa. Saya berusia 21+ dan akan mengonsumsinya dengan bijak.
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={confirm}
            disabled={!agreed}
            className={`w-full rounded-sm px-6 py-3.5 font-sans text-sm font-bold transition active:scale-[0.98] ${
              agreed
                ? "bg-[#1A3626] text-white hover:bg-[#2C4C3B]"
                : "cursor-not-allowed bg-[#EDF2ED] text-[#ABC1A7]"
            }`}
          >
            Masuk ke Situs
          </button>
          <button
            onClick={leave}
            className="w-full rounded-sm border border-[#D5E0D3] px-6 py-3 font-sans text-sm font-semibold text-[#5D8356] transition hover:border-[#ABC1A7] hover:bg-white active:scale-[0.98]"
          >
            Keluar
          </button>
        </div>

        <p className="mt-4 text-center font-sans text-[11px] text-[#ABC1A7]">
          Nikmati dengan bijak. Konsumsi berlebihan tetap tidak dianjurkan, meski berbahan herbal.
        </p>
      </div>
    </div>
  );
}
