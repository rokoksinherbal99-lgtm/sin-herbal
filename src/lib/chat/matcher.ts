import Fuse, { IFuseOptions } from "fuse.js";
import { KNOWLEDGE_BASE, type KnowledgeItem } from "./knowledge-base";

const SYNONYMS: Record<string, string[]> = {
  beli: ["order", "pesan", "membeli", "pembelian", "transaksi", "borong"],
  harga: ["biaya", "mahal", "murah", "berapa", "tarif", "cost", "duit", "uang"],
  bayar: ["transfer", "pembayaran", "payment", "lunas", "dibayar"],
  kirim: ["pengiriman", "delivery", "kurir", "ongkir", "sampai", "diantar"],
  rusak: ["cacat", "pecah", "sobek", "bocor", "bermasalah"],
  kembali: ["retur", "refund", "tukar", "ganti", "komplain"],
  bahan: ["kandungan", "komposisi", "isi", "terbuat", "material"],
  enak: ["rasa", "cocok", "mantap", "nikmat", "sedap", "keren"],
  stok: ["tersedia", "ready", "habis", "kosong", "ada"],
  rekomendasi: ["saran", "cocok", "saranku", "rekomen", "sarannya"],
  kontak: ["wa", "whatsapp", "telepon", "hubungi", "cs", "admin", "customer service"],
  lokasi: ["alamat", "dimana", "t tempat", "posisi"],
  kualitas: ["bagus", "berkualitas", "baik", "mantap", "oke"],
  legal: ["izin", "terdaftar", "halal", "bea cukai", "resmi"],
  sehat: ["aman", "bahaya", "risiko", "efek", "samping", "kanker"],
  mulai: ["coba", "transisi", "berhenti", "ganti", "pindah", "awal"],
  grosir: ["reseller", "dropship", "mitra", "agen", "distributor", "partai"],
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  produk: ["rokok", "kopi", "original", "menthol", "light", "herbal", "product"],
  harga: ["harga", "berapa", "mahal", "murah", "biaya", "13", "15", "17", "24", "25", "26", "27", "30", "31", "57", "40", "ribu", "k"],
  promo: ["promo", "diskon", "kupon", "voucher", "gratis", "kode", "sinherbal10"],
  pembayaran: ["bayar", "transfer", "bank", "bca", "mandiri", "gopay", "ovo", "dana", "qris", "cod", "rekening"],
  pengiriman: ["kirim", "ongkir", "kurir", "sampai", "estimasi", "jne", "j&t", "sicepat", "free ongkir"],
  order: ["order", "beli", "pesan", "checkout", "cart", "keranjang"],
  retur: ["retur", "refund", "kembali", "komplain", "rusak", "salah", "ganti"],
  kesehatan: ["sehat", "bahaya", "risiko", "efek", "samping", "kanker", "penyakit", "sembuh", "obat", "hamil"],
  kontak: ["kontak", "wa", "whatsapp", "telepon", "alamat", "email"],
  stok: ["stok", "tersedia", "ready", "habis", "kosong", "ketersediaan"],
  testimoni: ["testimoni", "review", "ulasan", "kata orang", "pengalaman"],
  brand: ["sin herbal", "tentang", "filosofi", "hisapan tenang", "perusahaan", "brand"],
};

const fuseOptions: IFuseOptions<KnowledgeItem> = {
  keys: [
    { name: "keywords", weight: 3 },
    { name: "question", weight: 2 },
    { name: "answer", weight: 1 },
  ],
  threshold: 0.45,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
};

const fuse = new Fuse(KNOWLEDGE_BASE, fuseOptions);

function expandSynonyms(text: string): string {
  let expanded = text;
  for (const [word, syns] of Object.entries(SYNONYMS)) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`\\b${escaped}\\b`, "i").test(text)) {
      expanded += " " + syns.join(" ");
    }
  }
  return expanded;
}

export function detectCategory(message: string): string | null {
  const lower = message.toLowerCase().trim();
  let best: string | null = null;
  let bestScore = 0;

  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  }

  return bestScore >= 1 ? best : null;
}

export function searchKnowledge(message: string): { item: KnowledgeItem; score: number } | null {
  const lower = message.toLowerCase().trim();
  if (!lower) return null;

  const expanded = expandSynonyms(lower);
  const results = fuse.search(expanded);

  if (results.length === 0) return null;

  const best = results[0];
  if (best.score && best.score > 0.65) return null;

  return { item: best.item, score: best.score ?? 1 };
}

export function searchKnowledgeTop(message: string, limit: number = 5): { item: KnowledgeItem; score: number }[] {
  const lower = message.toLowerCase().trim();
  if (!lower) return [];

  const expanded = expandSynonyms(lower);
  const results = fuse.search(expanded);

  const category = detectCategory(message);
  let filtered = results
    .filter((r) => r.score && r.score <= 0.65)
    .map((r) => ({ item: r.item, score: r.score ?? 1 }));

  if (category && filtered.length > 0) {
    const catMatches = filtered.filter((r) => r.item.category === category);
    const otherMatches = filtered.filter((r) => r.item.category !== category);
    filtered = [...catMatches, ...otherMatches];
  }

  return filtered.slice(0, limit);
}

export function searchKnowledgeByCategory(message: string, category: string, limit: number = 2): { item: KnowledgeItem; score: number }[] {
  const catItems = KNOWLEDGE_BASE.filter((item) => item.category === category);
  const catFuse = new Fuse(catItems, fuseOptions);

  const expanded = expandSynonyms(message.toLowerCase().trim());
  const results = catFuse.search(expanded);
  return results
    .filter((r) => r.score && r.score <= 0.65)
    .slice(0, limit)
    .map((r) => ({ item: r.item, score: r.score ?? 1 }));
}

export function searchKnowledgePriority(message: string): { item: KnowledgeItem; score: number }[] {
  const results = searchKnowledgeTop(message, 5);
  const prio = results.filter((r) => (r.item.priority ?? 0) > 0);
  const nonPrio = results.filter((r) => !r.item.priority || r.item.priority === 0);
  return [...prio, ...nonPrio];
}
