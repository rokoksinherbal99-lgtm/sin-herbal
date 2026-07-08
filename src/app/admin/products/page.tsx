"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/components/Toast";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string; name: string; slug: string; price: number; stock: number; featured: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else throw new Error();
      })
      .catch(() => toast("Gagal memuat produk", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast("Produk berhasil dihapus");
      fetchProducts();
    } catch {
      toast("Gagal menghapus produk", "error");
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !featured }),
      });
      if (!res.ok) throw new Error();
      fetchProducts();
    } catch {
      toast("Gagal mengubah status unggulan", "error");
    }
  };

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * mul;
      return (a[sortBy] - b[sortBy]) * mul;
    });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Produk</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
          <Plus className="h-4 w-4" /> Tambah Produk
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="name">Nama</option>
          <option value="price">Harga</option>
          <option value="stock">Stok</option>
        </select>
        <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className="rounded-lg border px-3 py-2 text-sm">
          {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Nama</th>
              <th className="px-4 py-3 font-medium text-gray-600">Harga</th>
              <th className="px-4 py-3 font-medium text-gray-600">Stok</th>
              <th className="px-4 py-3 font-medium text-gray-600">Unggulan</th>
              <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium text-gray-800">
                  <Link href={`/products/${p.slug}`} className="hover:text-green-700">{p.name}</Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-gray-600">{p.stock}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleFeatured(p.id, p.featured)}
                    className={`rounded px-2 py-1 text-xs font-medium ${p.featured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {p.featured ? "Ya" : "Tidak"}
                  </button>
                </td>
                <td className="flex gap-2 px-4 py-3">
                  <Link href={`/admin/products/edit/${p.id}`} className="rounded p-1 text-blue-600 hover:bg-blue-50" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button onClick={() => remove(p.id)} className="rounded p-1 text-red-600 hover:bg-red-50" title="Hapus">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="p-8 text-center text-gray-400">Memuat...</p>}
        {!loading && filtered.length === 0 && <p className="p-8 text-center text-gray-400">{search ? "Tidak ada produk yang cocok." : "Belum ada produk."}</p>}
      </div>
    </div>
  );
}
