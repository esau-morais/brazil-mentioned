import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_DATABASE_URL: z.string().url().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_LIVEBLOCKS_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_LIVEBLOCKS_API_KEY: process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY,
  },
});
