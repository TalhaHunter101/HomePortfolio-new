import { marketComparision } from "@/lib/ESfunctions/indevisual";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { query } = await request.json();
    
    
    const data = await marketComparision(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
