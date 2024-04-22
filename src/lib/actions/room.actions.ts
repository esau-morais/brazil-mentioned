"use server";

import { tursoClient } from "../db";
import { redirect } from "next/navigation";
import { roomSchema, usernameSchema } from "../schemas";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (initialState: any, formData: FormData) => {
  const validatedFields = await usernameSchema.safeParseAsync({
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userExists = await tursoClient.execute({
    sql: "SELECT * FROM users WHERE username = ?",
    args: [validatedFields.data.username],
  });
  const isCreateRoom = initialState.roomId === "create";

  if (isCreateRoom && userExists.rows.length) {
    return {
      errors: {
        username: ["username is already taken"],
      },
    };
  } else if (isCreateRoom && !userExists.rows.length) {
    const user = await tursoClient.execute({
      sql: "INSERT INTO users (username) VALUES (?)",
      args: [validatedFields.data.username],
    });

    const roomId = uuidv4();
    await tursoClient.execute({
      sql: "INSERT INTO rooms (id, created_by) VALUES (?, ?)",
      args: [roomId, Number(user.lastInsertRowid)],
    });
    redirect(`/room/${roomId}`);
  } else {
    redirect(`/room/${initialState.roomId}`);
  }
};

export const joinRoom = async (_: unknown, formData: FormData) => {
  const validatedFields = await roomSchema.safeParseAsync({
    "room-code": formData.get("room-code"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  redirect(`/auth?room=${validatedFields.data["room-code"]}`);
};
