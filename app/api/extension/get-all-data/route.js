import { getAllProperData } from "@/lib/ESfunctions/extension/getalldata";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { propertyID } = await request.json();

    const data = await getAllProperData(propertyID);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
