import { fetchListingDataByListingIds } from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { listingIds } = await request.json();

    const data = await fetchListingDataByListingIds(listingIds);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
