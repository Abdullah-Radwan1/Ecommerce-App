import { NavBar, NavLink } from "@/components/NavBar";
import React, { ReactNode } from "react";

export const dynamic = "force-dynamic";
const layout = ({ children }: { children: ReactNode }) => {
 return (
  <>
   <NavBar>
    <NavLink href={"/admin/dashboard"}>Dashboard</NavLink>
    <NavLink href={"/admin/customers"}>Customers</NavLink>
    <NavLink href={"/admin/products"}>Products</NavLink>
    <NavLink href={"/admin/sales"}>Sales</NavLink>
   </NavBar>
   {children}
  </>
 );
};

export default layout;
