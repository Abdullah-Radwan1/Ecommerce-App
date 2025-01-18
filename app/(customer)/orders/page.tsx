"use client";

import { emailOrderHistory } from "@/lib/actions/emailAction/emailAction";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export default function MyOrdersPage() {
 const [statusData, action, isePending] = useActionState(
  emailOrderHistory,
  null
 );
 //  const [data, action] = useFormState(emailOrderHistory, {});
 return (
  <form action={action} className="max-w-xl mx-auto container mt-10">
   <Card>
    <CardHeader>
     <CardTitle>My Orders</CardTitle>
     <CardDescription>
      Enter your email and we will email you your order history and download
      links
     </CardDescription>
    </CardHeader>
    <CardContent>
     <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" required name="email" id="email" />
      {statusData && <div className="text-destructive">{statusData.error}</div>}
     </div>
    </CardContent>
    <CardFooter>
     {statusData ? null : (
      <Button className="w-full" size="lg" disabled={isePending} type="submit">
       {isePending ? "Sending..." : "Send"}
      </Button>
     )}
     {statusData && statusData.message}
    </CardFooter>
   </Card>
  </form>
 );
}
