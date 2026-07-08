"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { MessageCircle, CreditCard, ChevronLeft, ShoppingBag } from "lucide-react";

const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    customer: "", email: "", phone: "", address: "", city: "", province: "", postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"wa" | "midtrans">("wa");
  const midtransAvailable = false; // belum dikonfigurasi

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, total }),
      });
      const order = await res.json();

      if (paymentMethod === "wa") {
        const msg = `Halo Sin Herbal!%0A%0ASaya ingin order:%0A${items.map((i) => `- ${i.name} x${i.quantity} = Rp ${(i.price * i.quantity).toLocaleString("id-ID")}`).join("%0A")}%0A%0ATotal: Rp ${total.toLocaleString("id-ID")}%0A%0ANama: ${form.customer}%0AEmail: ${form.email}%0ATelp: ${form.phone}%0AAlamat: ${form.address}, ${form.city}, ${form.province} ${form.postalCode}%0A%0AOrder ID: ${order.id}`;
        clearCart();
        router.push(`https://wa.me/${WA_PHONE}?text=${msg}`);
      } else {
        const payRes = await fetch("/api/payments/midtrans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order.id, ...form, items }),
        });
        const payData = await payRes.json();
        clearCart();
        if (payData.redirect_url) {
          window.location.href = payData.redirect_url;
        } else {
          router.push(`/checkout/success?orderId=${order.id}`);
        }
      }
    } catch {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Keranjang Kosong</h1>
        <p className="mt-2 text-gray-500">Tidak ada produk untuk di-checkout.</p>
        <Link href="/cart" className="btn-primary mt-8 gap-2">
          Lihat Keranjang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-emerald-600 transition hover:text-emerald-700">
        <ChevronLeft className="h-4 w-4" /> Kembali ke Keranjang
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Checkout</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-900">Data Diri</h2>
            <input required value={form.customer} onChange={(e) => update("customer", e.target.value)} placeholder="Nama Lengkap" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="No. HP" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-900">Alamat Pengiriman</h2>
            <textarea required value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Alamat Lengkap" rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            <div className="grid grid-cols-2 gap-3">
              <input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Kota" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
              <input required value={form.province} onChange={(e) => update("province", e.target.value)} placeholder="Provinsi" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </div>
            <input required value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="Kode Pos" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900">Metode Pembayaran</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setPaymentMethod("wa")} className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3.5 text-sm font-semibold transition-all ${
                paymentMethod === "wa" ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}>
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </button>
              <button type="button" disabled className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-50 p-3.5 text-sm font-semibold text-gray-400">
                <CreditCard className="h-5 w-5" /> Online <span className="text-[10px] text-gray-300">(Segera)</span>
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full gap-2 text-base">
            {loading ? "Memproses..." : `Pesan ${formatPrice(total)}`}
          </button>
        </form>

        <div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900">Ringkasan Pesanan</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.quantity}x {formatPrice(item.price)}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Total</span>
                <span className="text-xl font-bold text-emerald-600">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-xs text-gray-400">Gratis ongkir ke seluruh Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
