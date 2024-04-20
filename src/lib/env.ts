import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_DATABASE_URL: z.string().url().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});
