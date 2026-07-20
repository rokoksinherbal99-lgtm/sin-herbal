import type { Metadata } from "next";
import CheckoutPage from "./page-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Selesaikan pesanan produk herbal Sin Herbal Anda. Pembayaran mudah & aman.",
};

export default function Checkout() {
  return <CheckoutPage />;
}
