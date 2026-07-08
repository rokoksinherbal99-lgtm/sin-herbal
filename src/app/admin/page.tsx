"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error === "Admin not configured" ? "Admin belum dikonfigurasi" : "Password salah");
      }
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
      <form onSubmit={handleLogin} className="w-full max-w-sm animate-scale-in">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-200">
            <Leaf className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-900">Admin</h1>
          <p className="mt-1 text-center text-sm text-gray-400">Sin Herbal</p>
          {error && <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600"><Lock className="h-4 w-4 shrink-0" />{error}</p>}
          <div className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              autoFocus
              autoComplete="current-password"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="btn-primary w-full gap-2">
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            <Link href="/" className="transition hover:text-emerald-600">Kembali ke Beranda</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
