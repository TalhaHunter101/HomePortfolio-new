import { getPeopleGenderData } from "@/lib/ESfunctions/demograohic";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { postcode } = await request.json();
    
    
    const data = await getPeopleGenderData(postcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
