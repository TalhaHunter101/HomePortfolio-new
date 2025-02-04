import { NextResponse } from "next/server";
import { housePriceSearch } from "@/lib/ESfunctions/newsearch";

export async function POST(request) {
  try {
    const { searchValue } = await request.json();
    const data = await housePriceSearch(searchValue);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
