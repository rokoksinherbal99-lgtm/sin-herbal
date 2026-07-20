"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductGrid from "./product-grid";

interface Product {
  id: string; name: string; slug: string; price: number; images: string;
  stock: number; featured: boolean;
  category: { id: string; name: string } | null;
  createdAt: string;
}

interface Category {
  id: string; name: string; slug: string;
}

export default function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/products").then<Product[]>((r) => r.json()),
      fetch("/api/categories").then<Category[]>((r) => r.json()),
    ]).then(([prods, cats]) => {
      if (cancelled) return;
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) { setError("Gagal memuat produk"); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
      <p className="mt-3 text-sm text-gray-500">Memuat produk...</p>
    </div>
  );

  if (error) return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-sm text-red-500">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 btn-primary">Coba Lagi</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 font-sans text-sm text-[#ABC1A7]">
        <Link href="/" className="transition hover:text-[#2C4C3B]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A3626]">Produk</span>
      </nav>
      <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Semua Produk</h1>
      <p className="mt-2 font-sans text-sm text-[#5D8356]">Jelajahi koleksi produk herbal kami.</p>
      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
