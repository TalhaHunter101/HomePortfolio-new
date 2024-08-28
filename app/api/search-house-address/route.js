import { getHouseDataAddress } from "@/lib/ESfunctions/indevisual";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let { query } = await request.json();
    const response = await getHouseDataAddress(query);
    if (response) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch data from PropertyData API" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error fetching data from PropertyData API" },
      { status: 500 }
    );
  }
}
