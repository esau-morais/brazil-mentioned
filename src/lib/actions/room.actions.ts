"use server";

import { tursoClient } from "../db";

export const createRoom = async (formData: FormData) => {
  try {
    const name = formData.get("name");
    const created_by = formData.get("created_by");
    // if (typeof name !== "string" || typeof created_by !== "number")
    //   throw new Error("name and created_by are required");

    const room = await tursoClient.execute({
      sql: "INSERT INTO rooms (name, created_by) VALUES (?, ?)",
      args: [],
    });
    console.info({ room });
  } catch (error) {
    throw new Error(error);
  }
};
