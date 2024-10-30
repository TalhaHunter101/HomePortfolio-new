import { NextResponse } from "next/server";
import { getSearchListingData } from "@/lib/ESfunctions/newsearch";

export async function POST(request) {
  try {
    const { searchValue, type, filters, currentPage, pageSize } =
      await request.json();
    console.log("API received request:", { searchValue, type, filters });

    const data = await getSearchListingData(
      searchValue,
      type,
      filters,
      currentPage,
      pageSize
    );
    console.log(
      "API sending response with geom:",
      data.geom ? "Present" : "Not present"
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
