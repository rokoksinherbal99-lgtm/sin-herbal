"use client";

import { MessageCircle } from "lucide-react";
import { generateSingleProductMessage } from "@/lib/wa-message";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  disabled?: boolean;
}

export default function AddToCartButton({ name, price, disabled }: Props) {
  const { url } = generateSingleProductMessage(name, price);

  if (disabled) {
    return (
      <div className="mt-6 rounded-2xl bg-red-50 border border-red-100 p-4 text-center">
        <p className="text-sm font-semibold text-red-600">Stok Habis</p>
        <p className="mt-1 text-xs text-red-400">Produk ini sedang tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-600/30 active:scale-[0.98]"
      >
        <MessageCircle className="h-5 w-5" />
        Pesan via WhatsApp
      </a>
    </div>
  );
}
