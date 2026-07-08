export interface CourierRate {
  courier: string;
  service: string;
  cost: number;
  est: string;
}

export interface ShippingZone {
  name: string;
  cities: string[];
  rates: CourierRate[];
}

export const defaultZones: ShippingZone[] = [
  {
    name: "Malang Raya",
    cities: ["Kota Malang", "Kab. Malang", "Kota Batu"],
    rates: [
      { courier: "JNE", service: "OKE", cost: 8000, est: "2-3 hari" },
      { courier: "JNE", service: "REG", cost: 10000, est: "1-2 hari" },
      { courier: "SiCepat", service: "REG", cost: 10000, est: "1-2 hari" },
      { courier: "J&T", service: "REG", cost: 10000, est: "1-2 hari" },
    ],
  },
  {
    name: "Jawa Timur",
    cities: [
      "Kota Surabaya", "Kab. Sidoarjo", "Kab. Gresik", "Kota Pasuruan", "Kab. Pasuruan",
      "Kota Probolinggo", "Kab. Probolinggo", "Kota Mojokerto", "Kab. Mojokerto",
      "Kota Kediri", "Kab. Kediri", "Kab. Jombang", "Kab. Lamongan",
      "Kota Madiun", "Kab. Madiun", "Kab. Nganjuk", "Kab. Ngawi", "Kab. Magetan",
      "Kab. Bojonegoro", "Kab. Tuban", "Kab. Blitar", "Kota Blitar",
      "Kab. Tulungagung", "Kab. Trenggalek", "Kab. Ponorogo", "Kab. Pacitan",
      "Kab. Lumajang", "Kab. Jember", "Kab. Bondowoso", "Kab. Situbondo",
      "Kab. Banyuwangi", "Kab. Bangkalan", "Kab. Sampang", "Kab. Pamekasan", "Kab. Sumenep",
    ],
    rates: [
      { courier: "JNE", service: "OKE", cost: 12000, est: "2-3 hari" },
      { courier: "JNE", service: "REG", cost: 15000, est: "1-2 hari" },
      { courier: "SiCepat", service: "REG", cost: 13000, est: "1-2 hari" },
      { courier: "J&T", service: "REG", cost: 14000, est: "1-2 hari" },
    ],
  },
  {
    name: "Jawa Tengah & DIY",
    cities: [
      "Kota Semarang", "Kab. Semarang", "Kota Salatiga", "Kota Surakarta", "Kota Magelang",
      "Kota Pekalongan", "Kota Tegal", "Kab. Cilacap", "Kab. Banyumas", "Kab. Purbalingga",
      "Kab. Banjarnegara", "Kab. Kebumen", "Kab. Purworejo", "Kab. Wonosobo",
      "Kab. Magelang", "Kab. Boyolali", "Kab. Klaten", "Kab. Sukoharjo", "Kab. Wonogiri",
      "Kab. Karanganyar", "Kab. Sragen", "Kab. Grobogan", "Kab. Blora", "Kab. Rembang",
      "Kab. Pati", "Kab. Kudus", "Kab. Jepara", "Kab. Demak", "Kab. Temanggung",
      "Kab. Kendal", "Kab. Batang", "Kab. Pekalongan", "Kab. Pemalang", "Kab. Tegal",
      "Kab. Brebes",
      "Kota Yogyakarta", "Kab. Sleman", "Kab. Bantul", "Kab. Gunung Kidul", "Kab. Kulon Progo",
    ],
    rates: [
      { courier: "JNE", service: "OKE", cost: 15000, est: "3-4 hari" },
      { courier: "JNE", service: "REG", cost: 18000, est: "2-3 hari" },
      { courier: "SiCepat", service: "REG", cost: 17000, est: "2-3 hari" },
      { courier: "J&T", service: "REG", cost: 17000, est: "2-3 hari" },
    ],
  },
  {
    name: "Jabodetabek & Banten",
    cities: [
      "Kota Jakarta Pusat", "Kota Jakarta Utara", "Kota Jakarta Barat", "Kota Jakarta Selatan", "Kota Jakarta Timur",
      "Kab. Kepulauan Seribu",
      "Kota Bogor", "Kab. Bogor", "Kota Depok", "Kota Bekasi", "Kab. Bekasi",
      "Kota Tangerang", "Kota Tangerang Selatan", "Kab. Tangerang",
      "Kota Serang", "Kab. Serang", "Kota Cilegon", "Kab. Pandeglang", "Kab. Lebak",
    ],
    rates: [
      { courier: "JNE", service: "OKE", cost: 18000, est: "4-5 hari" },
      { courier: "JNE", service: "REG", cost: 20000, est: "2-4 hari" },
      { courier: "SiCepat", service: "REG", cost: 19000, est: "2-3 hari" },
      { courier: "J&T", service: "REG", cost: 19000, est: "2-4 hari" },
    ],
  },
  {
    name: "Jawa Barat (non-Jabodetabek)",
    cities: [
      "Kota Bandung", "Kab. Bandung", "Kab. Bandung Barat", "Kota Cimahi",
      "Kota Sukabumi", "Kab. Sukabumi", "Kota Cirebon", "Kab. Cirebon",
      "Kab. Karawang", "Kab. Purwakarta", "Kab. Subang", "Kab. Indramayu",
      "Kab. Majalengka", "Kab. Kuningan", "Kab. Ciamis", "Kota Tasikmalaya",
      "Kab. Tasikmalaya", "Kab. Garut", "Kab. Cianjur", "Kab. Sumedang",
      "Kota Banjar", "Kab. Pangandaran",
    ],
    rates: [
      { courier: "JNE", service: "OKE", cost: 18000, est: "3-5 hari" },
      { courier: "JNE", service: "REG", cost: 20000, est: "2-4 hari" },
      { courier: "SiCepat", service: "REG", cost: 19000, est: "2-3 hari" },
      { courier: "J&T", service: "REG", cost: 20000, est: "2-4 hari" },
    ],
  },
  {
    name: "Sumatera",
    cities: [],
    rates: [
      { courier: "JNE", service: "OKE", cost: 30000, est: "5-8 hari" },
      { courier: "JNE", service: "REG", cost: 35000, est: "4-6 hari" },
      { courier: "SiCepat", service: "REG", cost: 33000, est: "4-6 hari" },
      { courier: "J&T", service: "REG", cost: 34000, est: "4-7 hari" },
    ],
  },
  {
    name: "Kalimantan, Sulawesi, Bali, Nusa Tenggara",
    cities: [],
    rates: [
      { courier: "JNE", service: "OKE", cost: 40000, est: "6-10 hari" },
      { courier: "JNE", service: "REG", cost: 45000, est: "5-8 hari" },
      { courier: "SiCepat", service: "REG", cost: 43000, est: "5-8 hari" },
      { courier: "J&T", service: "REG", cost: 44000, est: "5-8 hari" },
    ],
  },
  {
    name: "Maluku, Papua",
    cities: [],
    rates: [
      { courier: "JNE", service: "OKE", cost: 65000, est: "7-14 hari" },
      { courier: "JNE", service: "REG", cost: 75000, est: "5-10 hari" },
      { courier: "J&T", service: "REG", cost: 70000, est: "6-12 hari" },
    ],
  },
];

export function findZone(cityName: string): ShippingZone | undefined {
  return defaultZones.find((z) =>
    z.cities.some((c) => c.toLowerCase() === cityName.toLowerCase())
  );
}

export function getFallbackZone(): ShippingZone {
  return defaultZones[5];
}
