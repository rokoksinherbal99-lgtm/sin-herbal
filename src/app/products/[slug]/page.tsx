import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToCartButton from "./add-to-cart-button";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-green-700">{product.category.name}</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-green-700">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>
          <p className="mt-2 text-sm text-gray-400">
            Stok: {product.stock > 0 ? `${product.stock} tersedia` : "Habis"}
          </p>
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
    </div>
  );
}
