import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

const SOURCE_LABEL: Record<string, string> = {
  website: "Website",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
};

export async function sendOrderNotification(orderId: string, customer: string, total: number, source: string) {
  try {
    const rows = await db.select().from(settings);
    const config: Record<string, string> = {};
    for (const row of rows) config[row.key] = row.value;

    const phoneNumberId = config.wa_phone_number_id;
    const accessToken = config.wa_access_token;
    const adminPhone = config.wa_admin_phone;

    if (!phoneNumberId || !accessToken || !adminPhone) return;

    const sourceLabel = SOURCE_LABEL[source] || source;
    const formattedTotal = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(total);

    const message = `🆕 *Pesanan Baru!*\n\n👤 Customer: ${customer}\n💰 Total: ${formattedTotal}\n📱 Sumber: ${sourceLabel}\n🆔 ID: ${orderId}\n\nLihat di dashboard: https://rokoksin.vercel.app/admin/orders`;

    await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: adminPhone,
        type: "text",
        text: { body: message },
      }),
    });
  } catch {
    // silently fail — don't block the order
  }
}
