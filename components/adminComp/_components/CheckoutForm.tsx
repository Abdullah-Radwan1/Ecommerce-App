"use client";
import { Product } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import {
 Elements,
 LinkAuthenticationElement,
 PaymentElement,
 useElements,
 useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { formatCurrency } from "@/components/Formatter";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkOrderFunction } from "@/lib/actions/customerActions/order";

export default function ({
 product,
 clientSecret,
}: {
 product: Product;
 clientSecret: string;
}) {
 const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
 );

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
   </div>
   <Elements
    options={{
     clientSecret,
     appearance: {
      disableAnimations: false,
      theme: "flat",
      labels: "floating",
     },
    }}
    stripe={stripePromise}
   >
    <Form priceInCents={product.priceInCents} productId={product.id} />
   </Elements>
  </div>
 );
}

function Form({
 priceInCents,
 productId,
}: {
 priceInCents: number;
 productId: string;
}) {
 const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState<string>();
 const [email, setEmail] = useState<string>("");
 const stripe = useStripe();
 const elements = useElements();
 //handle submition
 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (stripe == null || elements == null) {
   throw new Error("error in stripe");
  }
  if (!stripe || !email || !elements) {
   setIsLoading(true);
  }
  const checkOrder = await checkOrderFunction(email, productId);
  if (checkOrder) {
   setErrorMessage("order already exists");
  }
  stripe
   .confirmPayment({
    elements,
    confirmParams: {
     return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products/purchase-success`,
    },
   })
   .then(({ error }) => {
    if (error.type === "validation_error" || error.type === "card_error") {
     setErrorMessage(error.message);
    } else {
     setErrorMessage("what da hell !");
    }
   })
   .finally(() => {
    setIsLoading(false);
   });
 };

 return (
  <form onSubmit={handleSubmit}>
   <Card>
    <CardHeader>
     <CardTitle>Checkout</CardTitle>
     {errorMessage && (
      <CardDescription className="text-destructive">
       {errorMessage}
      </CardDescription>
     )}
    </CardHeader>
    <CardContent>
     <PaymentElement />
     <div className="mt-4">
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
     </div>
    </CardContent>
    <CardFooter>
     <Button
      className="w-full"
      size="lg"
      disabled={stripe == null || elements == null || isLoading}
     >
      {isLoading
       ? "Purchasing..."
       : `Purchase - ${formatCurrency(priceInCents / 100)}`}
     </Button>
    </CardFooter>
   </Card>
  </form>
 );
}
