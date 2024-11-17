import { getSearchListingData } from "@/lib/ESfunctions/newsearch";
import { NextResponse } from "next/server";
 
export async function POST(request) {
  try {
    const { searchValue, type, filters, currentPage, pageSize, coordinates } = await request.json();

    const data = await getSearchListingData(
      searchValue,
      type,
      filters,
      currentPage,
      pageSize,
      coordinates
    );

    console.log("API sending response with geom:", data.geom ? "Present" : "Not present");

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in get-listing-data API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
