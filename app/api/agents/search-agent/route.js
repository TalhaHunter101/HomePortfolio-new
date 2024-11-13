import { searchAgentWithPostcode } from "@/lib/ESfunctions/agent/agentsearch";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { postcode } = await request.json();

    const data = await searchAgentWithPostcode(postcode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
