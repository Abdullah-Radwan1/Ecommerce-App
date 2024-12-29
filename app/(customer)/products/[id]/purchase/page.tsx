import CheckoutForm from "@/components/adminComp/_components/CheckoutForm";
import db from "@/app/db/db";
import React from "react";
import Stripe from "stripe";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
 const { id } = await params;
 const product = await db.product.findUnique({ where: { id } });

 if (product == null) {
  throw Error("error in stripe payment");
 }
 const paymentIntents = stripe.paymentIntents.create({
  amount: product.priceInCents,
  currency: "usd",
  metadata: { productId: product.id },
 });
 if ((await paymentIntents).client_secret == null) {
  throw Error("error in payment Intent");
 }

 return (
  <CheckoutForm
   product={product}
   clientSecret={(await paymentIntents).client_secret as string}
  />
 );
};

export default page;
