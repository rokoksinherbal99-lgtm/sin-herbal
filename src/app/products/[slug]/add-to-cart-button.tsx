"use client";

import { useCart } from "@/lib/cart-context";
import { ShoppingCart } from "lucide-react";

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

  return (
    <button
      onClick={() => addItem({ id, name, price, image, quantity: 1, slug })}
      disabled={disabled}
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingCart className="h-5 w-5" />
      {disabled ? "Stok Habis" : "Tambah ke Keranjang"}
    </button>
  );
}
