"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ShoppingBag, Building2, Landmark } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [waPhone, setWaPhone] = useState("6281383863456");
  const [form, setForm] = useState({
    customer: "", email: "", phone: "", address: "", city: "", province: "", postalCode: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.wa_phone) setWaPhone(data.wa_phone);
      })
      .catch(() => {});
  }, []);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, total, _website: "", _timestamp: Date.now() }),
      });
      const order = await res.json();
      if (!res.ok) {
        alert(order.error || "Terjadi kesalahan. Silakan coba lagi.");
        return;
      }
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}&total=${total}`);
    } catch {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-sm border border-[#E0D7C5] bg-[#FDFBF7]">
          <ShoppingBag className="h-10 w-10 text-[#C4B8A2]" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Belum Ada yang Dipilih</h1>
        <p className="mt-2 font-sans text-sm text-[#A8987F]">Isi keranjangmu dulu, ya. Kami tunggu.</p>
        <Link href="/cart" className="btn-primary mt-8 gap-2 inline-flex">
          Lihat Keranjang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/cart" className="inline-flex items-center gap-1.5 font-sans text-sm text-[#2C4C3B] transition hover:text-[#1A3626]">
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} /> Kembali ke Keranjang
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Checkout</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-5 shadow-sm space-y-4">
            <h2 className="font-serif font-bold tracking-tight text-[#2C2416]">Data Diri</h2>
            <input required value={form.customer} onChange={(e) => update("customer", e.target.value)} placeholder="Nama Lengkap" className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
            <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="No. HP" className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
          </div>

          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-5 shadow-sm space-y-4">
            <h2 className="font-serif font-bold tracking-tight text-[#2C2416]">Alamat Pengiriman</h2>
            <textarea required value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Alamat Lengkap" rows={3} className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
            <div className="grid grid-cols-2 gap-3">
              <input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Kota" className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
              <input required value={form.province} onChange={(e) => update("province", e.target.value)} placeholder="Provinsi" className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
            </div>
            <input required value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="Kode Pos" className="w-full rounded-sm border border-[#E0D7C5] px-4 py-2.5 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#ABC1A7] focus:outline-none focus:ring-2 focus:ring-[#EDF2ED]" />
          </div>

          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-5 shadow-sm">
            <h2 className="font-serif font-bold tracking-tight text-[#2C2416]">Metode Pembayaran</h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 rounded-sm border border-[#E0D7C5] bg-[#F0EBE0] p-3.5">
                <Landmark className="h-5 w-5 text-[#2C4C3B]" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-sm font-semibold text-[#2C2416]">BCA</p>
                  <p className="font-sans text-xs text-[#A8987F]">1234567890 a.n. Sin Herbal</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-[#E0D7C5] bg-[#F0EBE0] p-3.5">
                <Building2 className="h-5 w-5 text-[#2C4C3B]" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-sm font-semibold text-[#2C2416]">Mandiri</p>
                  <p className="font-sans text-xs text-[#A8987F]">9876543210 a.n. Sin Herbal</p>
                </div>
              </div>
              <p className="font-sans text-xs text-[#C4B8A2]">Setelah transfer, konfirmasi via WhatsApp dengan mengirimkan bukti transfer.</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full gap-2 text-base">
            {loading ? "Memproses..." : `Pesan ${formatPrice(total)}`}
          </button>
        </form>

        <div>
          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm sticky top-24">
            <h2 className="font-serif text-lg font-bold tracking-tight text-[#2C2416]">Ringkasan Pesanan</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[#F0EBE0]">
                    <Image src={item.image} alt={item.name} fill unoptimized sizes="56px" className="object-cover contrast-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-[#2C2416] line-clamp-1">{item.name}</p>
                    <p className="font-sans text-xs text-[#C4B8A2]">{item.quantity}x {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-sans text-sm font-bold text-[#2C2416]">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[#F0EBE0] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-sans text-base text-[#A8987F]">Total</span>
                <span className="font-serif text-xl font-bold tracking-tight text-[#1A3626]">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 font-sans text-xs text-[#C4B8A2]">Gratis ongkir ke seluruh Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
