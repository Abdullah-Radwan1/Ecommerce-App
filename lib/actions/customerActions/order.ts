"use server";

import db from "@/app/db/db";

export async function checkOrderFunction(email: string, productId: string) {
 return await db.order.findFirst({
  where: { user: { email }, productId },
  select: { id: true },
 });
}
