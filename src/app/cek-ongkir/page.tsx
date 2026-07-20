import type { Metadata } from "next";
import CekOngkirPage from "./page-client";

export const metadata: Metadata = {
  title: "Cek Ongkir",
  description: "Cek ongkos kirim produk Sin Herbal ke seluruh Indonesia. Gratis ongkir untuk area tertentu.",
};

export default function CekOngkir() {
  return <CekOngkirPage />;
}
