"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { Save, Store } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    wa_phone: "",
    address: "",
    email: "",
    shipping_info: "",
    operating_hours: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setConfig((prev) => ({ ...prev, ...data }));
      })
      .catch(() => toast("Gagal memuat settings", "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error();
      toast("Pengaturan berhasil disimpan");
    } catch {
      toast("Gagal menyimpan pengaturan", "error");
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: string) => setConfig((prev) => ({ ...prev, [key]: value }));

  if (loading) return <p className="py-12 text-center text-gray-400">Memuat...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Pengaturan Toko</h1>
      <p className="mt-1 text-sm text-gray-400">Kelola informasi toko yang tampil di footer & halaman kontak</p>

      <div className="mt-8 max-w-2xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Informasi Toko</h2>
              <p className="text-xs text-gray-400">Data ini otomatis tampil di footer, kontak, FAQ, dan tombol WA</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
              <input value={config.wa_phone} onChange={(e) => update("wa_phone", e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="6281383863456" />
              <p className="mt-1 text-xs text-gray-400">Format internasional tanpa + (contoh: 6281383863456)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alamat Toko</label>
              <textarea value={config.address} onChange={(e) => update("address", e.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="Ruko Sentra Niaga Blok A1 No. 5, Pakisaji, Malang 65162" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input value={config.email} onChange={(e) => update("email", e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="info@sinherbal.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Info Ongkir</label>
              <input value={config.shipping_info} onChange={(e) => update("shipping_info", e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="Gratis ongkir untuk area tertentu..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jam Operasional</label>
              <input value={config.operating_hours} onChange={(e) => update("operating_hours", e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="Senin - Sabtu 08.00 - 17.00, Minggu 09.00 - 14.00" />
              <p className="mt-1 text-xs text-gray-400">Pisahkan baris dengan enter (contoh: hari &quot;Senin - Sabtu&quot; di baris pertama, jam &quot;08.00 - 17.00&quot; di baris kedua)</p>
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary mt-6 flex items-center gap-2">
          <Save className="h-4 w-4" /> {saving ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </div>
  );
}
