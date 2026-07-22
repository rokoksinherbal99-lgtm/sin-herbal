export type FlowStep = {
  question: string;
  options?: string[];
};

export type Flow = {
  id: string;
  name: string;
  triggerKeywords: string[];
  steps: FlowStep[];
  completeMessage: string;
};

export const FLOWS: Flow[] = [
  {
    id: "order",
    name: "Bantuan Order",
    triggerKeywords: ["order", "beli", "pesan", "cara beli", "mau order", "pengen order"],
    steps: [
      { question: "Produk apa yang mau Kakak beli?", options: ["Sin Platinum TSI (17.5k)", "Sin Kujang Mas TSI (17.5k)", "Sin Trust (31k)", "Sin Provost 19 (24.5k)", "Sin Precision (25.5k)", "Sin Krakatau (57.5k)", "Kopi Mana Kopi (57.6k)", "Kopi Original (40k)", "Lainnya"] },
      { question: "Berapa banyak yang mau dipesan?" },
      { question: "Nama Kakak siapa?" },
      { question: "Alamat lengkap dikirim ke mana? (Kecamatan, Kota, Provinsi, Kode Pos)" },
      { question: "No. HP yang bisa dihubungi?", options: ["Ya, kirim via WA"] },
    ],
    completeMessage: "Terima kasih Kak! Data sudah dicatat. Admin kami akan segera menghubungi via WhatsApp untuk konfirmasi pesanan. Sementara itu, Kakak bisa langsung transfer ke rekening Sin Herbal ya 🙏",
  },
  {
    id: "complaint",
    name: "Komplain",
    triggerKeywords: ["komplain", "rusak", "salah", "tidak sesuai", "kecewa", "masalah", "error"],
    steps: [
      { question: "Maaf Kak, ada masalah apa dengan pesanannya?" },
      { question: "Sudah berapa lama pesanan diterima?" },
      { question: "Boleh minta foto barang & packing-nya?" },
    ],
    completeMessage: "Baik Kak, saya catat komplainnya. Langsung diteruskan ke admin ya. Mereka akan WA Kakak dalam 1x24 jam. Terima kasih sudah melapor 🙏",
  },
  {
    id: "recommendation",
    name: "Rekomendasi Produk",
    triggerKeywords: ["rekomendasi", "saran", "cocok", "bingung", "belum tahu", "rekomend"],
    steps: [
      { question: "Kakak mau coba yang dihisap (rokok herbal SKT/SKM) atau diminum (kopi herbal)?", options: ["Rokok SKT", "Rokok SKM", "Kopi", "Belum tahu"] },
      { question: "Kalau rokok: suka rasa original, menthol (segar), atau yang premium?", options: ["Original", "Menthol", "Premium", "Gak tahu"] },
    ],
    completeMessage: "Saran saya Kakak coba Sin New Normal ORG (13.5k, termurah) atau Sin Sinergi Mind Menthol (15k, ringan). Untuk kopi, Kopi Original (40k) paling pas buat pemula. Langsung order lewat website atau chat WA admin ya!",
  },
  {
    id: "info_produk",
    name: "Info Produk",
    triggerKeywords: ["info produk", "detail produk", "jelasin", "spesifikasi", "kandungan produk"],
    steps: [
      { question: "Produk apa yang mau Kakak tanyakan?", options: ["Sin Platinum TSI", "Sin Trust", "Sin Krakatau", "Sin Precision", "Kopi Mana Kopi", "Lainnya"] },
      { question: "Mau tahu tentang apa? (rasa, harga, kandungan, cara pakai)", options: ["Rasa", "Harga", "Kandungan", "Cara pakai"] },
    ],
    completeMessage: "Info detailnya sudah aku jelasin di atas Kak. Ada lagi yang ditanyakan? 😊",
  },
];

export function detectFlow(message: string): Flow | null {
  const lower = message.toLowerCase().trim();
  const excludePatterns = ["beli satuan", "beli satu", "beli dikit", "beli 5", "beli 10", "beli banyak", "beli langsung", "beli langsung ke toko", "minimal order", "min order", "minimum order", "ada minimum", "ada minimal", "gak ada minimum", "nggak ada minimum", "no minimum", "anak", "umur", "usia", "lacak", "tracking", "ganti alamat", "ubah alamat"];
  if (excludePatterns.some((p) => lower.includes(p))) return null;
  for (const flow of FLOWS) {
    if (flow.triggerKeywords.some((k) => lower.includes(k))) return flow;
  }
  return null;
}
