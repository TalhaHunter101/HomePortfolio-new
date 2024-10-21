import { fetchParticularListing } from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { uprn } = await request.json();
    const data = await fetchParticularListing(uprn);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
