import { getEvChargingStationsbyTowns } from "@/lib/ESfunctions/indevisual";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { town } = await request.json();

    const data = await getEvChargingStationsbyTowns(town);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
