import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { DashboardCardProps } from "@/types";
import React from "react";
import db from "../db/db";
import { formatCurrency, formatNumber } from "@/components/Formatter";

async function getSalesData() {
 console.log("customer page ");
 const data = await db.order.aggregate({
  _sum: { pricePaidInCents: true },
  _count: true,
 });
 return { amount: data._sum.pricePaidInCents || 0, numberOfSales: data._count };
}
async function getUserData() {
 const [userCount, orderData] = await Promise.all([
  db.user.count(),
  db.order.aggregate({ _sum: { pricePaidInCents: true } }),
 ]);
 return {
  userCount,
  averageValuePerUser:
   userCount === 0
    ? 0
    : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
 };
}
async function getProducts() {
 const [acitveProducts, inactiveProducts] = await Promise.all([
  db.product.count({ where: { isAvailableForPurchase: true } }),
  db.product.count({ where: { isAvailableForPurchase: false } }),
 ]);
 return {
  acitveProducts,
  inactiveProducts,
 };
}
const page = async () => {
 const [salesData, usersData, productsData] = await Promise.all([
  getSalesData(),
  getUserData(),
  getProducts(),
 ]);

 return (
  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
   <DashboardCard
    title="Sales"
    body={formatCurrency(salesData.amount)}
    subtitle={formatCurrency(salesData.amount)}
   />
   <DashboardCard
    title="Customers"
    body={formatCurrency(usersData.averageValuePerUser)}
    subtitle={`${formatNumber(usersData.userCount)} users `}
   />
   <DashboardCard
    title="products"
    body={`${formatNumber(productsData.acitveProducts)} active Products`}
    subtitle={`${formatNumber(
     productsData.inactiveProducts
    )} inactive Products`}
   />
  </div>
 );
};
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
 return (
  <Card>
   <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{subtitle}</CardDescription>
   </CardHeader>
   <CardContent>
    <p>{body}</p>
   </CardContent>
  </Card>
 );
}
export default page;
