export const PRODUCT_ALLOWED_FIELDS = ["name", "slug", "description", "price", "images", "categoryId", "manufacturer", "stock", "featured", "batchNumber"] as const;

export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function validateSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export interface ProductValidation {
  clean: Record<string, unknown>;
  errors: string[];
}

export function validateProductInput(body: Record<string, unknown>): ProductValidation {
  const clean: Record<string, unknown> = {};
  const errors: string[] = [];

  if (body.name !== undefined) {
    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      errors.push("Nama produk tidak valid");
    } else {
      clean.name = sanitize(body.name.trim());
    }
  }

  if (body.slug !== undefined) {
    if (typeof body.slug !== "string" || !validateSlug(body.slug)) {
      errors.push("Slug tidak valid (hanya huruf kecil, angka, dan tanda strip)");
    } else {
      clean.slug = body.slug;
    }
  }

  if (body.description !== undefined) {
    if (typeof body.description !== "string") {
      errors.push("Deskripsi tidak valid");
    } else {
      clean.description = sanitize(body.description.trim());
    }
  }

  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isInteger(price) || price <= 0) {
      errors.push("Harga harus berupa angka positif");
    } else {
      clean.price = price;
    }
  }

  if (body.stock !== undefined) {
    const stock = Number(body.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      errors.push("Stok harus berupa angka >= 0");
    } else {
      clean.stock = stock;
    }
  }

  if (body.images !== undefined) {
    if (typeof body.images !== "string") {
      errors.push("Gambar tidak valid");
    } else {
      clean.images = body.images;
    }
  }

  if (body.categoryId !== undefined) {
    if (typeof body.categoryId !== "string") {
      errors.push("Kategori tidak valid");
    } else {
      clean.categoryId = body.categoryId;
    }
  }

  if (body.manufacturer !== undefined) {
    if (typeof body.manufacturer !== "string") {
      errors.push("Produsen tidak valid");
    } else {
      clean.manufacturer = sanitize(body.manufacturer.trim());
    }
  }

  if (body.featured !== undefined) {
    clean.featured = Boolean(body.featured);
  }

  if (body.batchNumber !== undefined) {
    if (typeof body.batchNumber !== "string") {
      errors.push("Nomor batch tidak valid");
    } else {
      clean.batchNumber = body.batchNumber;
    }
  }

  return { clean, errors };
}
