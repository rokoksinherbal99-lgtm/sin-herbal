import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";

const VALID_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return unauthorized();
  try {
    const { id } = await params;
    const { status: newStatus } = await req.json();

    if (!VALID_STATUSES.includes(newStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const [existing] = await db.select({ id: orders.id, status: orders.status }).from(orders).where(eq(orders.id, id)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const allowed = VALID_TRANSITIONS[existing.status];
    if (allowed && !allowed.includes(newStatus) && existing.status !== newStatus) {
      return NextResponse.json({ error: `Cannot transition from ${existing.status} to ${newStatus}` }, { status: 400 });
    }

    await db.update(orders).set({ status: newStatus, updatedAt: new Date() }).where(eq(orders.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
