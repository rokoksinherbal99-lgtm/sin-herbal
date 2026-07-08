"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Leaf, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const count = items.reduce((a, b) => a + b.quantity, 0);

  useEffect(() => { setHydrated(true); }, []);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/products", label: "Produk" },
    { href: "/harga", label: "Harga" },
    { href: "/tentang-kami", label: "Tentang" },
    { href: "/faq", label: "FAQ" },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-900/20 transition group-hover:shadow-emerald-900/30 group-hover:scale-105">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-emerald-900">Sin Herbal</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${isActive(l.href) ? "text-emerald-700" : "text-gray-500 hover:text-emerald-600"}`}>
              {l.label}
              {isActive(l.href) && <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-emerald-500" />}
            </Link>
          ))}
          <Link href="/cart" className="relative ml-2 rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600">
            <ShoppingCart className="h-5 w-5" />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-1 text-[10px] font-bold text-white shadow-sm animate-scale-in">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/cart" className="relative rounded-lg p-2 text-gray-500">
            <ShoppingCart className="h-5 w-5" />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-1 text-[10px] font-bold text-white shadow-sm">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 left-0 z-50 mx-4 mb-4 overflow-hidden rounded-2xl border border-emerald-100/50 bg-white shadow-2xl shadow-emerald-900/10 md:hidden animate-scale-in">
            <div className="p-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${isActive(l.href) ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"}`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
