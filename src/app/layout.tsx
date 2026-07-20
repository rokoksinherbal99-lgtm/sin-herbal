import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import BackToTop from "@/components/BackToTop";
import AgeModal from "@/components/AgeModal";
import StickyBottomBar from "@/components/StickyBottomBar";
import { ToastProvider } from "@/components/Toast";
import { CartProvider } from "@/lib/cart-context";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";
const OG_IMAGE = `${BASE_URL}/images/product-1.svg`;

export const metadata: Metadata = {
  title: { default: "Sin Herbal - Rokok & Teh Herbal Premium Nusantara", template: "%s | Sin Herbal" },
  description: "Toko herbal Nusantara terpercaya. Jual rokok herbal SKT/SKM premium, teh herbal, minyak herbal, dan suplemen. 100% bahan alami, terdaftar resmi Bea Cukai, harga terjangkau. Gratis ongkir min. belanja Rp100rb.",
  keywords: ["rokok herbal", "teh herbal", "sin herbal", "rokok sin herbal", "herbal nusantara", "SKT", "SKM", "tembakau herbal", "obat herbal", "toko herbal online"],
  openGraph: {
    title: "Sin Herbal - Rokok & Teh Herbal Premium Nusantara",
    description: "Rokok herbal SKT/SKM, teh herbal, minyak herbal, & suplemen. 100% bahan alami pilihan. Terdaftar Bea Cukai. Gratis ongkir min. Rp100rb!",
    type: "website",
    locale: "id_ID",
    siteName: "Sin Herbal",
    url: BASE_URL,
    images: [{ url: OG_IMAGE, width: 800, height: 800, alt: "Sin Herbal - Produk Herbal Premium Nusantara" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sin Herbal - Rokok & Teh Herbal Premium Nusantara",
    description: "Rokok herbal SKT/SKM, teh herbal, dan suplemen. 100% alami, terdaftar Bea Cukai. Gratis ongkir!",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: BASE_URL },
  manifest: "/manifest.json",
  icons: {
    apple: "/images/product-1.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sin Herbal",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Sin Herbal",
      description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas.",
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/cari?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Sin Herbal",
      url: BASE_URL,
      logo: `${BASE_URL}/images/product-1.svg`,
      image: `${BASE_URL}/images/product-1.svg`,
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      contactPoint: { "@type": "ContactPoint", telephone: "+62-812-3456-7890", contactType: "customer service", language: "id" },
      sameAs: [`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6281383863456"}`],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} flex min-h-screen flex-col`}>
        <ToastProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <StickyBottomBar />
            <Footer />
            <AgeModal />
            <AIChat />
            <BackToTop />
          </CartProvider>
        </ToastProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
          }
        `}} />
      </body>
    </html>
  );
}
