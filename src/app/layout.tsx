import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";
const OG_IMAGE = `${BASE_URL}/images/product-1.svg`;

export const metadata: Metadata = {
  title: { default: "Sin Herbal - Herbal Alami Berkualitas", template: "%s | Sin Herbal" },
  description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas untuk kesehatan Anda. Nikmati hidup sehat dengan Sin Herbal.",
  keywords: ["herbal", "obat herbal", "sin herbal", "toko herbal", "herbal alami", "kesehatan", "rokok herbal"],
  openGraph: {
    title: "Sin Herbal - Herbal Alami Berkualitas",
    description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas.",
    type: "website",
    locale: "id_ID",
    siteName: "Sin Herbal",
    url: BASE_URL,
    images: [{ url: OG_IMAGE, width: 800, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sin Herbal - Herbal Alami Berkualitas",
    description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: BASE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Sin Herbal",
  url: BASE_URL,
  description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas.",
  image: `${BASE_URL}/images/product-1.svg`,
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  contactPoint: { "@type": "ContactPoint", telephone: "+62-812-3456-7890", contactType: "customer service" },
  sameAs: [`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6281383863456"}`],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
