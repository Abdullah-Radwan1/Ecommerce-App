import React from "react";
import Link from "next/link";
import db from "@/app/db/db";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../../../components/adminComp/_components/PageHeader";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";

import { formatCurrency, formatNumber } from "@/components/Formatter";
import {
 ActiveToggleDropDownItem,
 DeleteProductDropdownItem,
} from "./productAction";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuDemo } from "@/components/adminComp/_components/DropDown";

const Page = () => {
 return (
  <div className="max-w-2xl m-auto mt-5">
   {/* Page Header */}
   <div className="flex justify-between p-4 items-center  ">
    <PageHeader>Products</PageHeader>
    <Button asChild>
     <Link href="/admin/products/new">Add</Link>
    </Button>
   </div>

   {/* Product Table */}
   <ProductTable />
  </div>
 );
};

async function ProductTable() {
 const products = await db.product.findMany({
  select: {
   id: true,
   name: true,
   priceInCents: true,
   isAvailableForPurchase: true,
   imagePath: true,
   filePath: true,
   _count: {
    select: { orders: true },
   },
  },
  orderBy: { name: "asc" },
 });
 console.log(products);
 return (
  <>
   {products.length > 0 ? (
    <Table>
     <TableHeader>
      <TableRow>
       <TableHead className="w-0">
        <span className="sr-only">Available for Purchase</span>
       </TableHead>
       <TableHead>Name</TableHead>
       <TableHead>Price</TableHead>
       <TableHead>Orders</TableHead>
       <TableHead>
        <span className="sr-only">Actions</span>
       </TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      {products.map((product) => (
       <TableRow key={product.id}>
        {/* Availability Indicator */}
        <TableCell>
         {product.isAvailableForPurchase ? (
          <>
           <CheckCircle2 />
           <span className="sr-only">Available</span>
          </>
         ) : (
          <>
           <XCircle className="stroke-destructive" />
           <span className="sr-only">Unavailable</span>
          </>
         )}
        </TableCell>

        {/* Product Name */}
        <TableCell>{product.name}</TableCell>

        {/* Product Price */}
        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>

        {/* Product Orders */}
        <TableCell>{formatNumber(product._count.orders)}</TableCell>

        {/* Actions Dropdown */}
        <TableCell>
         <DropdownMenuDemo
          isAvailableForPurchase={product.isAvailableForPurchase}
          productId={product.id}
         />
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
    </Table>
   ) : (
    <h1 className="text-center py-5">No products were found</h1>
   )}
  </>
 );
}

export default Page;
