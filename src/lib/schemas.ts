import { z } from "zod";
import Filter from "bad-words";
import { tursoClient } from "./db";

const filter = new Filter();

export const schema = z.object({
  username: z
    .string()
    .min(3, "please enter a username")
    .max(25, "please enter a username with 25 characters or less")
    .regex(/^(#)?[a-zA-Z0-9]\w*$/, {
      message: "username may only have letters, numbers or underscores",
    })
    .refine((val) => !filter.isProfane(val), {
      message: "please choose an appropriate username",
    })
    .refine(
      async (username) => {
        const userExists = await tursoClient.execute({
          sql: "SELECT * FROM users WHERE username = ?",
          args: [username],
        });

        return !userExists.rows.length;
      },
      {
        message: "username is already taken",
      },
    ),
});
