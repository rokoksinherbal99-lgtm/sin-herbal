export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
        <p className="mt-3 text-sm text-gray-500">Memuat...</p>
      </div>
    </div>
  );
}
