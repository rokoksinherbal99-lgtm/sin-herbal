import { Quote } from "lucide-react";

const testimonials = [
  { name: "Budi Santoso", text: "Udah 3 bulan pake Rokok Sin Herbal Original, beneran beda sama rokok biasa. Rempahnya terasa, lebih enteng di tenggorokan.", product: "Rokok Sin Herbal Original", city: "Surabaya" },
  { name: "Dewi Lestari", text: "Awalnya ragu karena baru denger, tapi setelah coba Menthol rasanya seger banget. Cocok buat yang mau beralih ke herbal.", product: "Rokok Sin Herbal Menthol", city: "Jakarta" },
  { name: "Rina Wijaya", text: "Teh Herbal Sin jadi andalan tiap santai di rumah. Rasanya pas, gak pahit. Anak-anak juga suka. Recomended!", product: "Teh Herbal Sin", city: "Bandung" },
  { name: "Agus Prasetyo", text: "Pesen Kapsul Herbal buat orang tua, katanya badannya terasa lebih bugar. Pengiriman cepet, packing rapi.", product: "Kapsul Herbal Sin", city: "Malang" },
  { name: "Fitriani", text: "Minyak Herbalnya enak dipake pijat, hangatnya pas. Udah repeat order 2 kali. Pelayanannya ramah.", product: "Minyak Herbal Sin", city: "Semarang" },
  { name: "Hendra Gunawan", text: "Baru pertama beli rokok herbal online, barang sampai sesuai pesanan. Pasti bakal order lagi.", product: "Rokok Sin Herbal Light", city: "Medan" },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Testimoni</span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">Apa Kata Pelanggan</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`card-hover group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm stagger-${i + 1}`}>
              <Quote className="h-8 w-8 text-emerald-200" />
              <p className="mt-3 leading-relaxed text-gray-600">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-bold text-white shadow-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.product} &middot; {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
