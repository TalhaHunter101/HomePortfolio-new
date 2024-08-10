import { searchListingByPostcode } from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { postcode } = await request.json();
    const data = await searchListingByPostcode(postcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
