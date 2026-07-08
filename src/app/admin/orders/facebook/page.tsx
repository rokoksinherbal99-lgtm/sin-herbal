"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { Plus, Trash2 } from "lucide-react";

interface Product {
  id: string; name: string; price: number; stock: number;
}

interface LineItem {
  productId: string; productName: string; price: number; quantity: number;
}

export default function FacebookOrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ productId: "", productName: "", price: 0, quantity: 1 }]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setProducts(data); })
      .catch(() => toast("Gagal memuat produk", "error"));
  }, []);

  const addItem = () => {
    setItems([...items, { productId: "", productName: "", price: 0, quantity: 1 }]);
  };

  const removeItem = (idx: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items];
    if (field === "productId") {
      const prod = products.find((p) => p.id === value);
      updated[idx] = { ...updated[idx], productId: String(value), productName: prod?.name || "", price: prod?.price || 0, quantity: 1 };
    } else {
      (updated[idx] as any)[field] = value;
    }
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) { toast("Nama customer wajib diisi", "error"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/orders/facebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, phone, items, notes }),
      });
      if (!res.ok) throw new Error();
      toast("Pesanan Facebook berhasil ditambahkan");
      router.push("/admin/orders");
    } catch {
      toast("Gagal menyimpan pesanan", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Tambah Pesanan Facebook</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Customer *</label>
            <input value={customer} onChange={(e) => setCustomer(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Items Pesanan</label>
            <button type="button" onClick={addItem} className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700">
              <Plus className="h-4 w-4" /> Tambah Item
            </button>
          </div>
          <div className="mt-2 space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border p-3">
                <select
                  value={item.productId}
                  onChange={(e) => updateItem(idx, "productId", e.target.value)}
                  className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  required
                >
                  <option value="">Pilih produk...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} - Rp {p.price.toLocaleString()} (stok: {p.stock})</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, "quantity", parseInt(e.target.value) || 1)}
                  className="w-20 rounded-lg border px-3 py-2 text-sm text-center"
                />
                <span className="w-24 text-right text-sm font-medium text-gray-700">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </span>
                <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <span className="text-sm font-medium text-gray-700">Total</span>
          <span className="text-lg font-bold text-green-700">Rp {total.toLocaleString()}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Catatan</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Menyimpan..." : "Simpan Pesanan"}
          </button>
          <button type="button" onClick={() => router.push("/admin/orders")} className="btn-secondary">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
