import React from "react";
import { ProductForm } from "@/components/adminComp/_components/productForm";
import db from "@/app/db/db";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
 // Await the params promise
 const { id } = await params;

 // Fetch the product data
 const product = await db.product.findUnique({
  where: { id },
 });

 return (
  <div className="p-4">
   <ProductForm product={product} />
  </div>
 );
};

export default page;
