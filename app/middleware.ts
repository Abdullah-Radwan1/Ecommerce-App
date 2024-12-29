import { NextResponse, NextRequest } from "next/server";

export function GET(req: NextRequest) {
 return new NextResponse("hello mother father", { status: 200 });
}
console.log("customer page ");
