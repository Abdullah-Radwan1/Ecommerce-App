"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/components/Formatter";
import { useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import {
 addProduct,
 updateProduct,
} from "../../../lib/actions/adminActions/products";
import { useActionState } from "react";

export function ProductForm({ product }: { product?: Product | null }) {
 const [priceInCents, setPriceInCents] = useState<number | undefined>(
  product?.priceInCents
 );
 const [error, action, pending] = useActionState(
  product == null ? addProduct : updateProduct.bind(null, product.id),
  {}
 );

 return (
  <form
   action={action}
   className="space-y-5 max-w-lg m-auto border border-gray-200 rounded-lg p-4 mt-6"
  >
   <div className="space-y-1">
    <Label htmlFor="name">Name</Label>
    <Input
     type="text"
     id="name"
     name="name"
     defaultValue={product?.name || ""}
    />
    {error.name && <div className="text-destructive">{error.name}</div>}
   </div>
   <div className="space-y-1">
    <Label htmlFor="priceInCents">Price In Cents</Label>
    <Input
     type="number"
     id="priceInCents"
     name="priceInCents"
     value={priceInCents || 0}
     onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
    />
    <div className="text-muted-foreground mt-2">
     {formatCurrency((priceInCents || 0) / 100)}
    </div>
   </div>
   {error.priceInCents && (
    <div className="text-destructive">{error.priceInCents}</div>
   )}
   <div className="space-y-1">
    <Label htmlFor="description">Description</Label>
    <Textarea
     id="description"
     name="description"
     defaultValue={product?.description}
    />
    {error.description && (
     <div className="text-destructive">{error.description}</div>
    )}
   </div>
   <div className="space-y-1">
    <Label htmlFor="file">File</Label>
    <Input type="file" id="file" name="file" required={product == null} />
    {product != null && (
     <div className="text-muted-foreground mt-2">{product.filePath}</div>
    )}
   </div>
   <div className="space-y-1">
    <Label htmlFor="image">Image</Label>
    <Input type="file" id="image" name="image" required={product == null} />
    {product != null && (
     <Image
      className=" m-auto rounded-lg mt-2"
      src={product.imagePath}
      height="400"
      width="400"
      alt="Product Image"
     />
    )}
    {error.image && <div className="text-destructive">{error.image}</div>}
   </div>

   <Button type="submit" disabled={pending}>
    {pending ? "Saving..." : "Save"}
   </Button>
  </form>
 );
}
