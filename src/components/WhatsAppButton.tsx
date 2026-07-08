"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const PHONE = process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890";
const MESSAGE = "Halo Sin Herbal, saya ingin order produk.";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-scale-in rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl shadow-emerald-900/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Butuh bantuan?</p>
              <p className="text-xs text-gray-400">Chat via WhatsApp</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
              Nanti
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:from-emerald-500 hover:to-emerald-400"
            >
              <MessageCircle className="h-4 w-4" /> Mulai Chat
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-200 transition-all duration-200 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-300 active:scale-95"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400" />
        </span>
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
