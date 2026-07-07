"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    customer: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);

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
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input required value={form.customer} onChange={(e) => update("customer", e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">No. HP</label>
            <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Alamat</label>
            <textarea required value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full rounded-lg border px-3 py-2" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Kota</label>
              <input required value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Provinsi</label>
              <input required value={form.province} onChange={(e) => update("province", e.target.value)} className="w-full rounded-lg border px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Kode Pos</label>
            <input required value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Memproses..." : `Bayar ${formatPrice(total)}`}
          </button>
        </form>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Ringkasan Pesanan</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity}x {formatPrice(item.price)}</p>
                </div>
                <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-green-700">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
