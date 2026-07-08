"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, Minus, Plus, Zap } from "lucide-react";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  disabled?: boolean;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  slug,
  disabled,
}: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({ id, name, price, image, quantity, slug });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem({ id, name, price, image, quantity, slug });
    router.push("/checkout");
  };

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
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-1">
        <span className="px-3 text-sm font-medium text-gray-600">Jumlah</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-lg font-bold text-gray-900">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 font-semibold shadow-lg transition-all duration-200 active:scale-[0.98] ${
            added
              ? "bg-emerald-500 text-white shadow-emerald-500/30"
              : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-emerald-600/20 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-600/30"
          }`}
        >
          {added ? (
            <><Check className="h-5 w-5" /> Ditambahkan</>
          ) : (
            <><ShoppingCart className="h-5 w-5" /> Keranjang</>
          )}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-200 hover:from-amber-400 hover:to-amber-300 hover:shadow-amber-500/30 active:scale-[0.98]"
        >
          <Zap className="h-5 w-5" /> Beli Sekarang
        </button>
      </div>
    </div>
  );
}
