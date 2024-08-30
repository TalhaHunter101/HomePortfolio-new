import { getListingByListingId } from "@/lib/ESfunctions/newsearch";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { listingId } = await request.json();

    const data = await getListingByListingId(listingId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
