import db from "@/app/db/db";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import React, { memo, Suspense } from "react";

export default async () => {
 const getProducts = cache(
  () => {
   return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
   });
  },
  ["/products", "getProducts"],
  { revalidate: 0 }
 );
 console.log("customer page ");

 return (
  <>
   <h1 className="text-2xl sm:text-5xl text-center font-light p-6">
    Our Products
   </h1>
   <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border container m-auto rounded-lg">
    <Suspense
     fallback={
      <>
       <ProductCardSkeleton />
       <ProductCardSkeleton />
       <ProductCardSkeleton />
      </>
     }
    >
     <ProductSuspense />
    </Suspense>
   </div>
  </>
 );

 async function ProductSuspense() {
  const products = await getProducts();

  if (products.length === 0) {
   return <div>No products available</div>;
  }

  return (
   <>
    {products.map((product) => (
     <ProductCard key={product.id} {...product} />
    ))}
   </>
  );
 }
};
