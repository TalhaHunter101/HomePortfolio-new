export const revalidate = 0;
import { getAgentDataById } from "@/lib/ESfunctions/agent/agentsearch";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { agentId } = await request.json();

    const data = await getAgentDataById(agentId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
