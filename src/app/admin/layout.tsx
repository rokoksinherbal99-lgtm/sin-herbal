"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, Settings, LogOut, Menu, X } from "lucide-react";
import { ToastProvider } from "@/components/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => {
        if (r.ok) setAuthed(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const logout = () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    setAuthed(false);
    router.push("/admin");
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center text-gray-400">Memuat...</div>;
  if (!authed && pathname !== "/admin") { router.push("/admin"); return null; }
  if (pathname === "/admin" && !authed) return <ToastProvider>{children}</ToastProvider>;

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produk", icon: Package },
    { href: "/admin/orders", label: "Pesanan", icon: ShoppingBag },
    { href: "/admin/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed left-4 top-3 z-50 rounded-lg border bg-white p-2 shadow md:hidden"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <aside className={`flex w-56 flex-col border-r bg-gray-50 p-4 transition-transform md:relative md:translate-x-0 ${sidebarOpen ? "fixed inset-y-0 left-0 z-40 translate-x-0" : "fixed -translate-x-full md:translate-x-0"}`}>
          <Link href="/" className="mb-8 mt-6 flex items-center gap-2 text-lg font-bold text-green-800 md:mt-0">
            Sin Herbal
          </Link>
          <nav className="flex flex-col gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${pathname.startsWith(item.href) ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button onClick={logout} className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </aside>
        {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </ToastProvider>
  );
}
