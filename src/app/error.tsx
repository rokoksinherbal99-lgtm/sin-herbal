"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-2xl font-bold text-[#2C2416]">Ada yang tidak beres</h1>
      <p className="mt-2 text-sm text-[#A8987F]">
        Terjadi kesalahan yang tidak terduga. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-sm bg-[#1A3626] px-6 py-3 font-sans font-semibold text-[#F9F6F0] transition hover:bg-[#2C4C3B]"
      >
        Coba Lagi
      </button>
    </div>
  );
}