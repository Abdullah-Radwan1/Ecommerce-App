"use server";

import db from "@/app/db/db";

export async function deleteUser(id: string) {
 const user = await db.user.delete({ where: { id } });
 if (user == null) {
  return "user not found";
 }
 return user;
}
