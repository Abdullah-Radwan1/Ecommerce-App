import db from "@/app/db/db";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import React, { memo, Suspense } from "react";

export default memo(async () => {
 const getProducts = cache(
  () => {
   return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
   });
  },
  ["/products", "getProducts"],
  { revalidate: false }
 );
 console.log("customer page ");
 return (
  <>
   <h1 className="text-2xl sm:text-5xl text-center font-light p-8">
    Our Products{" "}
   </h1>
   <div className="p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4">
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
  const product = await getProducts();

  return product.map((product) => (
   <ProductCard key={product.id} {...product} />
  ));
 }
});
