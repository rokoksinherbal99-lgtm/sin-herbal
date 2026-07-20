import type { Metadata } from "next";
import FAQPage from "./page-client";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Temukan jawaban untuk pertanyaan yang sering diajukan tentang produk Sin Herbal, cara pemesanan, pengiriman, dan garansi.",
};

export default function FAQ() {
  return <FAQPage />;
}
