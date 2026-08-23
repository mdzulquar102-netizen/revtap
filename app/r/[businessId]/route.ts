import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;

  const filePath = path.join(
    process.cwd(),
    "app",
    "data",
    "businesses.json"
  );

  const file = await readFile(filePath, "utf-8");
  const businesses = JSON.parse(file);

  const business = businesses.find(
    (item: { id: string; active: boolean }) =>
      item.id === businessId && item.active
  );

  if (!business) {
    return new NextResponse("RevTap link not found", {
      status: 404,
    });
  }

  return NextResponse.redirect(business.reviewUrl);
}