"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
 navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
 {
  title: "products",
  href: "/products",
  description: "navigate our latest and cool products",
 },
 {
  title: "orders",
  href: "/orders",
  description: "see what orders have you made by your email",
 },
];

export function NavigationMenuDemo() {
 return (
  <NavigationMenu className="m-auto mt-2">
   <NavigationMenuList>
    <NavigationMenuItem>
     <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
     <NavigationMenuContent>
      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
       <li className="row-span-3">
        <NavigationMenuLink asChild>
         <a
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
          href="/"
         >
          {/* <Icons.logo className="h-6 w-6" /> */}
          <div className="mb-2 mt-4 text-lg font-medium">Admin section</div>
          <p className="text-sm leading-tight text-muted-foreground">
           as an admin you can add delete and update products, have a control on
           the users of the App, in addition to a dashboard of the sales and the
           customers
          </p>
         </a>
        </NavigationMenuLink>
       </li>
       <ListItem href="/admin/products" title="products">
        add, delete and update products of your App
       </ListItem>
       <ListItem href="/admin/customers" title="customers">
        see all your customers and have the access to control over them{" "}
       </ListItem>
       <ListItem href="/admin/sales" title="sales">
        table of the latest sales made by your customers{" "}
       </ListItem>
      </ul>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <NavigationMenuTrigger>Customer</NavigationMenuTrigger>
     <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
       {components.map((component) => (
        <ListItem
         key={component.title}
         title={component.title}
         href={component.href}
        >
         {component.description}
        </ListItem>
       ))}
      </ul>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <Link href="/" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
       Home
      </NavigationMenuLink>
     </Link>
    </NavigationMenuItem>
   </NavigationMenuList>
  </NavigationMenu>
 );
}

const ListItem = React.forwardRef<
 React.ElementRef<"a">,
 React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
 return (
  <li>
   <NavigationMenuLink asChild>
    <a
     ref={ref}
     className={cn(
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
     )}
     {...props}
    >
     <div className="text-sm font-medium leading-none">{title}</div>
     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
      {children}
     </p>
    </a>
   </NavigationMenuLink>
  </li>
 );
});
ListItem.displayName = "ListItem";
