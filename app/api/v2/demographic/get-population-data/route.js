import { getPopulationData } from "@/lib/ESfunctions/v2/demographic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { postcode } = await request.json();
    const data = await getPopulationData(postcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
