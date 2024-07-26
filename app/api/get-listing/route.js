import { fetchListingsProperty } from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const data = await fetchListingsProperty();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
