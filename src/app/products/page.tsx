import ProductsPageClient from "./products-page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk Herbal",
  description: "Koleksi lengkap produk herbal alami Sin Herbal. Jamu, rempah, dan suplemen herbal berkualitas.",
};

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return <ProductsPageClient />;
}
