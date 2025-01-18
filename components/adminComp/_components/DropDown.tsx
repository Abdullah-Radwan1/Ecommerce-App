"use client";

import { Pen, Trash, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuGroup,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteDropDownItem } from "../deleteDropDown";
import {
 ActiveToggleDropDownItem,
 DeleteProductDropdownItem,
} from "@/app/admin/products/productAction";

export function DropdownMenuDemo({
 productId,
 isAvailableForPurchase,
}: {
 productId: string;
 isAvailableForPurchase: boolean;
}) {
 return (
  <DropdownMenu>
   <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
   <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
     <DropdownMenuItem>
      <Link
       href={`/admin/products/${productId}/edit`}
       className="flex items-center gap-2"
      >
       <Pen className="w-4 h-4" />
       Edit
      </Link>
     </DropdownMenuItem>
     <DropdownMenuSeparator />
     <DropdownMenuItem variant="default">
      <Link
       href={`/admin/products/${productId}/download`}
       download
       className="flex items-center gap-2"
      >
       <Download className="w-4 h-4" />
       Download
      </Link>
     </DropdownMenuItem>

     <DropdownMenuSeparator />
     <ActiveToggleDropDownItem
      id={productId}
      isAvailable={isAvailableForPurchase}
     />
     <DropdownMenuSeparator />
     <DeleteProductDropdownItem disabled id={productId} />
    </DropdownMenuGroup>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}
