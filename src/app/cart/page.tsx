"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Keranjang Kosong</h1>
        <p className="mt-2 text-gray-500">Belum ada produk di keranjang Anda.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h1>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border bg-white p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <Link
                href={`/products/${item.slug}`}
                className="font-semibold text-gray-800 hover:text-green-700"
              >
                {item.name}
              </Link>
              <p className="text-sm font-bold text-green-700">
                {formatPrice(item.price)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="rounded border p-1 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="rounded border p-1 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="w-24 text-right font-semibold text-gray-800">
              {formatPrice(item.price * item.quantity)}
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6 text-right">
        <p className="text-lg text-gray-600">
          Total: <span className="text-2xl font-bold text-green-700">{formatPrice(total)}</span>
        </p>
        <Link
          href="/checkout"
          className="mt-4 inline-block rounded-lg bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800"
        >
          Lanjut ke Pembayaran
        </Link>
      </div>
    </div>
  );
}
