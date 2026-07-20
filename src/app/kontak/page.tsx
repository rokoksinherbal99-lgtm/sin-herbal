import type { Metadata } from "next";
import ContactPage from "./page-client";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi Sin Herbal via WhatsApp, email, atau formulir kontak. Kami siap membantu Anda.",
};

export default function Kontak() {
  return <ContactPage />;
}
