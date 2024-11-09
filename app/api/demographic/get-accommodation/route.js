import { getAccommodationData } from "@/lib/ESfunctions/v2/demographic";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postcode = searchParams.get('postcode');
    
    const data = await getAccommodationData(postcode);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch accommodation data" }, { status: 500 });
  }
} 