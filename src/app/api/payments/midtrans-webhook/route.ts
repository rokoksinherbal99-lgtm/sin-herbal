import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;
    const signatureKey = body.signature_key;
    const grossAmount = body.gross_amount;
    const statusCode = body.status_code;

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    if (SERVER_KEY) {
      const hash = crypto.createHash("sha512").update(orderId + statusCode + grossAmount + SERVER_KEY).digest("hex");
      if (signatureKey !== hash) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
      }
    }

    let status = "pending";
    if (transactionStatus === "capture" || transactionStatus === "settlement") {
      status = fraudStatus === "accept" ? "confirmed" : "pending";
    } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
      status = "cancelled";
    }

    await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, orderId));
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
