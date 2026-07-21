interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface UserData {
  customer?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export function generateWhatsAppMessage(items: CartItem[], userData: UserData, orderId?: string) {
  const phone = process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757";
  const itemsText = items.map((i) =>
    `✅ ${i.name}\n   ${i.quantity} x Rp ${i.price.toLocaleString("id-ID")} = *Rp ${(i.price * i.quantity).toLocaleString("id-ID")}*`
  ).join("\n");

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const hasAddress = userData.address || userData.city || userData.province;

  let msg = `🌿 *Halo Sin Herbal!* Saya mau order:\n\n`;
  msg += `📦 *PESANAN:*\n${itemsText}\n`;
  msg += `\n💰 *Total: Rp ${total.toLocaleString("id-ID")}*\n`;

  if (hasAddress) {
    msg += `\n📍 *ALAMAT PENGIRIMAN:*`;
    if (userData.address) msg += `\n${userData.address}`;
    if (userData.city || userData.province) msg += `\n${[userData.city, userData.province].filter(Boolean).join(", ")} ${userData.postalCode || ""}`;
  }

  msg += `\n\n👤 *DATA DIRI:*`;
  if (userData.customer) msg += `\nNama: ${userData.customer}`;
  if (userData.phone) msg += `\nTelp: ${userData.phone}`;
  if (userData.email) msg += `\nEmail: ${userData.email}`;

  if (orderId) msg += `\n\n🆔 Order ID: \`${orderId}\``;

  msg += `\n\nTerima kasih! 🙏`;

  return {
    text: msg,
    url: `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    phone,
  };
}

export function generateSingleProductMessage(name: string, price: number) {
  const phone = process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757";
  const msg = `🌿 Halo Sin Herbal! Saya mau order:\n\n📦 ${name}\n💰 Rp ${price.toLocaleString("id-ID")}\n\nMohon info ketersediaan stok dan ongkir. 🙏`;
  return {
    text: msg,
    url: `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
  };
}
