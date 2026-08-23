import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
export async function GET() {
  try {
    const file = await readFile(filePath, "utf-8");
    const businesses = JSON.parse(file);

    return NextResponse.json(businesses);
  } catch {
    return NextResponse.json(
      { error: "Could not load businesses." },
      { status: 500 }
    );
  }
}

const filePath = path.join(
  process.cwd(),
  "app",
  "data",
  "businesses.json"
);

export async function POST(request: Request) {
  try {
    const newBusiness = await request.json();

    const file = await readFile(filePath, "utf-8");
    const businesses = JSON.parse(file);

    const alreadyExists = businesses.some(
      (business: { id: string }) => business.id === newBusiness.id
    );

    if (alreadyExists) {
      return NextResponse.json(
        { error: "Business ID already exists." },
        { status: 409 }
      );
    }

    businesses.push({
      id: newBusiness.id,
      name: newBusiness.name,
      reviewUrl: newBusiness.reviewUrl,
      active: true,
    });

    await writeFile(
      filePath,
      JSON.stringify(businesses, null, 2)
    );

    return NextResponse.json({
      success: true,
      business: newBusiness,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not create business." },
      { status: 500 }
    );
  }
}