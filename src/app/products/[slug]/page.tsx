import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, and, ne, asc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Package, CheckCircle } from "lucide-react";
import AddToCartButton from "./add-to-cart-button";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).leftJoin(categories, eq(products.categoryId, categories.id)).limit(1);
  if (!row || !row.categories) notFound();
  const product = { ...row.products, category: row.categories };

  const related = await db.select().from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
    .orderBy(asc(products.name))
    .limit(4);

  const typeStyles: Record<string, string> = {
    "Rokok Herbal SKT": "bg-amber-50 text-amber-700 border-amber-200",
    "Rokok Herbal SKM": "bg-blue-50 text-blue-700 border-blue-200",
    "Minuman Herbal": "bg-teal-50 text-teal-700 border-teal-200",
    "Minyak Herbal": "bg-orange-50 text-orange-700 border-orange-200",
    Suplemen: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-8 text-sm text-gray-400">
        <Link href="/" className="transition hover:text-emerald-600">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="transition hover:text-emerald-600">Produk</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="group relative">
          <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg shadow-gray-200/50">
            <img
              src={product.images}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          {product.productType && (
            <span className={`absolute top-4 left-4 rounded-xl border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${typeStyles[product.productType] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {product.productType}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Package className="h-3.5 w-3.5" />
              {product.category.name}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{product.name}</h1>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-emerald-600">{formatPrice(product.price)}</span>
            {product.stock > 0 && <span className="text-sm text-emerald-500 font-medium">/ unit</span>}
          </div>
          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="leading-relaxed text-gray-600">{product.description}</p>
          </div>
          <div className="mt-6 space-y-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-5">
            {product.manufacturer && (
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-gray-600">Produsen: <strong className="text-gray-800">{product.manufacturer}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-gray-600">Stok: <strong className="text-gray-800">{product.stock > 0 ? `${product.stock} tersedia` : "Habis"}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-gray-600">Produk terdaftar di Bea dan Cukai</span>
            </div>
          </div>
          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images}
            slug={product.slug}
            disabled={product.stock < 1}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Terkait</span>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Produk Terkait</h2>
            </div>
            <Link href="/products" className="btn-secondary text-sm gap-1">
              Lihat Semua
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.products.id} id={r.products.id} name={r.products.name} slug={r.products.slug} price={r.products.price} image={r.products.images} productType={r.products.productType || undefined} stock={r.products.stock} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
