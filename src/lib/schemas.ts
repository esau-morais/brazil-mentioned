import { z } from "zod";
import Filter from "bad-words";
import { tursoClient } from "./db";

const filter = new Filter();

export const schema = z.object({
  nickname: z
    .string()
    .min(3, "please enter a nickname")
    .max(25, "please enter a nickname with 25 characters or less")
    .regex(/^(#)?[a-zA-Z0-9]\w*$/, {
      message: "nickname may only have letters, numbers or underscores",
    })
    .refine((val) => !filter.isProfane(val), {
      message: "please choose an appropriate nickname",
    })
    .refine(
      async (val) => {
        const userExists = await tursoClient.execute({
          sql: "SELECT nickname FROM users WHERE nickname = ?",
          args: [val],
        });

        return !userExists.rows.length;
      },
      {
        message: "nickname is already taken",
      },
    ),
});
