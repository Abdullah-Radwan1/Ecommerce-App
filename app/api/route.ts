import { NextResponse, NextRequest } from "next/server";

export function GET(req: NextRequest) {
 console.log(req.cookies.get);
 return new NextResponse("hello mother father", { status: 200 });
}
