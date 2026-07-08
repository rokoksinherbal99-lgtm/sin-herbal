"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingBag, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/Toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setStats(data);
      })
      .catch(() => toast("Gagal memuat statistik", "error"))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Produk", value: loading ? "..." : stats.products, icon: Package, href: "/admin/products", color: "bg-blue-500" },
    { label: "Total Pesanan", value: loading ? "..." : stats.orders, icon: ShoppingBag, href: "/admin/orders", color: "bg-green-500" },
    { label: "Pendapatan", value: loading ? "..." : formatPrice(stats.revenue), icon: TrendingUp, href: "/admin/orders", color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-white ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
