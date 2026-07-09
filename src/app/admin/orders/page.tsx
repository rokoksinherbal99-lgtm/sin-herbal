"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface OrderItem {
  id: string; name: string; quantity: number; price: number;
}

interface Order {
  id: string; customer: string; email: string; total: number; status: string;
  createdAt: string; items: OrderItem[];
}

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else throw new Error();
      })
      .catch(() => toast("Gagal memuat pesanan", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    if (status === "cancelled" && !confirm("Batalkan pesanan ini?")) return;
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal");
      }
      toast("Status berhasil diubah");
      fetchOrders();
    } catch (err: any) {
      toast(err.message || "Gagal mengubah status", "error");
    }
  };

  const filtered = orders
    .filter((o) => !statusFilter || o.status === statusFilter)
    .filter((o) => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.email.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Pesanan</h1>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari customer, email, atau ID..." className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">Semua Status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="mt-6 space-y-4">
        {loading && <p className="py-12 text-center text-gray-400">Memuat...</p>}
        {!loading && filtered.map((order) => (
          <div key={order.id} className="rounded-xl border bg-white shadow-sm">
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-800">{order.customer}</p>
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColor[order.status] || "bg-gray-100 text-gray-600"}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="font-bold text-green-700">{formatPrice(order.total)}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
                </div>
                {expanded === order.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
              </div>
            </button>
            {expanded === order.id && (
              <div className="border-t px-6 py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="text-gray-800">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">ID Pesanan</p>
                    <p className="text-gray-800 font-mono text-xs">{order.id}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <label className="text-sm text-gray-500">Ubah Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-lg border px-3 py-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
        {!loading && filtered.length === 0 && <p className="py-12 text-center text-gray-400">{search || statusFilter ? "Tidak ada pesanan yang cocok." : "Belum ada pesanan."}</p>}
      </div>
    </div>
  );
}
