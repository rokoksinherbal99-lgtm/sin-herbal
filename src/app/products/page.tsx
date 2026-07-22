import ProductsPageClient from "./products-page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk Herbal",
  description: "Koleksi lengkap produk herbal Sin Herbal. Rokok herbal SKT/SKM dan kopi premium terdaftar Bea Cukai.",
};

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return <ProductsPageClient />;
}
