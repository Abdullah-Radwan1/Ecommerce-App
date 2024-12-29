import React, { Suspense } from "react";
import db from "../db/db";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import { cache } from "@/lib/cache";

export default async () => {
 console.log("customer page ");
 const newestProducts = cache(() => {
  return db.product.findMany({
   where: { isAvailableForPurchase: true },
   orderBy: { createdAt: "asc" },
   take: 4,
  });
 }, ["/", "newestProducts"]);
 const mostPopular = cache(
  () => {
   return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 4,
   });
  },
  ["/", "mostPopular"],
  { revalidate: 60 * 60 }
 );

 return (
  <div className="space-y-12 ">
   <ProductGridSection
    title="newst products"
    productsFetcher={newestProducts}
   />
   <ProductGridSection
    title="featured Products"
    productsFetcher={mostPopular}
   />
  </div>
 );
};

type ProductGridSectionProps = {
 title: string;
 productsFetcher: () => Promise<Product[]>;
};

async function ProductGridSection({
 productsFetcher,
 title,
}: ProductGridSectionProps) {
 return (
  <>
   <div className="flex gap-4 pt-8 items-center justify-center">
    <h1 className="text-5xl font-light">{title}</h1>
    <Button variant="outline" asChild>
     <Link href="/products" className="space-x-2">
      <span className="text-black">View All</span>
      <ArrowRight className="size-4 text-black" />
     </Link>
    </Button>
   </div>
   {/* //suspense  */}
   <div className="px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <Suspense
     fallback={
      <>
       <ProductCardSkeleton />
       <ProductCardSkeleton />
       <ProductCardSkeleton />
      </>
     }
    >
     <ProductSuspense productsFetcher={productsFetcher} />
    </Suspense>
   </div>
  </>
 );
}

async function ProductSuspense({
 productsFetcher,
}: {
 productsFetcher: () => Promise<Product[]>;
}) {
 const products = await productsFetcher();
 return products.map((product) => (
  <ProductCard key={product.id} {...product} />
 ));
}