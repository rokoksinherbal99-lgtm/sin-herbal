import type { Metadata } from "next";
import CartPage from "./page-client";

export const metadata: Metadata = {
  title: "Keranjang Belanja",
  description: "Lihat dan kelola keranjang belanja Anda di Sin Herbal. Produk herbal Nusantara pilihan.",
};

export default function Cart() {
  return <CartPage />;
}
