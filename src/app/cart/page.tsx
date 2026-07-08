"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingBag, ShoppingCart, ChevronRight } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Keranjang Kosong</h1>
        <p className="mt-2 text-gray-500">Belum ada produk di keranjang Anda.</p>
        <Link href="/products" className="btn-primary mt-8 gap-2">
          <ShoppingCart className="h-5 w-5" /> Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-400">
        <Link href="/" className="transition hover:text-emerald-600">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">Keranjang</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">Keranjang Belanja</h1>
      <p className="mt-1 text-sm text-gray-400">{items.length} item</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card-hover flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-semibold text-gray-800 transition hover:text-emerald-600 line-clamp-1">
                {item.name}
              </Link>
              <p className="mt-1 text-sm font-bold text-emerald-600">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="w-24 text-right font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
            <button onClick={() => removeItem(item.id)} className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-300 transition hover:bg-red-50 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-lg text-gray-600">Total Belanja</span>
          <span className="text-3xl font-bold text-emerald-600">{formatPrice(total)}</span>
        </div>
        <Link href="/checkout" className="btn-primary mt-6 w-full gap-2">
          Lanjut ke Pembayaran <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
