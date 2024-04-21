"use server";

import { tursoClient } from "../db";
import { redirect } from "next/navigation";
import { schema } from "../schemas";

export const createUser = async (_: unknown, formData: FormData) => {
  const validatedFields = await schema.safeParseAsync({
    nickname: formData.get("nickname"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await tursoClient.execute({
    sql: "INSERT INTO users (nickname) VALUES (?)",
    args: [validatedFields.data.nickname],
  });

  if (user.lastInsertRowid) {
    const room = await tursoClient.execute({
      sql: "INSERT INTO rooms (name, created_by) VALUES (?, ?)",
      // TODO: generate dynamic room name based on nickname and user id
      args: ["any", user.lastInsertRowid],
    });
    redirect(`/room/${room.lastInsertRowid}`);
  }
};
