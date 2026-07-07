"use client";

import Link from "next/link";
import { ShoppingCart, Leaf } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-800">
          <Leaf className="h-6 w-6" />
          Sin Herbal
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-green-700">Beranda</Link>
          <Link href="/products" className="hover:text-green-700">Produk</Link>
          <Link href="/cart" className="relative hover:text-green-700">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
