import { fetchRentListingData } from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { outcode } = await request.json();

    const data = await fetchRentListingData(outcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
