import db from "@/app/db/db";
import { formatCurrency } from "@/components/Formatter";
import { Button } from "@/components/ui/button";
import { useStripe } from "@stripe/react-stripe-js";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

export default async function ({
 searchParams,
}: {
 searchParams: Promise<{ payment_intent: string }>;
}) {
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

 const paymentintent = (await searchParams).payment_intent;
 console.log(paymentintent);
 const paymentIntent = await stripe.paymentIntents.retrieve(paymentintent);
 const success = paymentIntent.status === "succeeded";

 const product = await db.product.findUnique({
  where: { id: paymentIntent.metadata.productId },
 });

 if (product == null) {
  throw new Error("product not found ");
 }

 return (
  <div className="p-8 max-w-5xl w-full mx-auto">
   <div className="flex gap-4 items-center">
    <div className="aspect-video flex-shrink-0 w-1/3 relative">
     <Image
      src={product.imagePath}
      fill
      alt={product.name}
      className="object-cover"
     />
    </div>
    <div>
     <div className="text-lg">{formatCurrency(product.priceInCents / 100)}</div>
     <h1 className="text-2xl font-bold">{product.name}</h1>
     <div className="line-clamp-3 text-muted-foreground">
      {product.description}
     </div>
    </div>
    <Button className="mt-4" size="lg" asChild>
     {success ? (
      <a
       href={`/products/download/${await createDownloadVerification(
        product.id
       )}`}
      >
       Download
      </a>
     ) : (
      <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
     )}
    </Button>
   </div>
  </div>
 );
}

async function createDownloadVerification(productId: string) {
 return (
  await db.downloadVerification.create({
   data: {
    productId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
   },
  })
 ).id;
}
