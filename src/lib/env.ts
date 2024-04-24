import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_DATABASE_URL: z.string().url().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
    PARTYKIT_HOST: z.string().min(1),
    SESSION_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_LIVEBLOCKS_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_LIVEBLOCKS_API_KEY: process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY,
  },
});

const PROTOCOL = env.PARTYKIT_HOST.startsWith("127.0.0.1") ? "http" : "https";
export const PARTYKIT_URL = `${PROTOCOL}://${env.PARTYKIT_HOST}`;
