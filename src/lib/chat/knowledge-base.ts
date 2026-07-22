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
  { id: "k1", category: "produk", keywords: ["sin herbal", "tentang", "apa itu", "perusahaan"], question: "Apa itu Sin Herbal?", answer: "Sin Herbal adalah agen resmi produk Sin dari PT Tridaya Sinergi Indonesia (TSI). Kami menyediakan berbagai varian rokok herbal dan kopi. Info lengkap: https://www.tridayasinergi.com", priority: 1 },
  { id: "k2", category: "produk", keywords: ["platinum", "sin platinum"], question: "Apa itu Sin Platinum?", answer: "Sin Platinum TSI (Rp17.500) — Sigaret Kretek Tangan (SKT) pertama yang dipercayakan PR UD Putra Bintang Timur untuk dipasarkan TSI. Kretek khas Nusantara." },
  { id: "k3", category: "produk", keywords: ["kujang mas", "sin kujang mas"], question: "Apa itu Sin Kujang Mas?", answer: "Sin Kujang Mas TSI (Rp17.500) — SKT dengan aroma kretek khas Nusantara. Juga tersedia versi Filter (Rp24.500)." },
  { id: "k3b", category: "perbandingan", keywords: ["platinum kujang", "beda platinum kujang", "platinum sama kujang"], question: "Apa beda Sin Platinum dan Sin Kujang Mas?", answer: "Sin Platinum dan Sin Kujang Mas sama-sama SKT harga Rp17.500. Perbedaannya pada desain kemasan dan nama varian — Platinum menggunakan kemasan silver/putih, Kujang Mas menggunakan kemasan emas. Rasa dan kualitasnya setara, Kak." },
  { id: "k4", category: "produk", keywords: ["trust", "sin trust"], question: "Apa itu Sin Trust?", answer: "Sin Trust (Rp31.000) — SKM premium dari racikan KH R Abdul Malik. Juga ada versi Menthol (Rp27.000) dengan sensasi segar." },
  { id: "k5", category: "produk", keywords: ["provost", "sin provost"], question: "Apa itu Sin Provost 19?", answer: "Sin Provost 19 TSI (Rp24.500) — produk unggulan dari Sang Peracik KH R Abdul Malik. SKT premium." },
  { id: "k6", category: "produk", keywords: ["sapu jagat", "sin sapu jagat"], question: "Apa itu Sin Sapu Jagat?", answer: "Sin Sapu Jagat (Rp24.500) — SKT dengan harga terjangkau sesuai permintaan pasar TSI. Kualitas terbaik." },
  { id: "k7", category: "produk", keywords: ["krakatau", "sin krakatau"], question: "Apa itu Sin Krakatau?", answer: "Sin Krakatau (Rp57.500) — SKT premium diluncurkan 17 Agustus 2018 di Kota Serang. Kualitas terbaik dari semua produk SIN." },
  { id: "k8", category: "produk", keywords: ["precision", "sin precision"], question: "Apa itu Sin Precision?", answer: "Sin Precision (Rp25.500) — SKT premium menggunakan tembakau Srintil terbaik Indonesia. Juga ada versi White (Rp24.500)." },
  { id: "k9", category: "produk", keywords: ["encode", "sin encode", "sinergi encode"], question: "Apa itu Sin Sinergi Encode?", answer: "Sin Sinergi Encode (Rp30.000) — SKM dengan formula spesial ekstrak sari buah nanas yang membawa kesegaran unik." },
  { id: "k10", category: "produk", keywords: ["sinergi mind", "mind menthol"], question: "Apa itu Sin Sinergi Mind?", answer: "Sin Sinergi Mind (Rp26.000) — SKM Mild pertama untuk TSI. Tersedia juga versi Menthol (Rp15.000)." },
  { id: "k11", category: "produk", keywords: ["platinum filter"], question: "Apa itu Sin Platinum Filter?", answer: "Sin Platinum Filter (Rp30.500) — SKM reguler untuk yang terbiasa produk filter. Kemasan apik dan mudah dibawa." },
  { id: "k12", category: "produk", keywords: ["new normal", "sin new normal"], question: "Apa itu Sin New Normal?", answer: "Sin New Normal — lahir di tengah pandemi Covid-19. Tiga varian: ORG (Rp13.500, SKT), Mind (Rp23.000, SKM), Menthol (Rp27.500, SKM). Harga terjangkau." },
  { id: "k13", category: "produk", keywords: ["kopi mana kopi", "kmk"], question: "Apa itu Kopi Mana Kopi?", answer: "Kopi Mana Kopi (Rp57.600) — racikan kopi dengan jahe, madu, adas, kapulaga. Memenuhi kebutuhan kafein sekaligus menjaga daya tahan tubuh." },
  { id: "k13b", category: "produk", keywords: ["coklat", "rasa coklat", "chocolate"], question: "Sin Herbal ada rasa coklat?", answer: "Tidak ada produk Sin Herbal dengan rasa coklat Kak. Varian rokok: kretek herbal (SKT/SKM). Varian kopi: Original dan Mana Kopi (kopi + jahe + madu). Tidak ada rasa coklat." },
  { id: "k14", category: "produk", keywords: ["kopi original", "kopi sin"], question: "Apa itu Kopi Original?", answer: "Kopi Original (Rp40.000) — 100% biji kopi pilihan tanpa pemanis buatan, tambahan madu asli. Cita rasa kopi otentik." },

  // ===== PERBANDINGAN PRODUK =====
  { id: "k8b", category: "perbandingan", keywords: ["beda skt skm", "perbedaan skt", "mana lebih", "pilihan"], question: "Apa beda SKT dan SKM?", answer: "SKT (Sigaret Kretek Tangan) = handmade, tekstur kasar, rasa lebih kuat. SKM (Sigaret Kretek Mesin) = mesin, tekstur halus, lebih ringan. Harga SKT mulai Rp13.500, SKM mulai Rp15.000." },

  // ===== KANDUNGAN =====
  { id: "k9", category: "kandungan", keywords: ["bahan", "kandungan", "komposisi", "terbuat dari", "rempah"], question: "Apa saja kandungan produk Sin Herbal?", answer: "Semua produk terbuat dari tembakau pilihan dan rempah-rempah Nusantara. Produsen: PR UD Putra Bintang Timur, Malang. Detail: https://www.tridayasinergi.com" },
  { id: "k10", category: "kandungan", keywords: ["nikotin", "adiktif", "kecanduan"], question: "Apakah produk ini mengandung nikotin?", answer: "Iya, mengandung nikotin dari tembakau. Tetap tidak disarankan untuk ibu hamil & anak di bawah 21 tahun." },

  // ===== LEGALITAS =====
  { id: "k11", category: "legal", keywords: ["legal", "bea cukai", "terdaftar", "izin", "halal"], question: "Apakah produk Sin Herbal legal?", answer: "Legal dan terdaftar di Bea & Cukai. Bukan barang ilegal. Kami transparan soal kandungan & izin edar." },

  // ===== HARGA =====
  { id: "k12", category: "harga", keywords: ["harga", "berapa", "mahal", "murah", "biaya"], question: "Berapa harga produk Sin Herbal?", answer: "Harga terbaru 2025: Sin Platinum/Kujang Mas Rp17.500, New Normal ORG Rp13.500, Sapu Jagat/Provost Rp24.500, Precision White Rp24.500, Precision Rp25.500, Sinergi Mind Rp26.000, Trust Menthol Rp27.000, New Normal Menthol Rp27.500, Sinergi Encode Rp30.000, Platinum Filter Rp30.500, Trust Rp31.000, Krakatau Rp57.500. Cek katalog: https://rokoksin.vercel.app/harga" },

  // ===== PROMO =====
  { id: "k13", category: "promo", keywords: ["promo", "diskon", "kupon", "voucher", "gratis", "kode"], question: "Apa promo yang sedang aktif?", answer: "1. Gratis ongkir min. belanja 100k. 2. Bonus untuk pembelian grosir. Hubungi WhatsApp kami untuk info lebih lanjut." },

  // ===== STOK =====
  { id: "k14", category: "stok", keywords: ["stok", "tersedia", "ready", "kosong", "habis"], question: "Bagaimana cara cek stok produk?", answer: `Cek langsung di halaman produk: ${url("/products")}. Kalau habis, chat WA admin ya, kadang stok belum diupdate.` },

  // ===== CARA ORDER =====
  { id: "k15", category: "order", keywords: ["cara order", "beli", "pesan", "membeli", "transaksi"], question: "Bagaimana cara order?", answer: `Masuk ke ${url("")}, pilih produk, klik 'Miliki Sekarang' atau tambah ke keranjang. Lanjut checkout, isi data diri & alamat. Transfer ke rekening yang tertera, kirim bukti via WA ke 6285161835757.` },
  { id: "k16", category: "order", keywords: ["minimal order", "min beli", "minimum", "satuan", "beli satuan", "beli satu", "beli dikit"], question: "Ada minimal order?", answer: "Tidak ada minimal order Kak. Bisa beli 1 bungkus pun kami layani." },

  // ===== PEMBAYARAN =====
  { id: "k17", category: "pembayaran", keywords: ["bayar", "pembayaran", "transfer", "bank", "ewallet", "gopay", "ovo", "dana", "qris", "cod"], question: "Apa metode pembayarannya?", answer: `Transfer bank (${BANK_BCA}, ${BANK_MANDIRI}, BNI, BRI), e-wallet (GoPay, OVO, DANA, ShopeePay), QRIS semua bank. COD khusus Jabodetabek min. 50k.` },
  { id: "k17b", category: "pembayaran", keywords: ["dana", "transfer dana", "bayar dana", "via dana", "pakai dana"], question: "Bisa bayar pakai DANA?", answer: "Bisa Kak! Kami support DANA, GoPay, OVO, ShopeePay, dan QRIS semua bank. Tinggal pilih metode yang paling nyaman." },
  { id: "k18", category: "pembayaran", keywords: ["konfirmasi bayar", "bukti transfer", "kirim bukti"], question: "Bagaimana konfirmasi pembayaran?", answer: "Transfer ke rekening kami, lalu kirim bukti transfer via WhatsApp ke 6285161835757. Sertakan ID pesanan biar cepat diproses." },
  { id: "k19", category: "pembayaran", keywords: ["bca", "mandiri", "bni", "bri", "nomor rekening"], question: "Nomor rekening Sin Herbal?", answer: `${BANK_BCA}\n${BANK_MANDIRI}` },

  // ===== PENGIRIMAN =====
  { id: "k20", category: "pengiriman", keywords: ["ongkir", "ongkos kirim", "pengiriman", "kurir", "jne", "j&t", "sicepat", "anteraja", "pos"], question: "Bagaimana pengiriman & ongkir?", answer: "Kami kirim dari Depok via JNE, J&T, SiCepat, AnterAja, Pos Indonesia. Ongkir mulai 15k tergantung kota & berat. GRATIS ongkir min. 100k. Estimasi: Jabodetabek 1-2 hari, Jawa 2-4 hari, luar Jawa 3-8 hari." },
  { id: "k21", category: "pengiriman", keywords: ["lama", "sampai", "estimasi", "berapa hari"], question: "Berapa lama pengiriman?", answer: `Jabodetabek 1-2 hari, Jawa 2-4 hari, luar Jawa 3-8 hari. Kalau sudah dikirim, kamu bisa lacak di ${url("/lacak-pesanan")}` },
  { id: "k22", category: "pengiriman", keywords: ["gratis ongkir", "free ongkir", "gratis kirim"], question: "Syarat gratis ongkir?", answer: "Minimal belanja Rp 100.000, gratis ongkir ke seluruh Indonesia." },
  { id: "k23", category: "pengiriman", keywords: ["cod", "bayar di tempat"], question: "Apakah bisa COD?", answer: "Bisa Kak, khusus area Jabodetabek dengan minimal order Rp 50.000." },
  { id: "k24", category: "pengiriman", keywords: ["lokasi", "alamat", "dimana", "malang", "depok", "abadijaya", "sukmajaya"], question: "Dimana lokasi Sin Herbal?", answer: "Lokasi: Sukmajaya, Depok. Kami agen resmi produk Sin dari PT Tridaya Sinergi Indonesia." },

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
  { id: "k33", category: "kontak", keywords: ["wa", "whatsapp", "kontak", "hubungi", "telepon", "telp"], question: "Kontak Sin Herbal?", answer: "WhatsApp: 6285161835757\nEmail: rokoksinherbal99@gmail.com\nAlamat: Sukmajaya, Depok" },

  // ===== JAM OPERASIONAL =====
  { id: "k34", category: "operasional", keywords: ["jam", "operasional", "buka", "tutup", "senin", "minggu", "hari", "jam buka", "jam tutup"], question: "Jam operasional?", answer: "Senin-Sabtu 08.00-17.00, Minggu 09.00-14.00. Di luar jam itu, tetap bisa chat WA ya, besok dibales." },

  // ===== PERCAKAPAN UMUM =====
  { id: "k35", category: "sapa", keywords: ["halo", "hi", "hai", "helo", "pagi", "siang", "malam", "selamat"], question: "Sapaan", answer: "Halo Kak! 👋 Ada yang bisa Sin bantu hari ini? Mau tanya produk, order, atau sekadar ngobrol?" },
  { id: "k36", category: "sapa", keywords: ["makasih", "terima kasih", "thanks", "thank", "trims"], question: "Terima kasih", answer: "Sama-sama Kak! 🙏 Senang bisa bantu. Kalau ada pertanyaan lain, bilang aja ya." },
  { id: "k37", category: "sapa", keywords: ["dadah", "bye", "sampai jumpa", "dah"], question: "Sampai jumpa", answer: "Sampai jumpa Kak! 🌿 Jaga kesehatan dan nikmati herbal dengan bijak." },
  { id: "k38", category: "sapa", keywords: ["baik", "sehat", "kabar"], question: "Apa kabar?", answer: "Baik kak! Alhamdulillah. Sin siap bantu kapan pun. Ada yang ditanyakan? 😊" },

  // ===== REKOMENDASI =====
  { id: "k39", category: "rekomendasi", keywords: ["rekomendasi", "saran", "cocok", "recomend", "pemula"], question: "Produk yang cocok untuk pemula?", answer: "Mulai dari Sin New Normal ORG (Rp13.500, SKT) yang paling terjangkau, atau Sin Sinergi Mind Menthol (Rp15.000, SKM) yang ringan. Untuk kopi, Kopi Original (Rp40.000) paling pas." },
  { id: "k40", category: "rekomendasi", keywords: ["transisi", "berhenti", "stop merokok", "ganti"], question: "Mau transisi dari rokok konvensional?", answer: "Bisa coba Sin Sinergi Mind (Rp26.000) atau Sin Platinum Filter (Rp30.500). Keduanya SKM yang lebih ringan. Atau langsung SKT seperti Sin Sapu Jagat (Rp24.500)." },

  // ===== KIRIM KE LUAR NEGERI =====
  { id: "k41", category: "pengiriman", keywords: ["luar negeri", "luar negri", "internasional", "mancanegara"], question: "Kirim ke luar negeri?", answer: "Saat ini kami kirim ke seluruh Indonesia dulu ya Kak. Belum buka pengiriman internasional." },

  // ===== GROSIR =====
  { id: "k42", category: "grosir", keywords: ["grosir", "reseller", "dropship", "mitra", "agen", "distributor"], question: "Mau jadi reseller/grosir?", answer: "Wah, tertarik jadi mitra? Langsung chat admin WA ya 6285161835757. Admin akan jelaskan terms & pricing khusus mitra." },

  // ===== KEMASAN =====
  { id: "k43", category: "produk", keywords: ["kemasan", "packaging", "bungkus", "isi", "batang"], question: "Isi produk berapa?", answer: "Rokok 12 batang per bungkus. Kopi kemasan 200gr. Tersedia berbagai varian SKT dan SKM." },

  // ===== KADALUWARSA =====
  { id: "k44", category: "produk", keywords: ["kadaluwarsa", "expired", "kedaluwarsa", "tahan lama"], question: "Berapa lama masa simpan?", answer: "Produk rokok herbal tahan 12-18 bulan dari tanggal produksi. Simpan di tempat kering, hindari sinar matahari langsung." },

  // ===== ONLINE PAYMENT =====
  { id: "k45", category: "pembayaran", keywords: ["kartu kredit", "kartu debit", "cc", "visa", "mastercard"], question: "Bayar pakai kartu kredit?", answer: "Bisa Kak! Transfer bank atau QRIS. Kartu kredit belum tersedia langsung, tapi bisa via QRIS dari aplikasi bank." },

  // ===== TESTIMONI =====
  { id: "k46", category: "testimoni", keywords: ["testimoni", "review", "ulasan", "kata orang"], question: "Ada testimoni?", answer: `Banyak Kak! Cek di halaman depan ${url("")} — ada testimoni dari pembeli di Surabaya, Jakarta, Bandung, Malang, Semarang, Medan.` },

  // ===== FILOSOFI BRAND =====
  { id: "k47", category: "brand", keywords: ["filosofi", "makna", "hisapan tenang", "tagline", "tentang brand"], question: "Apa makna 'Hisapan yang Tenang'?", answer: "'Hisapan yang Tenang' adalah filosofi Sin Herbal — mengajak menikmati setiap hembusan dengan kesadaran penuh. Produk dari rempah-rempah Nusantara pilihan." },
  { id: "k48", category: "brand", keywords: ["sin", "arti sin", "nama sin", "tsi", "tridayasinergi", "tridaya", "arti nama", "artinya apa"], question: "Apa arti nama 'Sin'?", answer: "Sin adalah merk produk dari PT Tridaya Sinergi Indonesia (TSI), didirikan 2007 di Tasikmalaya. Produsen: PR UD Putra Bintang Timur, Malang. Info: https://www.tridayasinergi.com" },

  // ===== CARA PAKAI =====
  { id: "k49", category: "produk", keywords: ["cara pakai", "cara hisap", "cara nikmati", "gimana ngerokok"], question: "Bagaimana cara menikmati Rokok Sin Herbal?", answer: "Tinggal hisap seperti rokok biasa Kak. Bedanya, rasanya lebih ringan dan smooth. Nikmati pelan-pelan, biarkan rasa rempahnya terasa. Cocok ditemani teh hangat atau kopi." },

  // ===== EFEK SAMPING =====
  { id: "k51", category: "kesehatan", keywords: ["efek samping", "pusing", "mual", "batuk", "pusing habis"], question: "Ada efek samping?", answer: "Umumnya enggak ada efek samping berarti Kak. Tapi kalau baru pertama coba rokok herbal, mungkin tenggorokan agak berbeda karena rempahnya. Kalau merasa tidak cocok, stop dan konsultasi ke dokter ya." },
  { id: "k52", category: "kesehatan", keywords: ["alkohol", "campur", "bersama alkohol", "minum alkohol"], question: "Bisa dicampur alkohol?", answer: "Tidak disarankan Kak. Nikmati produk herbal dengan bijak — tidak perlu dicampur alkohol atau zat lain." },

  // ===== LANGGANAN / SUBSCRIPTION =====
  { id: "k53", category: "order", keywords: ["langganan", "subscription", "berlangganan", "rutin", "otomatis"], question: "Ada program langganan?", answer: "Belum ada sistem langganan otomatis Kak. Tapi kalau mau order rutin, chat WA admin ya — bisa diatur pengiriman periodik." },
];
