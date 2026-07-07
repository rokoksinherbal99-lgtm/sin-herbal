import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface Props {
  searchParams: Promise<{ orderId: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
      <h1 className="mt-4 text-2xl font-bold text-gray-800">Pesanan Berhasil!</h1>
      <p className="mt-2 text-gray-600">
        Terima kasih! Pesanan Anda telah kami terima.
      </p>
      <p className="mt-1 text-sm text-gray-400">ID Pesanan: {orderId}</p>
      <Link
        href="/products"
        className="mt-8 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
      >
        Lanjut Belanja
      </Link>
    </div>
  );
}
