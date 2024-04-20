import { env } from "@/lib/env";
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

export const liveblocksClient = createClient({
  publicApiKey: env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY,
});

export const {
  suspense: { RoomProvider },
} = createRoomContext(liveblocksClient);
