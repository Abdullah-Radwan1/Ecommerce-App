import db from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";

export async function GET(
 req: NextRequest,
 { params }: { params: Promise<{ DVID: string }> }
) {
 // Extract DVID from request params
 const dvid = (await params).DVID;

 // Fetch download verification data from the database
 const data = await db.downloadVerification.findUnique({
  where: { id: dvid, expiresAt: { gt: new Date() } },
  select: { product: { select: { filePath: true, name: true } } },
 });

 // If no valid data is found, redirect to the expired page
 if (!data) {
  return NextResponse.redirect(new URL("/products/download/expired", req.url));
 }
 // add currentUrl to keep the data
 const filePath = data.product.filePath;
 const fileName = data.product.name;

 try {
  // Get file statistics (e.g., size)
  const fileStats = await stat(filePath);

  // Create a readable stream for the file
  const fileStream = createReadStream(filePath);

  // Get the file extension
  const extension = path.extname(filePath).slice(1); // Removes the leading dot

  // Create and return a streaming response
  return new NextResponse(fileStream as any, {
   headers: {
    "Content-Disposition": `attachment; filename="${fileName}.${extension}"`,
    "Content-Length": fileStats.size.toString(),
    "Content-Type": "application/octet-stream",
   },
  });
 } catch (error) {
  console.error("Error serving file:", error);
  // Return a 500 Internal Server Error if the file cannot be accessed
  return new NextResponse("Internal Server Error", { status: 500 });
 }
}
