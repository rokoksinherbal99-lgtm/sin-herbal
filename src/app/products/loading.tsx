export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
      <p className="mt-3 text-sm text-gray-500">Memuat produk...</p>
    </div>
  );
}
