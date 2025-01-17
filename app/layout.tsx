import type { Metadata } from "next";

import "./globals.css";
import { NavigationMenuDemo } from "@/components/NavBar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
 title: "Create Next App",
 description: "Generated by create next app",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className={cn(` min-h-screen antialiased font-sans`)}>
    <NavigationMenuDemo />
    {children}
   </body>
  </html>
 );
}

////
