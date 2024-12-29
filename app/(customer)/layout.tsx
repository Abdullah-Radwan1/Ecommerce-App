import { NavBar, NavLink } from "@/components/NavBar";
import React, { ReactNode } from "react";

export const dynamic = "force-dynamic";
const layout = ({ children }: { children: ReactNode }) => {
 return (
  <>
   <NavBar>
    <NavLink href={"/"}>home</NavLink>
    <NavLink href={"/products"}>products</NavLink>
    <NavLink href={"/orders"}>my orders</NavLink>
   </NavBar>
   {children}
  </>
 );
};

export default layout;
