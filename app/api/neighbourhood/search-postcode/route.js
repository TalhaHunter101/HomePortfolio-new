import { searchPostcodeNeighbourhood } from "@/lib/ESfunctions/Neighbourhood/search";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { postcode } = await request.json();
    const data = await searchPostcodeNeighbourhood(postcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
