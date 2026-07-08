"use client";

import { useState } from "react";
import { Truck, Search, MapPin, Package } from "lucide-react";
import { provinces, type Province } from "@/data/indonesia";
import { findZone, getFallbackZone } from "@/data/shipping";
import type { ShippingZone } from "@/data/shipping";

const couriers = ["JNE", "SiCepat", "J&T"];

export default function CekOngkirPage() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [weight, setWeight] = useState(1);
  const [result, setResult] = useState<ShippingZone | null>(null);

  const currentProvince: Province | undefined = provinces.find((p) => p.id === selectedProvince);

  const handleCek = () => {
    if (!selectedCity || !selectedCourier) return;
    const zone = findZone(
      currentProvince?.cities.find((c) => c.id === selectedCity)?.name || ""
    ) || getFallbackZone();
    setResult(zone);
  };

  const cityName = currentProvince?.cities.find((c) => c.id === selectedCity)?.name || "";

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Cek Ongkir</span>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">Cek Biaya Pengiriman</h1>
          <p className="mt-2 text-gray-500">Cek ongkos kirim ke kota Anda sebelum checkout</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Form Cek Ongkir</h2>
                  <p className="text-xs text-gray-400">Isi data pengiriman Anda</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => { setSelectedProvince(e.target.value); setSelectedCity(""); setResult(null); }}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-white"
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => { setSelectedCity(e.target.value); setResult(null); }}
                    disabled={!selectedProvince}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Pilih Kota</option>
                    {currentProvince?.cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Berat (kg)</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={weight}
                      onChange={(e) => { setWeight(parseFloat(e.target.value) || 1); setResult(null); }}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kurir</label>
                  <div className="grid grid-cols-3 gap-2">
                    {couriers.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setSelectedCourier(c); setResult(null); }}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                          selectedCourier === c
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCek}
                  disabled={!selectedCity || !selectedCourier}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cek Ongkir
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Hasil Cek Ongkir</h2>
                  <p className="text-xs text-gray-400">Tarif reguler per kg</p>
                </div>
              </div>

              {!result ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <Truck className="h-10 w-10 mb-3 text-gray-300" />
                  <p className="text-sm text-center">Pilih kota &amp; kurir lalu klik &quot;Cek Ongkir&quot;</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm">
                    <span className="text-gray-500">Tujuan:</span>
                    <span className="ml-1 font-semibold text-gray-900">{cityName || selectedCity}</span>
                    <br />
                    <span className="text-gray-500">Berat:</span>
                    <span className="ml-1 font-semibold text-gray-900">{weight} kg</span>
                  </div>
                  {result.rates
                    .filter((r) => r.courier === selectedCourier)
                    .map((rate, i) => (
                      <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">{rate.service}</p>
                            <p className="text-xs text-gray-400">{rate.courier} — estimasi {rate.est}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-600">
                              Rp {(rate.cost * weight).toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-gray-400">@{rate.cost.toLocaleString("id-ID")}/kg</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {result.rates.filter((r) => r.courier === selectedCourier).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">Tidak ada tarif untuk kurir {selectedCourier} ke wilayah ini</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
