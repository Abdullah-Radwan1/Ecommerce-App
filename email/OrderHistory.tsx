import {
 Body,
 Container,
 Head,
 Heading,
 Hr,
 Html,
 Preview,
 Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./OrderInfo";
import React from "react";
import Image from "next/image";

type OrderHistoryEmailProps = {
 orders: {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  downloadVerificationId: string;
  product: {
   name: string;
   imagePath: string;
   description: string;
  };
 }[];
};

OrderHistoryEmail.PreviewProps = {
 orders: [
  {
   id: crypto.randomUUID(),
   createdAt: new Date(),
   pricePaidInCents: 10000,
   downloadVerificationId: crypto.randomUUID(),
   product: {
    name: "Product name",
    description: "Some description",
    imagePath: "/products/aa.jpg",
   },
  },
 ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
 return (
  <Html>
   <Preview>Order History & Downloads</Preview>
   <Tailwind>
    <Head />
    <Body className="font-sans bg-white">
     <Container className="max-w-xl">
      <Heading>Order History</Heading>
      {orders.map((order, index) => (
       <React.Fragment key={order.id}>
        <OrderInformation
         order={order}
         product={order.product}
         downloadVerificationId={order.downloadVerificationId}
        />
        {index < orders.length - 1 && <Hr />}
       </React.Fragment>
      ))}
     </Container>
    </Body>
   </Tailwind>
  </Html>
 );
}
