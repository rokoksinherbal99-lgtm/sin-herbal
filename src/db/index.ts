import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!, {
  connect_timeout: 10,
  idle_timeout: 30,
  max_lifetime: 60 * 5,
});
export const db = drizzle(client, { schema });
