"use server";

import db from "@/app/db/db";
//what the hell is hapening here
export async function userOrderExists(email: string, productId: string) {
 return (
  (await db.order.findFirst({
   where: { user: { email }, productId },
   select: { id: true },
  })) != null
 );
}
