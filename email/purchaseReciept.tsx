import {
 Body,
 Container,
 Head,
 Heading,
 Html,
 Preview,
 Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./OrderInfo";
import Image from "next/image";

type PurchaseReceiptEmailProps = {
 product: {
  name: string;
  imagePath: string;
  description: string;
 };
 order: { id: string; createdAt: Date; pricePaidInCents: number };
 downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
 product: {
  name: "Product name",
  description: "Some description",
  imagePath: "/products/aa.jpg",
 },
 order: {
  id: crypto.randomUUID(),
  createdAt: new Date(),
  pricePaidInCents: 10000,
 },
 downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
 product,
 order,
 downloadVerificationId,
}: PurchaseReceiptEmailProps) {
 return (
  <Html>
   <Preview> downloud {product.name}</Preview>
   <Tailwind>
    <Head />
    <Body>
     <Container>
      <Heading> Purchase Reciept</Heading>
      <OrderInformation
       order={order}
       product={product}
       downloadVerificationId={downloadVerificationId}
      />
     </Container>
    </Body>
   </Tailwind>
  </Html>
 );
}
