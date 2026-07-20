import Link from "next/link";
import { CheckCircle, Search } from "lucide-react";
import { BankInfo } from "./bank-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesanan Berhasil",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ orderId: string; total: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId, total } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D5E0D3]">
        <CheckCircle className="h-10 w-10 text-[#2C4C3B]" strokeWidth={1.5} />
      </div>
      <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Pesanan Berhasil!</h1>
      <p className="mt-2 font-sans text-sm text-[#A8987F]">
        Terima kasih! Pesanan Anda telah tercatat dan akan diproses setelah pembayaran dikonfirmasi.
      </p>
      <div className="mx-auto mt-6 inline-block rounded-sm border border-[#E0D7C5] bg-[#F0EBE0] px-6 py-3">
        <p className="font-sans text-xs text-[#A8987F]">ID Pesanan</p>
        <p className="font-mono text-sm font-semibold text-[#1A3626]">{orderId}</p>
      </div>

      <BankInfo orderId={orderId} total={total} />

      <div className="organic-divider mx-auto mt-4 max-w-[120px]" />

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={`/lacak-pesanan`}
          className="inline-flex items-center gap-2 rounded-sm border-2 border-[#2C4C3B] bg-[#FDFBF7] px-6 py-3 font-sans font-semibold text-[#2C4C3B] transition hover:bg-[#D5E0D3]"
        >
          <Search className="h-4 w-4" strokeWidth={1.5} />
          Lacak Pesanan
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-sm bg-[#1A3626] px-6 py-3 font-sans font-semibold text-[#F9F6F0] transition hover:bg-[#2C4C3B]"
        >
          Lanjut Belanja
        </Link>
      </div>
    </div>
  );
}
