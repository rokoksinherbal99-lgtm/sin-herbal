"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  productType?: string;
  stock?: number;
}

const typeStyles: Record<string, string> = {
  "Rokok Herbal SKT": "bg-amber-50 text-amber-700 border-amber-200",
  "Rokok Herbal SKM": "bg-blue-50 text-blue-700 border-blue-200",
  "Minuman Herbal": "bg-teal-50 text-teal-700 border-teal-200",
  "Minyak Herbal": "bg-orange-50 text-orange-700 border-orange-200",
  Suplemen: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function ProductCard({ id, name, slug, price, image, productType, stock }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group card-hover relative rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      <Link href={`/products/${slug}`}>
        <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          {productType && (
            <span className={`absolute top-2 left-2 rounded-lg border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${typeStyles[productType] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {productType}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <h3 className="px-1 text-sm font-semibold leading-snug text-gray-800">{name}</h3>
        <p className="mt-1.5 px-1 text-lg font-bold text-emerald-700">{formatPrice(price)}</p>
        {stock !== undefined && (
          <p className={`mt-1 px-1 text-xs font-medium ${stock > 0 ? "text-emerald-500" : "text-red-400"}`}>
            {stock > 0 ? `Stok: ${stock}` : "Stok Habis"}
          </p>
        )}
      </Link>
      <button
        onClick={() => addItem({ id, name, price, image, quantity: 1, slug })}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-emerald-500 hover:to-emerald-400 hover:shadow-md active:scale-[0.98]"
      >
        <ShoppingCart className="h-4 w-4" />
        Keranjang
      </button>
    </div>
  );
}
