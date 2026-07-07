import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  slug: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, slug, price, image }: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="mt-1 font-bold text-green-700">{formatPrice(price)}</p>
    </Link>
  );
}
