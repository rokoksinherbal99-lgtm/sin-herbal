"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingBag, ShoppingCart, MessageCircle } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-sm border border-[#E0D7C5] bg-[#FDFBF7]">
          <ShoppingBag className="h-10 w-10 text-[#C4B8A2]" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Masih Sepi</h1>
        <p className="mt-2 font-sans text-sm text-[#A8987F]">Belum ada yang kamu pilih. Yuk, lihat-lihat dulu.</p>
        <Link href="/products" className="btn-primary mt-8 gap-2 inline-flex">
          <ShoppingCart className="h-5 w-5" strokeWidth={1.5} /> Mulai Jelajahi
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 font-sans text-sm text-[#C4B8A2]">
        <Link href="/" className="transition hover:text-[#2C4C3B]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-[#2C2416]">Keranjang</span>
      </nav>

      <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Keranjang Belanja</h1>
      <p className="mt-1 font-sans text-sm text-[#C4B8A2]">{items.length} item</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-4 shadow-sm transition hover:shadow-md">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[#F0EBE0]">
              <Image src={item.image} alt={item.name} fill unoptimized sizes="80px" className="object-cover contrast-110" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-serif font-bold text-[#2C2416] transition hover:text-[#1A3626] line-clamp-1">
                {item.name}
              </Link>
              <p className="mt-1 font-sans text-sm font-bold text-[#2C4C3B]">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E0D7C5] text-[#C4B8A2] transition hover:border-[#ABC1A7] hover:bg-[#EDF2ED] hover:text-[#2C4C3B]">
                <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center font-sans text-sm font-semibold text-[#2C2416]">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E0D7C5] text-[#C4B8A2] transition hover:border-[#ABC1A7] hover:bg-[#EDF2ED] hover:text-[#2C4C3B]">
                <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
            <p className="w-24 text-right font-sans font-bold text-[#2C2416]">{formatPrice(item.price * item.quantity)}</p>
            <button onClick={() => removeItem(item.id)} className="flex h-9 w-9 items-center justify-center rounded-sm text-[#C4B8A2] transition hover:bg-[#F0EBE0] hover:text-[#2C2416]">
              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-sans text-lg text-[#A8987F]">Total Belanja</span>
          <span className="font-serif text-3xl font-bold tracking-tight text-[#1A3626]">{formatPrice(total)}</span>
        </div>
        <Link href="/checkout" className="btn-primary mt-6 w-full gap-2 inline-flex justify-center">
          <MessageCircle className="h-5 w-5" strokeWidth={1.5} /> Lanjutkan ke Checkout
        </Link>
      </div>
    </div>
  );
}
