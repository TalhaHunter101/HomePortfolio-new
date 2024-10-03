import { getPricePaidData } from "@/lib/ESfunctions/indevisual";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { city } = await request.json();

    const data = await getPricePaidData(city);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
