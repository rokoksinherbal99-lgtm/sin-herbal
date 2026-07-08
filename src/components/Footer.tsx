import Link from "next/link";
import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { db } from "@/db";
import { settings } from "@/db/schema";

const DEFAULTS: Record<string, string> = {
  wa_phone: "6281383863456",
  address: "Ruko Sentra Niaga Blok A1 No. 5, Pakisaji, Malang 65162",
  email: "info@sinherbal.com",
  shipping_info: "Gratis ongkir untuk area tertentu (syarat & ketentuan berlaku)",
  operating_hours: "Senin - Sabtu 08.00 - 17.00\nMinggu 09.00 - 14.00",
};

async function getSettings() {
  try {
    const rows = await db.select().from(settings);
    const result = { ...DEFAULTS };
    for (const row of rows) {
      if (row.key in result) {
        result[row.key as keyof typeof result] = row.value;
      }
    }
    return result;
  } catch {
    return DEFAULTS;
  }
}

function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return `0${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
}

function parseHours(hours: string) {
  const lines = hours.split("\n").filter(Boolean);
  if (lines.length >= 2) {
    return lines.map((line) => {
      const [days, ...rest] = line.split(" ");
      return { days, hours: rest.join(" ") };
    });
  }
  return [{ days: "Senin - Sabtu", hours: "08.00 - 17.00" }, { days: "Minggu", hours: "09.00 - 14.00" }];
}

export default async function Footer() {
  const s = await getSettings();
  const phoneDisplay = formatPhone(s.wa_phone);
  const hours = parseHours(s.operating_hours);

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />
        <div className="py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-200">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-emerald-900">Sin Herbal</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Distributor resmi produk herbal berkualitas. 100% bahan alami, harga terjangkau.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition hover:bg-emerald-500 hover:text-white hover:shadow-md" aria-label="Facebook">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:text-white hover:shadow-md" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.88 2.013 9.235 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition hover:bg-red-600 hover:text-white hover:shadow-md" aria-label="YouTube">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Menu</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="/products" className="text-sm text-gray-500 transition hover:text-emerald-600">Produk</Link></li>
                <li><Link href="/harga" className="text-sm text-gray-500 transition hover:text-emerald-600">Daftar Harga</Link></li>
                <li><Link href="/tentang-kami" className="text-sm text-gray-500 transition hover:text-emerald-600">Tentang Kami</Link></li>
                <li><Link href="/faq" className="text-sm text-gray-500 transition hover:text-emerald-600">FAQ</Link></li>
                <li><Link href="/kontak" className="text-sm text-gray-500 transition hover:text-emerald-600">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Kontak</h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2.5 text-sm text-gray-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {s.address}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-500">
                  <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                  {phoneDisplay}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-500">
                  <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                  {s.email}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Jam Operasional</h4>
              <ul className="mt-4 space-y-3">
                {hours.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                      <p>{h.days}</p>
                      <p className="font-medium text-gray-700">{h.hours}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-red-50 via-red-50/50 to-red-50 p-4 mb-8">
          <p className="text-center text-xs font-medium text-red-700">
            PERHATIAN: Produk rokok herbal mengandung nikotin. Dilarang dijual kepada orang di bawah usia 21 tahun. Merokok dapat menyebabkan kanker, impotensi, dan gangguan kehamilan.
          </p>
        </div>
        <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Sin Herbal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
