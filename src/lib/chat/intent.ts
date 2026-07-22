export type Intent =
  | "greeting"
  | "product_info"
  | "order"
  | "complaint"
  | "recommendation"
  | "shipping"
  | "payment"
  | "promo"
  | "general_question"
  | "off_topic";

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  greeting: [/^(halo|hi|hai|helo|pagi|siang|malam|selamat)\b/i, /^(makasih|thanks|terima kasih|trims)/i, /^(dadah|bye|sampai jumpa)/i, /baik|sehat|kabar/i],
  product_info: [/(rokok|kopi|herbal|original|menthol|light|varian|produk|katalog|jenis|rasa|kandungan|bahan|komposisi)/i],
  order: [/(beli|order|pesan|mau.*(?:beli|order|pesan)|cara.*(?:beli|order|pesan|checkout)|min.*order|minimal.*beli)/i],
  complaint: [/(komplain|rusak|cacat|pecah|salah|tidak sesuai|kecewa|masalah|error|retur|refund|kembalikan|ganti|tukar)/i],
  recommendation: [/(rekomendasi|saran|cocok|bingung|belum.*tahu|rekomend|saranku)/i],
  shipping: [/(kirim|ongkir|kurir|sampai.*hari|estimasi|jne|j&t|sicepat|cod|free.*ongkir|gratis.*ongkir|lokasi|alamat)/i],
  payment: [/(bayar|transfer|bank|bca|mandiri|gopay|ovo|dana|qris|rekening|pembayaran|konfirmasi.*bayar|bukti.*transfer)/i],
  promo: [/(promo|diskon|kupon|voucher|gratis|kode|sinherbal10|hemat)/i],
  general_question: [/(apa|bagaimana|kenapa|mengapa|kapan|siapa|di mana|berapa|bisakah|bolehkah|apakah)/i],
  off_topic: [/\b(politik|presiden|partai|agama|tuhan|allah|sex|seks|porno|narkoba|judi|togel|slot|sabu|shabu|ganja|kokain|heroin|pil|ekstasi|obat.*terlarang|narkotika)\b/i],
};

export function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();

  for (const re of INTENT_PATTERNS.off_topic) {
    if (re.test(lower)) return "off_topic";
  }

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (intent === "off_topic") continue;
    for (const re of patterns) {
      if (re.test(lower)) return intent as Intent;
    }
  }

  return "general_question";
}

export function intentPrompt(intent: Intent): string {
  const hints: Record<Intent, string> = {
    greeting: "User menyapa. Balas ramah dan tawarkan bantuan.",
    product_info: "User bertanya soal produk. Jawab spesifik sesuai katalog.",
    order: "User ingin order. Arahkan ke website untuk checkout atau tanya detail pesanan.",
    complaint: "User komplain. Minta maaf, catat masalahnya, arahkan ke WA admin.",
    recommendation: "User minta rekomendasi. Tanyakan preferensi lalu sarankan produk.",
    shipping: "User tanya pengiriman/ongkir. Jawab estimasi dan biaya kirim.",
    payment: "User tanya pembayaran. Sebutkan metode dan nomor rekening.",
    promo: "User tanya promo. Sebutkan promo aktif: gratis ongkir 100k, beli 5 gratis 1, diskon 10%.",
    general_question: "Jawab pertanyaan user berdasarkan informasi yang tersedia.",
    off_topic: "User bahas topik di luar scope. Tolak dengan sopan dan arahkan kembali ke topik Sin Herbal.",
  };
  return hints[intent];
}
