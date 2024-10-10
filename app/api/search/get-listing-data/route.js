import { NextResponse } from "next/server";
import { getSearchListingData } from "@/lib/ESfunctions/newsearch";

export async function POST(request) {
  try {
    const { searchValue, filters, currentPage, pageSize } = await request.json();
    const data = await getSearchListingData(searchValue, filters, currentPage, pageSize);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
 