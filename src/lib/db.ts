import { createClient } from "@libsql/client";
import { env } from "./env";

export const tursoClient = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});
