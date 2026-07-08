import Link from "next/link";

export default function ProductsNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-gray-500">Halaman tidak ditemukan</p>
      <Link href="/products" className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-2 font-semibold text-white hover:bg-green-800">
        Lihat Semua Produk
      </Link>
    </div>
  );
}
