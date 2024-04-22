"use server";

import { tursoClient } from "../db";
import { redirect } from "next/navigation";
import { schema } from "../schemas";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (_: unknown, formData: FormData) => {
  const validatedFields = await schema.safeParseAsync({
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await tursoClient.execute({
    sql: "INSERT INTO users (username) VALUES (?)",
    args: [validatedFields.data.username],
  });

  if (user.lastInsertRowid) {
    const roomId = uuidv4();
    await tursoClient.execute({
      sql: "INSERT INTO rooms (id, created_by) VALUES (?, ?)",
      args: [roomId, user.lastInsertRowid],
    });
    redirect(`/room/${roomId}`);
  }
};
