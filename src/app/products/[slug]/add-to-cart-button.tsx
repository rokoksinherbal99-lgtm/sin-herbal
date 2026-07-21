"use client";

import { ShoppingCart, MessageCircle } from "lucide-react";
import { generateSingleProductMessage } from "@/lib/wa-message";
import { useCart } from "@/lib/cart-context";

interface Props {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  disabled?: boolean;
}

export default function AddToCartButton({ id, name, slug, price, image, disabled }: Props) {
  const { addItem } = useCart();
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
      <button
        onClick={() => addItem({ id, name, slug, price, image, quantity: 1 })}
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#1A3626] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#2C4C3B] active:scale-[0.98]"
      >
        <ShoppingCart className="h-5 w-5" />
        Tambah ke Keranjang
      </button>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#ABC1A7] bg-white px-6 py-4 font-semibold text-[#1A3626] transition-all duration-200 hover:bg-[#EDF2ED] active:scale-[0.98]"
      >
        <MessageCircle className="h-5 w-5" />
        Pesan via WhatsApp
      </a>
    </div>
  );
}
