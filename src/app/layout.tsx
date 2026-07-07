import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sin Herbal - Herbal Alami Berkualitas",
    template: "%s | Sin Herbal",
  },
  description:
    "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas untuk kesehatan Anda. Nikmati hidup sehat dengan Sin Herbal.",
  keywords: ["herbal", "obat herbal", "sin herbal", "toko herbal", "herbal alami", "kesehatan"],
  openGraph: {
    title: "Sin Herbal - Herbal Alami Berkualitas",
    description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas.",
    type: "website",
    locale: "id_ID",
    siteName: "Sin Herbal",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
