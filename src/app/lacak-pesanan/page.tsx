import type { Metadata } from "next";
import LacakPesananPage from "./page-client";

export const metadata: Metadata = {
  title: "Lacak Pesanan",
  description: "Lacak status pesanan produk herbal Sin Herbal Anda. Masukkan ID pesanan untuk melihat status terkini.",
};

export default function LacakPesanan() {
  return <LacakPesananPage />;
}
