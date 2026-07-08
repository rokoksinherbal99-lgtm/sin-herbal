export interface City {
  id: string;
  name: string;
}

export interface Province {
  id: string;
  name: string;
  cities: City[];
}

export const provinces: Province[] = [
  {
    id: "11", name: "Aceh", cities: [
      { id: "1101", name: "Kab. Aceh Selatan" }, { id: "1102", name: "Kab. Aceh Tenggara" },
      { id: "1103", name: "Kab. Aceh Timur" }, { id: "1104", name: "Kab. Aceh Tengah" },
      { id: "1105", name: "Kab. Aceh Barat" }, { id: "1106", name: "Kab. Aceh Besar" },
      { id: "1107", name: "Kab. Pidie" }, { id: "1108", name: "Kab. Aceh Utara" },
      { id: "1109", name: "Kab. Simeulue" }, { id: "1110", name: "Kab. Aceh Singkil" },
      { id: "1111", name: "Kab. Bireuen" }, { id: "1112", name: "Kab. Aceh Barat Daya" },
      { id: "1113", name: "Kab. Gayo Lues" }, { id: "1114", name: "Kab. Aceh Jaya" },
      { id: "1115", name: "Kab. Nagan Raya" }, { id: "1116", name: "Kab. Aceh Tamiang" },
      { id: "1117", name: "Kab. Bener Meriah" }, { id: "1118", name: "Kab. Pidie Jaya" },
      { id: "1171", name: "Kota Banda Aceh" }, { id: "1172", name: "Kota Sabang" },
      { id: "1173", name: "Kota Lhokseumawe" }, { id: "1174", name: "Kota Langsa" },
      { id: "1175", name: "Kota Subulussalam" },
    ]
  },
  {
    id: "12", name: "Sumatera Utara", cities: [
      { id: "1201", name: "Kab. Tapanuli Tengah" }, { id: "1202", name: "Kab. Tapanuli Utara" },
      { id: "1203", name: "Kab. Tapanuli Selatan" }, { id: "1204", name: "Kab. Nias" },
      { id: "1205", name: "Kab. Langkat" }, { id: "1206", name: "Kab. Karo" },
      { id: "1207", name: "Kab. Deli Serdang" }, { id: "1208", name: "Kab. Simalungun" },
      { id: "1209", name: "Kab. Asahan" }, { id: "1210", name: "Kab. Labuhanbatu" },
      { id: "1211", name: "Kab. Dairi" }, { id: "1212", name: "Kab. Toba" },
      { id: "1213", name: "Kab. Mandailing Natal" }, { id: "1214", name: "Kab. Nias Selatan" },
      { id: "1215", name: "Kab. Pakpak Bharat" }, { id: "1216", name: "Kab. Humbang Hasundutan" },
      { id: "1217", name: "Kab. Samosir" }, { id: "1218", name: "Kab. Serdang Bedagai" },
      { id: "1219", name: "Kab. Batu Bara" }, { id: "1220", name: "Kab. Padang Lawas Utara" },
      { id: "1221", name: "Kab. Padang Lawas" }, { id: "1222", name: "Kab. Labuhanbatu Selatan" },
      { id: "1223", name: "Kab. Labuhanbatu Utara" }, { id: "1224", name: "Kab. Nias Utara" },
      { id: "1225", name: "Kab. Nias Barat" }, { id: "1271", name: "Kota Medan" },
      { id: "1272", name: "Kota Pematangsiantar" }, { id: "1273", name: "Kota Sibolga" },
      { id: "1274", name: "Kota Tanjung Balai" }, { id: "1275", name: "Kota Binjai" },
      { id: "1276", name: "Kota Tebing Tinggi" }, { id: "1277", name: "Kota Padang Sidempuan" },
      { id: "1278", name: "Kota Gunungsitoli" },
    ]
  },
  {
    id: "13", name: "Sumatera Barat", cities: [
      { id: "1301", name: "Kab. Pesisir Selatan" }, { id: "1302", name: "Kab. Solok" },
      { id: "1303", name: "Kab. Sijunjung" }, { id: "1304", name: "Kab. Tanah Datar" },
      { id: "1305", name: "Kab. Padang Pariaman" }, { id: "1306", name: "Kab. Agam" },
      { id: "1307", name: "Kab. Lima Puluh Kota" }, { id: "1308", name: "Kab. Pasaman" },
      { id: "1309", name: "Kab. Kepulauan Mentawai" }, { id: "1310", name: "Kab. Dharmasraya" },
      { id: "1311", name: "Kab. Solok Selatan" }, { id: "1312", name: "Kab. Pasaman Barat" },
      { id: "1371", name: "Kota Padang" }, { id: "1372", name: "Kota Solok" },
      { id: "1373", name: "Kota Sawahlunto" }, { id: "1374", name: "Kota Padang Panjang" },
      { id: "1375", name: "Kota Bukittinggi" }, { id: "1376", name: "Kota Payakumbuh" },
      { id: "1377", name: "Kota Pariaman" },
    ]
  },
  {
    id: "14", name: "Riau", cities: [
      { id: "1401", name: "Kab. Kampar" }, { id: "1402", name: "Kab. Indragiri Hulu" },
      { id: "1403", name: "Kab. Bengkalis" }, { id: "1404", name: "Kab. Indragiri Hilir" },
      { id: "1405", name: "Kab. Pelalawan" }, { id: "1406", name: "Kab. Rokan Hulu" },
      { id: "1407", name: "Kab. Rokan Hilir" }, { id: "1408", name: "Kab. Siak" },
      { id: "1409", name: "Kab. Kuantan Singingi" }, { id: "1410", name: "Kab. Kepulauan Meranti" },
      { id: "1471", name: "Kota Pekanbaru" }, { id: "1472", name: "Kota Dumai" },
    ]
  },
  {
    id: "15", name: "Jambi", cities: [
      { id: "1501", name: "Kab. Kerinci" }, { id: "1502", name: "Kab. Merangin" },
      { id: "1503", name: "Kab. Sarolangun" }, { id: "1504", name: "Kab. Batanghari" },
      { id: "1505", name: "Kab. Muaro Jambi" }, { id: "1506", name: "Kab. Tanjung Jabung Timur" },
      { id: "1507", name: "Kab. Tanjung Jabung Barat" }, { id: "1508", name: "Kab. Tebo" },
      { id: "1509", name: "Kab. Bungo" }, { id: "1571", name: "Kota Jambi" },
      { id: "1572", name: "Kota Sungai Penuh" },
    ]
  },
  {
    id: "16", name: "Sumatera Selatan", cities: [
      { id: "1601", name: "Kab. Ogan Komering Ulu" }, { id: "1602", name: "Kab. Ogan Komering Ilir" },
      { id: "1603", name: "Kab. Muara Enim" }, { id: "1604", name: "Kab. Lahat" },
      { id: "1605", name: "Kab. Musi Rawas" }, { id: "1606", name: "Kab. Musi Banyuasin" },
      { id: "1607", name: "Kab. Banyuasin" }, { id: "1608", name: "Kab. Ogan Komering Ulu Timur" },
      { id: "1609", name: "Kab. Ogan Komering Ulu Selatan" }, { id: "1610", name: "Kab. Ogan Ilir" },
      { id: "1611", name: "Kab. Empat Lawang" }, { id: "1612", name: "Kab. Penukal Abab Lematang" },
      { id: "1613", name: "Kab. Musi Rawas Utara" }, { id: "1671", name: "Kota Palembang" },
      { id: "1672", name: "Kota Pagar Alam" }, { id: "1673", name: "Kota Lubuklinggau" },
      { id: "1674", name: "Kota Prabumulih" },
    ]
  },
  {
    id: "17", name: "Bengkulu", cities: [
      { id: "1701", name: "Kab. Bengkulu Selatan" }, { id: "1702", name: "Kab. Rejang Lebong" },
      { id: "1703", name: "Kab. Bengkulu Utara" }, { id: "1704", name: "Kab. Kaur" },
      { id: "1705", name: "Kab. Seluma" }, { id: "1706", name: "Kab. Mukomuko" },
      { id: "1707", name: "Kab. Lebong" }, { id: "1708", name: "Kab. Kepahiang" },
      { id: "1709", name: "Kab. Bengkulu Tengah" }, { id: "1771", name: "Kota Bengkulu" },
    ]
  },
  {
    id: "18", name: "Lampung", cities: [
      { id: "1801", name: "Kab. Lampung Selatan" }, { id: "1802", name: "Kab. Lampung Tengah" },
      { id: "1803", name: "Kab. Lampung Utara" }, { id: "1804", name: "Kab. Lampung Barat" },
      { id: "1805", name: "Kab. Tulang Bawang" }, { id: "1806", name: "Kab. Tanggamus" },
      { id: "1807", name: "Kab. Lampung Timur" }, { id: "1808", name: "Kab. Way Kanan" },
      { id: "1809", name: "Kab. Pesawaran" }, { id: "1810", name: "Kab. Pringsewu" },
      { id: "1811", name: "Kab. Mesuji" }, { id: "1812", name: "Kab. Tulang Bawang Barat" },
      { id: "1813", name: "Kab. Pesisir Barat" }, { id: "1871", name: "Kota Bandar Lampung" },
      { id: "1872", name: "Kota Metro" },
    ]
  },
  {
    id: "19", name: "Kepulauan Bangka Belitung", cities: [
      { id: "1901", name: "Kab. Bangka" }, { id: "1902", name: "Kab. Belitung" },
      { id: "1903", name: "Kab. Bangka Selatan" }, { id: "1904", name: "Kab. Bangka Tengah" },
      { id: "1905", name: "Kab. Bangka Barat" }, { id: "1906", name: "Kab. Belitung Timur" },
      { id: "1971", name: "Kota Pangkal Pinang" },
    ]
  },
  {
    id: "21", name: "Kepulauan Riau", cities: [
      { id: "2101", name: "Kab. Bintan" }, { id: "2102", name: "Kab. Karimun" },
      { id: "2103", name: "Kab. Natuna" }, { id: "2104", name: "Kab. Lingga" },
      { id: "2105", name: "Kab. Kepulauan Anambas" }, { id: "2171", name: "Kota Batam" },
      { id: "2172", name: "Kota Tanjung Pinang" },
    ]
  },
  {
    id: "31", name: "DKI Jakarta", cities: [
      { id: "3101", name: "Kab. Kepulauan Seribu" },
      { id: "3171", name: "Kota Jakarta Pusat" }, { id: "3172", name: "Kota Jakarta Utara" },
      { id: "3173", name: "Kota Jakarta Barat" }, { id: "3174", name: "Kota Jakarta Selatan" },
      { id: "3175", name: "Kota Jakarta Timur" },
    ]
  },
  {
    id: "32", name: "Jawa Barat", cities: [
      { id: "3201", name: "Kab. Bogor" }, { id: "3202", name: "Kab. Sukabumi" },
      { id: "3203", name: "Kab. Cianjur" }, { id: "3204", name: "Kab. Bandung" },
      { id: "3205", name: "Kab. Garut" }, { id: "3206", name: "Kab. Tasikmalaya" },
      { id: "3207", name: "Kab. Ciamis" }, { id: "3208", name: "Kab. Kuningan" },
      { id: "3209", name: "Kab. Cirebon" }, { id: "3210", name: "Kab. Majalengka" },
      { id: "3211", name: "Kab. Sumedang" }, { id: "3212", name: "Kab. Indramayu" },
      { id: "3213", name: "Kab. Subang" }, { id: "3214", name: "Kab. Purwakarta" },
      { id: "3215", name: "Kab. Karawang" }, { id: "3216", name: "Kab. Bekasi" },
      { id: "3217", name: "Kab. Bandung Barat" }, { id: "3218", name: "Kab. Pangandaran" },
      { id: "3271", name: "Kota Bogor" }, { id: "3272", name: "Kota Sukabumi" },
      { id: "3273", name: "Kota Bandung" }, { id: "3274", name: "Kota Cirebon" },
      { id: "3275", name: "Kota Bekasi" }, { id: "3276", name: "Kota Depok" },
      { id: "3277", name: "Kota Cimahi" }, { id: "3278", name: "Kota Tasikmalaya" },
      { id: "3279", name: "Kota Banjar" },
    ]
  },
  {
    id: "33", name: "Jawa Tengah", cities: [
      { id: "3301", name: "Kab. Cilacap" }, { id: "3302", name: "Kab. Banyumas" },
      { id: "3303", name: "Kab. Purbalingga" }, { id: "3304", name: "Kab. Banjarnegara" },
      { id: "3305", name: "Kab. Kebumen" }, { id: "3306", name: "Kab. Purworejo" },
      { id: "3307", name: "Kab. Wonosobo" }, { id: "3308", name: "Kab. Magelang" },
      { id: "3309", name: "Kab. Boyolali" }, { id: "3310", name: "Kab. Klaten" },
      { id: "3311", name: "Kab. Sukoharjo" }, { id: "3312", name: "Kab. Wonogiri" },
      { id: "3313", name: "Kab. Karanganyar" }, { id: "3314", name: "Kab. Sragen" },
      { id: "3315", name: "Kab. Grobogan" }, { id: "3316", name: "Kab. Blora" },
      { id: "3317", name: "Kab. Rembang" }, { id: "3318", name: "Kab. Pati" },
      { id: "3319", name: "Kab. Kudus" }, { id: "3320", name: "Kab. Jepara" },
      { id: "3321", name: "Kab. Demak" }, { id: "3322", name: "Kab. Semarang" },
      { id: "3323", name: "Kab. Temanggung" }, { id: "3324", name: "Kab. Kendal" },
      { id: "3325", name: "Kab. Batang" }, { id: "3326", name: "Kab. Pekalongan" },
      { id: "3327", name: "Kab. Pemalang" }, { id: "3328", name: "Kab. Tegal" },
      { id: "3329", name: "Kab. Brebes" }, { id: "3371", name: "Kota Magelang" },
      { id: "3372", name: "Kota Surakarta" }, { id: "3373", name: "Kota Salatiga" },
      { id: "3374", name: "Kota Semarang" }, { id: "3375", name: "Kota Pekalongan" },
      { id: "3376", name: "Kota Tegal" },
    ]
  },
  {
    id: "34", name: "DI Yogyakarta", cities: [
      { id: "3401", name: "Kab. Kulon Progo" }, { id: "3402", name: "Kab. Bantul" },
      { id: "3403", name: "Kab. Gunung Kidul" }, { id: "3404", name: "Kab. Sleman" },
      { id: "3471", name: "Kota Yogyakarta" },
    ]
  },
  {
    id: "35", name: "Jawa Timur", cities: [
      { id: "3501", name: "Kab. Pacitan" }, { id: "3502", name: "Kab. Ponorogo" },
      { id: "3503", name: "Kab. Trenggalek" }, { id: "3504", name: "Kab. Tulungagung" },
      { id: "3505", name: "Kab. Blitar" }, { id: "3506", name: "Kab. Kediri" },
      { id: "3507", name: "Kab. Malang" }, { id: "3508", name: "Kab. Lumajang" },
      { id: "3509", name: "Kab. Jember" }, { id: "3510", name: "Kab. Banyuwangi" },
      { id: "3511", name: "Kab. Bondowoso" }, { id: "3512", name: "Kab. Situbondo" },
      { id: "3513", name: "Kab. Probolinggo" }, { id: "3514", name: "Kab. Pasuruan" },
      { id: "3515", name: "Kab. Sidoarjo" }, { id: "3516", name: "Kab. Mojokerto" },
      { id: "3517", name: "Kab. Jombang" }, { id: "3518", name: "Kab. Nganjuk" },
      { id: "3519", name: "Kab. Madiun" }, { id: "3520", name: "Kab. Magetan" },
      { id: "3521", name: "Kab. Ngawi" }, { id: "3522", name: "Kab. Bojonegoro" },
      { id: "3523", name: "Kab. Tuban" }, { id: "3524", name: "Kab. Lamongan" },
      { id: "3525", name: "Kab. Gresik" }, { id: "3526", name: "Kab. Bangkalan" },
      { id: "3527", name: "Kab. Sampang" }, { id: "3528", name: "Kab. Pamekasan" },
      { id: "3529", name: "Kab. Sumenep" }, { id: "3571", name: "Kota Kediri" },
      { id: "3572", name: "Kota Blitar" }, { id: "3573", name: "Kota Malang" },
      { id: "3574", name: "Kota Probolinggo" }, { id: "3575", name: "Kota Pasuruan" },
      { id: "3576", name: "Kota Mojokerto" }, { id: "3577", name: "Kota Madiun" },
      { id: "3578", name: "Kota Surabaya" }, { id: "3579", name: "Kota Batu" },
    ]
  },
  {
    id: "36", name: "Banten", cities: [
      { id: "3601", name: "Kab. Pandeglang" }, { id: "3602", name: "Kab. Lebak" },
      { id: "3603", name: "Kab. Tangerang" }, { id: "3604", name: "Kab. Serang" },
      { id: "3671", name: "Kota Tangerang" }, { id: "3672", name: "Kota Cilegon" },
      { id: "3673", name: "Kota Serang" }, { id: "3674", name: "Kota Tangerang Selatan" },
    ]
  },
  {
    id: "51", name: "Bali", cities: [
      { id: "5101", name: "Kab. Jembrana" }, { id: "5102", name: "Kab. Tabanan" },
      { id: "5103", name: "Kab. Badung" }, { id: "5104", name: "Kab. Gianyar" },
      { id: "5105", name: "Kab. Klungkung" }, { id: "5106", name: "Kab. Bangli" },
      { id: "5107", name: "Kab. Karangasem" }, { id: "5108", name: "Kab. Buleleng" },
      { id: "5171", name: "Kota Denpasar" },
    ]
  },
  {
    id: "52", name: "Nusa Tenggara Barat", cities: [
      { id: "5201", name: "Kab. Lombok Barat" }, { id: "5202", name: "Kab. Lombok Tengah" },
      { id: "5203", name: "Kab. Lombok Timur" }, { id: "5204", name: "Kab. Sumbawa" },
      { id: "5205", name: "Kab. Dompu" }, { id: "5206", name: "Kab. Bima" },
      { id: "5207", name: "Kab. Sumbawa Barat" }, { id: "5208", name: "Kab. Lombok Utara" },
      { id: "5271", name: "Kota Mataram" }, { id: "5272", name: "Kota Bima" },
    ]
  },
  {
    id: "53", name: "Nusa Tenggara Timur", cities: [
      { id: "5301", name: "Kab. Sumba Barat" }, { id: "5302", name: "Kab. Sumba Timur" },
      { id: "5303", name: "Kab. Kupang" }, { id: "5304", name: "Kab. Timor Tengah Selatan" },
      { id: "5305", name: "Kab. Timor Tengah Utara" }, { id: "5306", name: "Kab. Belu" },
      { id: "5307", name: "Kab. Alor" }, { id: "5308", name: "Kab. Flores Timur" },
      { id: "5309", name: "Kab. Sikka" }, { id: "5310", name: "Kab. Ende" },
      { id: "5311", name: "Kab. Ngada" }, { id: "5312", name: "Kab. Manggarai" },
      { id: "5313", name: "Kab. Rote Ndao" }, { id: "5314", name: "Kab. Manggarai Barat" },
      { id: "5315", name: "Kab. Sumba Tengah" }, { id: "5316", name: "Kab. Sumba Barat Daya" },
      { id: "5317", name: "Kab. Manggarai Timur" }, { id: "5318", name: "Kab. Sabu Raijua" },
      { id: "5319", name: "Kab. Malaka" }, { id: "5371", name: "Kota Kupang" },
    ]
  },
  {
    id: "61", name: "Kalimantan Barat", cities: [
      { id: "6101", name: "Kab. Sambas" }, { id: "6102", name: "Kab. Mempawah" },
      { id: "6103", name: "Kab. Sanggau" }, { id: "6104", name: "Kab. Ketapang" },
      { id: "6105", name: "Kab. Sintang" }, { id: "6106", name: "Kab. Kapuas Hulu" },
      { id: "6107", name: "Kab. Bengkayang" }, { id: "6108", name: "Kab. Landak" },
      { id: "6109", name: "Kab. Sekadau" }, { id: "6110", name: "Kab. Melawi" },
      { id: "6111", name: "Kab. Kayong Utara" }, { id: "6112", name: "Kab. Kubu Raya" },
      { id: "6171", name: "Kota Pontianak" }, { id: "6172", name: "Kota Singkawang" },
    ]
  },
  {
    id: "62", name: "Kalimantan Tengah", cities: [
      { id: "6201", name: "Kab. Kotawaringin Barat" }, { id: "6202", name: "Kab. Kotawaringin Timur" },
      { id: "6203", name: "Kab. Kapuas" }, { id: "6204", name: "Kab. Barito Selatan" },
      { id: "6205", name: "Kab. Barito Utara" }, { id: "6206", name: "Kab. Katingan" },
      { id: "6207", name: "Kab. Seruyan" }, { id: "6208", name: "Kab. Sukamara" },
      { id: "6209", name: "Kab. Lamandau" }, { id: "6210", name: "Kab. Gunung Mas" },
      { id: "6211", name: "Kab. Pulang Pisau" }, { id: "6212", name: "Kab. Murung Raya" },
      { id: "6213", name: "Kab. Barito Timur" }, { id: "6271", name: "Kota Palangka Raya" },
    ]
  },
  {
    id: "63", name: "Kalimantan Selatan", cities: [
      { id: "6301", name: "Kab. Tanah Laut" }, { id: "6302", name: "Kab. Kotabaru" },
      { id: "6303", name: "Kab. Banjar" }, { id: "6304", name: "Kab. Barito Kuala" },
      { id: "6305", name: "Kab. Tapin" }, { id: "6306", name: "Kab. Hulu Sungai Selatan" },
      { id: "6307", name: "Kab. Hulu Sungai Tengah" }, { id: "6308", name: "Kab. Hulu Sungai Utara" },
      { id: "6309", name: "Kab. Tabalong" }, { id: "6310", name: "Kab. Tanah Bumbu" },
      { id: "6311", name: "Kab. Balangan" }, { id: "6371", name: "Kota Banjarmasin" },
      { id: "6372", name: "Kota Banjarbaru" },
    ]
  },
  {
    id: "64", name: "Kalimantan Timur", cities: [
      { id: "6401", name: "Kab. Paser" }, { id: "6402", name: "Kab. Kutai Barat" },
      { id: "6403", name: "Kab. Kutai Kartanegara" }, { id: "6404", name: "Kab. Kutai Timur" },
      { id: "6405", name: "Kab. Berau" }, { id: "6406", name: "Kab. Penajam Paser Utara" },
      { id: "6407", name: "Kab. Mahakam Ulu" }, { id: "6471", name: "Kota Balikpapan" },
      { id: "6472", name: "Kota Samarinda" }, { id: "6473", name: "Kota Bontang" },
    ]
  },
  {
    id: "65", name: "Kalimantan Utara", cities: [
      { id: "6501", name: "Kab. Malinau" }, { id: "6502", name: "Kab. Bulungan" },
      { id: "6503", name: "Kab. Tana Tidung" }, { id: "6504", name: "Kab. Nunukan" },
      { id: "6571", name: "Kota Tarakan" },
    ]
  },
  {
    id: "71", name: "Sulawesi Utara", cities: [
      { id: "7101", name: "Kab. Bolaang Mongondow" }, { id: "7102", name: "Kab. Minahasa" },
      { id: "7103", name: "Kab. Kepulauan Sangihe" }, { id: "7104", name: "Kab. Kepulauan Talaud" },
      { id: "7105", name: "Kab. Minahasa Selatan" }, { id: "7106", name: "Kab. Minahasa Utara" },
      { id: "7107", name: "Kab. Minahasa Tenggara" }, { id: "7108", name: "Kab. Bolaang Mongondow Utara" },
      { id: "7109", name: "Kab. Kepulauan Siau Tagulandang Biaro" }, { id: "7110", name: "Kab. Bolaang Mongondow Selatan" },
      { id: "7111", name: "Kab. Bolaang Mongondow Timur" }, { id: "7171", name: "Kota Manado" },
      { id: "7172", name: "Kota Bitung" }, { id: "7173", name: "Kota Tomohon" },
      { id: "7174", name: "Kota Kotamobagu" },
    ]
  },
  {
    id: "72", name: "Sulawesi Tengah", cities: [
      { id: "7201", name: "Kab. Banggai" }, { id: "7202", name: "Kab. Poso" },
      { id: "7203", name: "Kab. Donggala" }, { id: "7204", name: "Kab. Toli-Toli" },
      { id: "7205", name: "Kab. Buol" }, { id: "7206", name: "Kab. Morowali" },
      { id: "7207", name: "Kab. Banggai Kepulauan" }, { id: "7208", name: "Kab. Parigi Moutong" },
      { id: "7209", name: "Kab. Tojo Una-Una" }, { id: "7210", name: "Kab. Sigi" },
      { id: "7211", name: "Kab. Banggai Laut" }, { id: "7212", name: "Kab. Morowali Utara" },
      { id: "7271", name: "Kota Palu" },
    ]
  },
  {
    id: "73", name: "Sulawesi Selatan", cities: [
      { id: "7301", name: "Kab. Kepulauan Selayar" }, { id: "7302", name: "Kab. Bulukumba" },
      { id: "7303", name: "Kab. Bantaeng" }, { id: "7304", name: "Kab. Jeneponto" },
      { id: "7305", name: "Kab. Takalar" }, { id: "7306", name: "Kab. Gowa" },
      { id: "7307", name: "Kab. Sinjai" }, { id: "7308", name: "Kab. Bone" },
      { id: "7309", name: "Kab. Maros" }, { id: "7310", name: "Kab. Pangkajene Kepulauan" },
      { id: "7311", name: "Kab. Barru" }, { id: "7312", name: "Kab. Soppeng" },
      { id: "7313", name: "Kab. Wajo" }, { id: "7314", name: "Kab. Sidrap" },
      { id: "7315", name: "Kab. Pinrang" }, { id: "7316", name: "Kab. Enrekang" },
      { id: "7317", name: "Kab. Luwu" }, { id: "7318", name: "Kab. Tana Toraja" },
      { id: "7319", name: "Kab. Luwu Utara" }, { id: "7320", name: "Kab. Luwu Timur" },
      { id: "7321", name: "Kab. Toraja Utara" }, { id: "7371", name: "Kota Makassar" },
      { id: "7372", name: "Kota Parepare" }, { id: "7373", name: "Kota Palopo" },
    ]
  },
  {
    id: "74", name: "Sulawesi Tenggara", cities: [
      { id: "7401", name: "Kab. Buton" }, { id: "7402", name: "Kab. Muna" },
      { id: "7403", name: "Kab. Konawe" }, { id: "7404", name: "Kab. Kolaka" },
      { id: "7405", name: "Kab. Konawe Selatan" }, { id: "7406", name: "Kab. Bombana" },
      { id: "7407", name: "Kab. Wakatobi" }, { id: "7408", name: "Kab. Kolaka Utara" },
      { id: "7409", name: "Kab. Konawe Utara" }, { id: "7410", name: "Kab. Buton Utara" },
      { id: "7411", name: "Kab. Kolaka Timur" }, { id: "7412", name: "Kab. Konawe Kepulauan" },
      { id: "7413", name: "Kab. Muna Barat" }, { id: "7414", name: "Kab. Buton Tengah" },
      { id: "7415", name: "Kab. Buton Selatan" }, { id: "7471", name: "Kota Kendari" },
      { id: "7472", name: "Kota Baubau" },
    ]
  },
  {
    id: "75", name: "Gorontalo", cities: [
      { id: "7501", name: "Kab. Gorontalo" }, { id: "7502", name: "Kab. Boalemo" },
      { id: "7503", name: "Kab. Bone Bolango" }, { id: "7504", name: "Kab. Pahuwato" },
      { id: "7505", name: "Kab. Gorontalo Utara" }, { id: "7571", name: "Kota Gorontalo" },
    ]
  },
  {
    id: "76", name: "Sulawesi Barat", cities: [
      { id: "7601", name: "Kab. Majene" }, { id: "7602", name: "Kab. Polewali Mandar" },
      { id: "7603", name: "Kab. Mamasa" }, { id: "7604", name: "Kab. Mamuju" },
      { id: "7605", name: "Kab. Pasangkayu" }, { id: "7606", name: "Kab. Mamuju Tengah" },
    ]
  },
  {
    id: "81", name: "Maluku", cities: [
      { id: "8101", name: "Kab. Maluku Tengah" }, { id: "8102", name: "Kab. Maluku Tenggara" },
      { id: "8103", name: "Kab. Maluku Tenggara Barat" }, { id: "8104", name: "Kab. Buru" },
      { id: "8105", name: "Kab. Seram Bagian Timur" }, { id: "8106", name: "Kab. Seram Bagian Barat" },
      { id: "8107", name: "Kab. Kepulauan Aru" }, { id: "8108", name: "Kab. Maluku Barat Daya" },
      { id: "8109", name: "Kab. Buru Selatan" }, { id: "8171", name: "Kota Ambon" },
      { id: "8172", name: "Kota Tual" },
    ]
  },
  {
    id: "82", name: "Maluku Utara", cities: [
      { id: "8201", name: "Kab. Halmahera Barat" }, { id: "8202", name: "Kab. Halmahera Tengah" },
      { id: "8203", name: "Kab. Halmahera Utara" }, { id: "8204", name: "Kab. Halmahera Selatan" },
      { id: "8205", name: "Kab. Kepulauan Sula" }, { id: "8206", name: "Kab. Halmahera Timur" },
      { id: "8207", name: "Kab. Pulau Morotai" }, { id: "8208", name: "Kab. Pulau Taliabu" },
      { id: "8271", name: "Kota Ternate" }, { id: "8272", name: "Kota Tidore Kepulauan" },
    ]
  },
  {
    id: "91", name: "Papua", cities: [
      { id: "9101", name: "Kab. Merauke" }, { id: "9102", name: "Kab. Jayawijaya" },
      { id: "9103", name: "Kab. Jayapura" }, { id: "9104", name: "Kab. Nabire" },
      { id: "9105", name: "Kab. Kepulauan Yapen" }, { id: "9106", name: "Kab. Biak Numfor" },
      { id: "9107", name: "Kab. Paniai" }, { id: "9108", name: "Kab. Puncak Jaya" },
      { id: "9109", name: "Kab. Mimika" }, { id: "9110", name: "Kab. Sarmi" },
      { id: "9111", name: "Kab. Keerom" }, { id: "9112", name: "Kab. Pegunungan Bintang" },
      { id: "9113", name: "Kab. Yahukimo" }, { id: "9114", name: "Kab. Tolikara" },
      { id: "9115", name: "Kab. Waropen" }, { id: "9116", name: "Kab. Boven Digoel" },
      { id: "9117", name: "Kab. Mappi" }, { id: "9118", name: "Kab. Asmat" },
      { id: "9119", name: "Kab. Supiori" }, { id: "9120", name: "Kab. Mamberamo Raya" },
      { id: "9121", name: "Kab. Mamberamo Tengah" }, { id: "9122", name: "Kab. Yalimo" },
      { id: "9123", name: "Kab. Lanny Jaya" }, { id: "9124", name: "Kab. Nduga" },
      { id: "9125", name: "Kab. Puncak" }, { id: "9126", name: "Kab. Dogiyai" },
      { id: "9127", name: "Kab. Intan Jaya" }, { id: "9128", name: "Kab. Deiyai" },
      { id: "9171", name: "Kota Jayapura" },
    ]
  },
  {
    id: "92", name: "Papua Barat", cities: [
      { id: "9201", name: "Kab. Sorong" }, { id: "9202", name: "Kab. Manokwari" },
      { id: "9203", name: "Kab. Fakfak" }, { id: "9204", name: "Kab. Sorong Selatan" },
      { id: "9205", name: "Kab. Raja Ampat" }, { id: "9206", name: "Kab. Teluk Bintuni" },
      { id: "9207", name: "Kab. Teluk Wondama" }, { id: "9208", name: "Kab. Kaimana" },
      { id: "9209", name: "Kab. Tambrauw" }, { id: "9210", name: "Kab. Maybrat" },
      { id: "9211", name: "Kab. Manokwari Selatan" }, { id: "9212", name: "Kab. Pegunungan Arfak" },
      { id: "9271", name: "Kota Sorong" },
    ]
  },
  {
    id: "93", name: "Papua Selatan", cities: [
      { id: "9301", name: "Kab. Merauke" },
    ]
  },
];
