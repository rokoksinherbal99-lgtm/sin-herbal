"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface Category {
  id: string; name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", slug: "", description: "", price: "", stock: "0", images: "", categoryId: "", productType: "", manufacturer: "PR UD Putra Bintang Timur, Malang", featured: false });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string | boolean) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then((list: any[]) => {
      const cats = new Map<string, Category>();
      list.forEach((p: any) => { if (p.category) cats.set(p.category.id, p.category); });
      const arr = Array.from(cats.values());
      setCategories(arr);
      if (arr.length > 0 && !form.categoryId) setForm((prev) => ({ ...prev, categoryId: arr[0].id }));
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug.match(/^[a-z0-9-]+$/)) {
      toast("Slug hanya boleh huruf kecil, angka, dan tanda hubung", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
      });
      if (!res.ok) throw new Error();
      toast("Produk berhasil ditambahkan");
      router.push("/admin/products");
    } catch {
      toast("Gagal menambahkan produk", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} pattern="[a-z0-9-]+" title="Huruf kecil, angka, dan tanda hubung" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategori</label>
            <select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              {categories.length === 0 && <option value="">-- Pilih Kategori --</option>}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
            <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stok</label>
            <input required type="number" min="0" value={form.stock} onChange={(e) => update("stock", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea required value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipe Produk</label>
            <select value={form.productType} onChange={(e) => update("productType", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="">-- Pilih Tipe --</option>
              <option value="Rokok Herbal SKT">Rokok Herbal SKT</option>
              <option value="Rokok Herbal SKM">Rokok Herbal SKM</option>
              <option value="Minuman Herbal">Minuman Herbal</option>
              <option value="Minyak Herbal">Minyak Herbal</option>
              <option value="Suplemen">Suplemen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Produsen</label>
            <input value={form.manufacturer} onChange={(e) => update("manufacturer", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Path Gambar</label>
          <input required value={form.images} onChange={(e) => update("images", e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="/images/product.svg" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} id="featured" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Produk Unggulan</label>
        </div>
        <button type="submit" disabled={loading} className="rounded-lg bg-green-700 px-6 py-2 font-semibold text-white hover:bg-green-800 disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
