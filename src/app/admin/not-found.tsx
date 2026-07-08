import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-gray-500">Halaman tidak ditemukan</p>
      <Link href="/admin/dashboard" className="mt-6 rounded-lg bg-green-700 px-6 py-2 font-semibold text-white hover:bg-green-800">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
