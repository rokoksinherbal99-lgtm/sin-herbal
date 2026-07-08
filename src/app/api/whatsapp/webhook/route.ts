import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { settings, orders, orderItems, products } from "@/db/schema";
import { eq, sql, like } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token) {
    const [row] = await db.select().from(settings).where(eq(settings.key, "wa_verify_token")).limit(1);
    if (row && row.value === token) {
      return new NextResponse(challenge, { status: 200 });
    }
  }
  return new NextResponse("Verification failed", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json({ status: "ignored" });
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== "messages") continue;
        const value = change.value;
        const messages = value.messages || [];
        const contacts = value.contacts || [];

        for (const msg of messages) {
          if (msg.type === "text") {
            const incomingText = msg.text.body.toLowerCase();
            const senderName = contacts[0]?.profile?.name || "Customer";
            const senderPhone = msg.from;

            const orderKeywords = ["pesan", "beli", "order", "saya mau", "mau beli", "mau pesan"];
            const isOrder = orderKeywords.some((kw) => incomingText.includes(kw));

            if (isOrder) {
              const allProducts = await db.select().from(products);
              let foundProducts: { id: string; name: string; quantity: number; price: number }[] = [];

              for (const p of allProducts) {
                const pName = p.name.toLowerCase();
                if (incomingText.includes(pName)) {
                  const qtyMatch = incomingText.match(new RegExp(`${pName}[^\\d]*(\\d+)`, "i"));
                  const quantity = qtyMatch ? parseInt(qtyMatch[1]) : 1;
                  foundProducts.push({ id: p.id, name: p.name, quantity, price: p.price });
                }
              }

              if (foundProducts.length === 0) {
                foundProducts = allProducts.slice(0, 1).map((p) => ({
                  id: p.id,
                  name: p.name,
                  quantity: 1,
                  price: p.price,
                }));
              }

              const orderId = crypto.randomUUID();
              const total = foundProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

              await db.insert(orders).values({
                id: orderId,
                customer: senderName,
                email: `${senderPhone}@whatsapp.com`,
                phone: senderPhone,
                address: "-",
                city: "-",
                province: "-",
                postalCode: "-",
                total,
                source: "whatsapp",
                platformData: JSON.stringify({ waMessageId: msg.id, waFrom: senderPhone }),
                notes: incomingText,
              });

              const itemRows = foundProducts.map((item) => ({
                id: crypto.randomUUID(),
                orderId,
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
              }));

              await db.insert(orderItems).values(itemRows);

              for (const item of foundProducts) {
                await db.update(products).set({ stock: sql`${products.stock} - ${item.quantity}` }).where(eq(products.id, item.id));
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "ok" });
  }
}
