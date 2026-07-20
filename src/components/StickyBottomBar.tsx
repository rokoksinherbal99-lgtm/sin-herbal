"use client";

import { ShoppingCart } from "lucide-react";

export default function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D5E0D3] bg-white/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(44,36,22,0.08)] md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href="/cart"
          className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#1A3626] px-4 py-3 font-sans text-sm font-bold text-white transition active:scale-[0.98]"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
          Keranjang & Checkout
        </a>
      </div>
    </div>
  );
}
