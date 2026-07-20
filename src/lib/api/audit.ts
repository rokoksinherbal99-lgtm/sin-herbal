import { db } from "@/db";
import { auditLogs } from "@/db/schema";

export async function logAudit(action: string, targetType: string, targetId: string, newValue?: string) {
  await db.insert(auditLogs).values({
    id: crypto.randomUUID(),
    action,
    targetType,
    targetId,
    newValue: newValue || null,
    createdAt: new Date(),
  }).catch(() => {});
}

export async function logLogin(username: string, success: boolean) {
  await logAudit(
    success ? "login_success" : "login_failed",
    "admin",
    username,
  );
}

export async function logProductCreate(productId: string, name: string) {
  await logAudit("create_product", "product", productId, name);
}

export async function logProductDelete(productId: string, name: string) {
  await logAudit("delete_product", "product", productId, name);
}

export async function logProductUpdate(productId: string, fields: string[]) {
  await logAudit("update_product", "product", productId, fields.join(", "));
}

export async function logOrderStatusChange(orderId: string, status: string) {
  await logAudit("update_order_status", "order", orderId, status);
}

export async function logTestimonialCreate(id: string) {
  await logAudit("create_testimonial", "testimonial", id);
}

export async function logTestimonialUpdate(id: string) {
  await logAudit("update_testimonial", "testimonial", id);
}

export async function logTestimonialDelete(id: string) {
  await logAudit("delete_testimonial", "testimonial", id);
}

export async function logPasswordChange() {
  await logAudit("change_password", "admin", "admin");
}
