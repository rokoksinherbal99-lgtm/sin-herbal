export interface KnowledgeItem {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
  priority?: number;
}

const BASE_URL = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://rokoksin.vercel.app";

const BANK_BCA = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BANK_BCA ? process.env.NEXT_PUBLIC_BANK_BCA : "BCA: 1234567890 a.n. Sin Herbal";
const BANK_MANDIRI = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BANK_MANDIRI ? process.env.NEXT_PUBLIC_BANK_MANDIRI : "Mandiri: 9876543210 a.n. Sin Herbal";

function url(path: string) { return `${BASE_URL}${path}`; }

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // ===== PRODUK =====
  { id: "k1", category: "produk", keywords: ["sin herbal", "tentang", "apa itu", "perusahaan"], question: "Apa itu Sin Herbal?", answer: "Sin Herbal adalah brand rokok & teh herbal premium Nusantara. Kami meracik produk dari rempah-rempah Nusantara pilihan sejak 2020. Kantor: Pakisaji, Malang. Produksi: Abadijaya, Depok.", priority: 1 },
  { id: "k2", category: "produk", keywords: ["original", "rokok original", "varian original"], question: "Apa itu Rokok Sin Herbal Original?", answer: "Rokok Original (25k/bungkus, isi 12 batang) — rasa khas cengkeh & rempah, sedikit manis, smooth. Nikotin rendah, cocok untuk transisi ke herbal." },
  { id: "k3", category: "produk", keywords: ["menthol", "dingin", "segar"], question: "Apa itu Rokok Sin Herbal Menthol?", answer: "Rokok Menthol (27k/bungkus, isi 12 batang) — original + ekstrak mint alami. Sensasi segar & dingin di tenggorokan." },
  { id: "k4", category: "produk", keywords: ["light", "ringan"], question: "Apa itu Rokok Sin Herbal Light?", answer: "Rokok Light (23k/bungkus, isi 12 batang) — blend tembakau organik paling ringan. Nikotin sangat rendah, cocok untuk pemula." },
  { id: "k5", category: "produk", keywords: ["teh", "teh herbal"], question: "Apa itu Teh Herbal Sin?", answer: "Teh Herbal Sin (15k/kotak, isi 10 teabag) — campuran serai, jahe, daun sirih, madu alami. Hangat, sedikit pedas, menenangkan. Seduh 1 teabag + 200ml air panas 3-5 menit." },
  { id: "k6", category: "produk", keywords: ["minyak", "minyak herbal"], question: "Apa itu Minyak Herbal Sin?", answer: "Minyak Herbal Sin (35k) — minyak pijat & terapi dari ekstrak herbal pilihan. Memberikan rasa hangat dan nyaman." },
  { id: "k7", category: "produk", keywords: ["kapsul", "suplemen"], question: "Apa itu Kapsul Herbal Sin?", answer: "Kapsul Herbal Sin (45k) — ekstrak alami untuk menjaga daya tahan tubuh. Praktis dikonsumsi sehari-hari." },

  // ===== PERBANDINGAN PRODUK =====
  { id: "k8", category: "perbandingan", keywords: ["beda original menthol", "perbedaan original menthol", "mana lebih"], question: "Apa beda Original, Menthol, dan Light?", answer: "Original (25k) rasa cengkeh khas, Menthol (27k) ada sensasi dingin dari mint, Light (23k) paling ringan. Kalau baru coba herbal, mulai dari Light dulu aja Kak." },

  // ===== KANDUNGAN =====
  { id: "k9", category: "kandungan", keywords: ["bahan", "kandungan", "komposisi", "terbuat dari", "rempah"], question: "Apa saja kandungan produk Sin Herbal?", answer: `Daun mint, sirih, kemangi, cengkeh, jahe merah, tembakau organik. Tanpa nikotin sintetis, tanpa pengawet. Detail lengkap: ${url("/transparansi")}` },
  { id: "k10", category: "kandungan", keywords: ["nikotin", "adiktif", "kecanduan"], question: "Apakah produk ini mengandung nikotin?", answer: "Iya, ada nikotin dari tembakau organik — tapi kadarnya JAUH lebih rendah dari rokok konvensional. Tetap tidak disarankan untuk ibu hamil & anak di bawah 21 tahun." },

  // ===== LEGALITAS =====
  { id: "k11", category: "legal", keywords: ["legal", "bea cukai", "terdaftar", "izin", "halal"], question: "Apakah produk Sin Herbal legal?", answer: "Legal dan terdaftar di Bea & Cukai. Bukan barang ilegal. Kami transparan soal kandungan & izin edar." },

  // ===== HARGA =====
  { id: "k12", category: "harga", keywords: ["harga", "berapa", "mahal", "murah", "biaya"], question: "Berapa harga produk Sin Herbal?", answer: `Original 25k, Menthol 27k, Light 23k (isi 12 batang). Teh Herbal 15k (10 teabag). Minyak Herbal 35k. Kapsul Herbal 45k. Cek katalog: ${url("/harga")}` },

  // ===== PROMO =====
  { id: "k13", category: "promo", keywords: ["promo", "diskon", "kupon", "voucher", "gratis", "kode"], question: "Apa promo yang sedang aktif?", answer: "1. Gratis ongkir min. belanja 100k. 2. Beli 5 rokok gratis 1 teh herbal. 3. Diskon 10% pertama dengan kode: SINHERBAL10" },

  // ===== STOK =====
  { id: "k14", category: "stok", keywords: ["stok", "tersedia", "ready", "kosong", "habis"], question: "Bagaimana cara cek stok produk?", answer: `Cek langsung di halaman produk: ${url("/products")}. Kalau habis, chat WA admin ya, kadang stok belum diupdate.` },

  // ===== CARA ORDER =====
  { id: "k15", category: "order", keywords: ["cara order", "beli", "pesan", "membeli", "transaksi"], question: "Bagaimana cara order?", answer: `Masuk ke ${url("")}, pilih produk, klik 'Miliki Sekarang' atau tambah ke keranjang. Lanjut checkout, isi data diri & alamat. Transfer ke rekening yang tertera, kirim bukti via WA ke 6285161835757.` },
  { id: "k16", category: "order", keywords: ["minimal order", "min beli", "minimum"], question: "Ada minimal order?", answer: "Tidak ada minimal order Kak. Bisa beli 1 bungkus pun kami layani." },

  // ===== PEMBAYARAN =====
  { id: "k17", category: "pembayaran", keywords: ["bayar", "pembayaran", "transfer", "bank", "ewallet", "gopay", "ovo", "dana", "qris", "cod"], question: "Apa metode pembayarannya?", answer: `Transfer bank (${BANK_BCA}, ${BANK_MANDIRI}, BNI, BRI), e-wallet (GoPay, OVO, DANA, ShopeePay), QRIS semua bank. COD khusus Jabodetabek min. 50k.` },
  { id: "k18", category: "pembayaran", keywords: ["konfirmasi bayar", "bukti transfer", "kirim bukti"], question: "Bagaimana konfirmasi pembayaran?", answer: "Transfer ke rekening kami, lalu kirim bukti transfer via WhatsApp ke 6285161835757. Sertakan ID pesanan biar cepat diproses." },
  { id: "k19", category: "pembayaran", keywords: ["bca", "mandiri", "bni", "bri", "nomor rekening"], question: "Nomor rekening Sin Herbal?", answer: `${BANK_BCA}\n${BANK_MANDIRI}` },

  // ===== PENGIRIMAN =====
  { id: "k20", category: "pengiriman", keywords: ["ongkir", "ongkos kirim", "pengiriman", "kurir", "jne", "j&t", "sicepat", "anteraja", "pos"], question: "Bagaimana pengiriman & ongkir?", answer: "Kami kirim dari Depok via JNE, J&T, SiCepat, AnterAja, Pos Indonesia. Ongkir mulai 15k tergantung kota & berat. GRATIS ongkir min. 100k. Estimasi: Jabodetabek 1-2 hari, Jawa 2-4 hari, luar Jawa 3-8 hari." },
  { id: "k21", category: "pengiriman", keywords: ["lama", "sampai", "estimasi", "berapa hari"], question: "Berapa lama pengiriman?", answer: `Jabodetabek 1-2 hari, Jawa 2-4 hari, luar Jawa 3-8 hari. Kalau sudah dikirim, kamu bisa lacak di ${url("/lacak-pesanan")}` },
  { id: "k22", category: "pengiriman", keywords: ["gratis ongkir", "free ongkir", "gratis kirim"], question: "Syarat gratis ongkir?", answer: "Minimal belanja Rp 100.000, gratis ongkir ke seluruh Indonesia." },
  { id: "k23", category: "pengiriman", keywords: ["cod", "bayar di tempat"], question: "Apakah bisa COD?", answer: "Bisa Kak, khusus area Jabodetabek dengan minimal order Rp 50.000." },
  { id: "k24", category: "pengiriman", keywords: ["lokasi", "alamat", "dimana", "malang", "depok", "abadijaya"], question: "Dimana lokasi Sin Herbal?", answer: "Kantor: Pakisaji, Malang. Produksi: Abadijaya, Depok." },

  // ===== TRACKING =====
  { id: "k25", category: "tracking", keywords: ["lacak", "tracking", "status", "cek pesanan", "dimana pesanan"], question: "Bagaimana cara lacak pesanan?", answer: `Masuk ke ${url("/lacak-pesanan")}, masukkan ID pesanan yang dikirim setelah checkout. Bisa lihat status: Diterima → Diproses → Dikirim → Selesai.` },

  // ===== RETUR =====
  { id: "k26", category: "retur", keywords: ["retur", "refund", "kembali", "komplain", "rusak", "salah"], question: "Bagaimana jika ada masalah dengan pesanan?", answer: "Hubungi WA 6285161835757 dalam 1x24 jam setelah paket diterima. Kami ganti jika ada kerusakan atau kesalahan. Sertakan foto barang & packing." },

  // ===== USIA =====
  { id: "k27", category: "usia", keywords: ["umur", "usia", "minimal", "boleh", "21", "18", "anak"], question: "Minimal usia pembelian?", answer: "Produk ini untuk 21+ ya Kak. Tidak boleh untuk anak di bawah umur. Nikmati dengan bijak." },

  // ===== KESEHATAN =====
  { id: "k28", category: "kesehatan", keywords: ["sehat", "bahaya", "risiko", "kanker", "penyakit", "aman"], question: "Apakah produk ini aman?", answer: "Produk kami pakai bahan alami & nikotin rendah. TAPI tetap produk hisap — tidak 100% bebas risiko. Tidak disarankan ibu hamil/menyusui. Kalau punya kondisi medis, konsultasi ke dokter dulu ya." },
  { id: "k29", category: "kesehatan", keywords: ["sembuh", "obat", "menyembuhkan", "terapi"], question: "Apakah bisa menyembuhkan penyakit?", answer: "Tidak. Kami tidak bisa mengklaim produk menyembuhkan penyakit apapun — itu ilegal. Produk herbal kami adalah pendamping gaya hidup, bukan obat." },
  { id: "k30", category: "kesehatan", keywords: ["hamil", "ibu hamil", "menyusui", "bumil", "busui"], question: "Boleh untuk ibu hamil?", answer: "Tidak disarankan. Produk ini mengandung nikotin (meski rendah). Konsultasi ke dokter untuk kondisi spesifik." },

  // ===== CHATBOT =====
  { id: "k31", category: "chatbot", keywords: ["kamu siapa", "siapa kamu", "nama kamu", "kamu robot"], question: "Kamu siapa?", answer: "Halo Kak! 👋 Aku Sin, asisten virtual Sin Herbal. Aku di sini bantu jawab pertanyaan seputar produk, order, atau apa pun soal Sin Herbal. Ada yang bisa aku bantu?" },
  { id: "k32", category: "chatbot", keywords: ["orang", "manusia", "admin", "cs", "customer service"], question: "Bisa bicara dengan admin?", answer: "Tentu! Untuk order, komplain, atau pertanyaan kompleks, langsung chat admin kami di WhatsApp ya: https://wa.me/6285161835757. Admin lebih detail." },

  // ===== KONTAK =====
  { id: "k33", category: "kontak", keywords: ["wa", "whatsapp", "kontak", "hubungi", "telepon", "telp"], question: "Kontak Sin Herbal?", answer: "WhatsApp: 6285161835757\nEmail: info@sinherbal.com\nAlamat: Ruko Sentra Niaga Blok A1 No. 5, Pakisaji, Malang 65162" },

  // ===== JAM OPERASIONAL =====
  { id: "k34", category: "operasional", keywords: ["jam", "operasional", "buka", "tutup", "senin", "minggu"], question: "Jam operasional?", answer: "Senin-Sabtu 08.00-17.00, Minggu 09.00-14.00. Di luar jam itu, tetap bisa chat WA ya, besok dibales." },

  // ===== PERCAKAPAN UMUM =====
  { id: "k35", category: "sapa", keywords: ["halo", "hi", "hai", "helo", "pagi", "siang", "malam", "selamat"], question: "Sapaan", answer: "Halo Kak! 👋 Ada yang bisa Sin bantu hari ini? Mau tanya produk, order, atau sekadar ngobrol?" },
  { id: "k36", category: "sapa", keywords: ["makasih", "terima kasih", "thanks", "thank", "trims"], question: "Terima kasih", answer: "Sama-sama Kak! 🙏 Senang bisa bantu. Kalau ada pertanyaan lain, bilang aja ya." },
  { id: "k37", category: "sapa", keywords: ["dadah", "bye", "sampai jumpa", "dah"], question: "Sampai jumpa", answer: "Sampai jumpa Kak! 🌿 Jaga kesehatan dan nikmati herbal dengan bijak." },
  { id: "k38", category: "sapa", keywords: ["baik", "sehat", "kabar"], question: "Apa kabar?", answer: "Baik kak! Alhamdulillah. Sin siap bantu kapan pun. Ada yang ditanyakan? 😊" },

  // ===== REKOMENDASI =====
  { id: "k39", category: "rekomendasi", keywords: ["rekomendasi", "saran", "cocok", "recomend"], question: "Produk yang cocok untuk pemula?", answer: "Kalau baru mau coba rokok herbal, saran saya mulai dari Rokok Light (23k) — paling ringan. Atau kalau mau yang tanpa hisap, Teh Herbal (15k) bisa jadi pilihan." },
  { id: "k40", category: "rekomendasi", keywords: ["transisi", "berhenti", "stop merokok", "ganti"], question: "Mau transisi dari rokok konvensional?", answer: "Bisa coba Rokok Original atau Light. Kadar nikotinnya jauh lebih rendah, jadi cocok buat transisi bertahap. Kombinasikan dengan Teh Herbal untuk teman santai." },

  // ===== KIRIM KE LUAR NEGERI =====
  { id: "k41", category: "pengiriman", keywords: ["luar negeri", "luar negri", "internasional", "mancanegara"], question: "Kirim ke luar negeri?", answer: "Saat ini kami kirim ke seluruh Indonesia dulu ya Kak. Belum buka pengiriman internasional." },

  // ===== GROSIR =====
  { id: "k42", category: "grosir", keywords: ["grosir", "reseller", "dropship", "mitra", "agen", "distributor"], question: "Mau jadi reseller/grosir?", answer: "Wah, tertarik jadi mitra? Langsung chat admin WA ya 6285161835757. Admin akan jelaskan terms & pricing khusus mitra." },

  // ===== KEMASAN =====
  { id: "k43", category: "produk", keywords: ["kemasan", "packaging", "bungkus", "isi"], question: "Isi produk berapa?", answer: "Rokok 12 batang per bungkus. Teh Herbal 10 teabag per kotak. Minyak & Kapsul 1 botol." },

  // ===== KADALUWARSA =====
  { id: "k44", category: "produk", keywords: ["kadaluwarsa", "expired", "kedaluwarsa", "tahan lama"], question: "Berapa lama masa simpan?", answer: "Produk rokok & teh herbal tahan 12-18 bulan dari tanggal produksi. Simpan di tempat kering, hindari sinar matahari langsung." },

  // ===== ONLINE PAYMENT =====
  { id: "k45", category: "pembayaran", keywords: ["kartu kredit", "kartu debit", "cc", "visa", "mastercard"], question: "Bayar pakai kartu kredit?", answer: "Bisa Kak! Transfer bank atau QRIS. Kartu kredit belum tersedia langsung, tapi bisa via QRIS dari aplikasi bank." },

  // ===== TESTIMONI =====
  { id: "k46", category: "testimoni", keywords: ["testimoni", "review", "ulasan", "kata orang"], question: "Ada testimoni?", answer: `Banyak Kak! Cek di halaman depan ${url("")} — ada testimoni dari pembeli di Surabaya, Jakarta, Bandung, Malang, Semarang, Medan.` },

  // ===== FILOSOFI BRAND =====
  { id: "k47", category: "brand", keywords: ["filosofi", "makna", "hisapan tenang", "tagline", "tentang brand"], question: "Apa makna 'Hisapan yang Tenang'?", answer: "'Hisapan yang Tenang' adalah filosofi Sin Herbal — mengajak menikmati setiap hembusan dengan kesadaran penuh. Bukan sekadar produk, tapi gaya hidup yang lebih tenang dan selaras dengan alam." },
  { id: "k48", category: "brand", keywords: ["sin", "arti sin", "nama sin"], question: "Apa arti nama 'Sin Herbal'?", answer: "'Sin' berasal dari bahasa Sansekerta 'Siddhi' yang berarti kesempurnaan atau pencapaian — melambangkan harmoni sempurna antara tradisi herbal Nusantara dan gaya hidup modern." },

  // ===== CARA PAKAI =====
  { id: "k49", category: "produk", keywords: ["cara pakai", "cara hisap", "cara nikmati", "gimana ngerokok"], question: "Bagaimana cara menikmati Rokok Sin Herbal?", answer: "Tinggal hisap seperti rokok biasa Kak. Bedanya, rasanya lebih ringan dan smooth. Nikmati pelan-pelan, biarkan rasa rempahnya terasa. Cocok ditemani teh hangat atau kopi." },
  { id: "k50", category: "produk", keywords: ["cara seduh", "cara buat teh", "cara minum teh"], question: "Bagaimana cara seduh Teh Herbal Sin?", answer: "1 teabag + 200ml air panas, tunggu 3-5 menit. Boleh ditambah madu atau jeruk nipis kalau suka. Nikmati selagi hangat." },

  // ===== EFEK SAMPING =====
  { id: "k51", category: "kesehatan", keywords: ["efek samping", "pusing", "mual", "batuk", "pusing habis"], question: "Ada efek samping?", answer: "Umumnya enggak ada efek samping berarti Kak. Tapi kalau baru pertama coba rokok herbal, mungkin tenggorokan agak berbeda karena rempahnya. Kalau merasa tidak cocok, stop dan konsultasi ke dokter ya." },
  { id: "k52", category: "kesehatan", keywords: ["alkohol", "campur", "bersama alkohol", "minum alkohol"], question: "Bisa dicampur alkohol?", answer: "Tidak disarankan Kak. Nikmati produk herbal dengan bijak — tidak perlu dicampur alkohol atau zat lain." },

  // ===== LANGGANAN / SUBSCRIPTION =====
  { id: "k53", category: "order", keywords: ["langganan", "subscription", "berlangganan", "rutin", "otomatis"], question: "Ada program langganan?", answer: "Belum ada sistem langganan otomatis Kak. Tapi kalau mau order rutin, chat WA admin ya — bisa diatur pengiriman periodik." },
];
