"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { Save, Info } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    wa_phone_number_id: "",
    wa_access_token: "",
    wa_verify_token: "",
    wa_business_phone: "",
    wa_admin_phone: "",
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

  const webhookUrl = typeof window !== "undefined" ? `${window.location.origin}/api/whatsapp/webhook` : "";

  if (loading) return <p className="py-12 text-center text-gray-400">Memuat...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Pengaturan WhatsApp</h1>
      <p className="mt-1 text-sm text-gray-400">Konfigurasi WhatsApp Cloud API untuk notifikasi & deteksi pesanan</p>

      <div className="mt-6 space-y-6 max-w-2xl">
        <div className="rounded-xl border bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Cara Setup WhatsApp Cloud API:</p>
              <ol className="mt-2 ml-4 list-decimal space-y-1">
                <li>Buka <a href="https://developers.facebook.com" target="_blank" className="underline">developers.facebook.com</a> & buat App</li>
                <li>Pilih jenis "Business", lalu tambahkan product "WhatsApp"</li>
                <li>Di halaman WhatsApp &gt; API Setup, dapatkan <strong>Phone Number ID</strong> & <strong>Access Token</strong></li>
                <li>Isi <strong>Verify Token</strong> dengan kata kunci terserah (contoh: <code>sinherbal123</code>)</li>
                <li>Setel Webhook URL di Meta ke: <code className="block mt-1 break-all bg-blue-100 px-2 py-1 rounded text-xs">{webhookUrl}</code></li>
                <li>Masukkan nomor <strong>Admin Phone</strong> (nomor kamu) untuk terima notifikasi</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
            <input value={config.wa_phone_number_id} onChange={(e) => setConfig({ ...config, wa_phone_number_id: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm font-mono" placeholder="123456789012345" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Access Token</label>
            <input value={config.wa_access_token} onChange={(e) => setConfig({ ...config, wa_access_token: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm font-mono" placeholder="EAAx..." type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Verify Token</label>
            <input value={config.wa_verify_token} onChange={(e) => setConfig({ ...config, wa_verify_token: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm font-mono" placeholder="sinherbal123" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Phone Number</label>
            <input value={config.wa_business_phone} onChange={(e) => setConfig({ ...config, wa_business_phone: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="628123456789" />
            <p className="mt-1 text-xs text-gray-400">Nomor WhatsApp Bisnis yang akan menerima webhook (format internasional, tanpa +)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Phone (untuk notifikasi)</label>
            <input value={config.wa_admin_phone} onChange={(e) => setConfig({ ...config, wa_admin_phone: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="628123456789" />
            <p className="mt-1 text-xs text-gray-400">Nomor kamu untuk menerima notifikasi ketika ada order baru (format internasional, tanpa +)</p>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save className="h-4 w-4" /> {saving ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </div>
  );
}
