import { z } from "zod";
import Filter from "bad-words";
import { tursoClient } from "./db";

const filter = new Filter();

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "please enter a username")
    .max(25, "please enter a username with 25 characters or less")
    .regex(/^(#)?[a-zA-Z0-9]\w*$/, {
      message: "username may only have letters, numbers or underscores",
    })
    .refine((val) => !filter.isProfane(val), {
      message: "please choose an appropriate username",
    }),
});

export const roomSchema = z.object({
  "room-code": z
    .string()
    .min(1, "please enter the room code")
    .uuid({ message: "room code must be its uuid" })
    .refine(
      async (roomId) => {
        const roomExists = await tursoClient.execute({
          sql: "SELECT * FROM rooms WHERE id = ?",
          args: [roomId],
        });

        return roomExists.rows.length;
      },
      {
        message: "room does not exist",
      },
    ),
});
