import { getHomedataByYears } from "@/lib/ESfunctions/indevisual";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { uprn } = await request.json();
    
    
    const data = await getHomedataByYears(uprn);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
