import { NextResponse } from "next/server";
import { getListingByMultipleListingIds } from "@/lib/ESfunctions/newsearch";

export async function POST(request) {
  try {
    const { propertyIds } = await request.json();
    const data = await getListingByMultipleListingIds(propertyIds);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Error", { status: 500 });

  }
}