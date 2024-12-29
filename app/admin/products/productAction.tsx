"use client";

import { useTransition } from "react";
import {
 DeleteProduct,
 ToggleProductAvailability,
} from "../../../lib/actions/adminActions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ActiveToggleDropDownItem({
 id,
 isAvailable,
}: {
 id: string;
 isAvailable: boolean;
}) {
 const [isPending, startTransition] = useTransition();

 return (
  <DropdownMenuItem
   disabled={isPending}
   onClick={() => {
    startTransition(async () => {
     await ToggleProductAvailability(id, !isAvailable);
    });
   }}
  >
   {isAvailable ? "Deactivate" : "activate"}
  </DropdownMenuItem>
 );
}

export function DeleteDropdownItem({
 id,
 disabled,
}: {
 id: string;
 disabled: boolean;
}) {
 const [isPending, startTransition] = useTransition();

 return (
  <DropdownMenuItem
   variant="destructive"
   disabled={isPending || disabled}
   onClick={() => {
    startTransition(async () => {
     await DeleteProduct(id);
    });
   }}
  >
   Delete{" "}
  </DropdownMenuItem>
 );
}
