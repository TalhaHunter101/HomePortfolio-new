import { getNeighbourhoodData } from "@/lib/ESfunctions/Neighbourhood/search";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { outcode } = await request.json();
    const data = await getNeighbourhoodData(outcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
