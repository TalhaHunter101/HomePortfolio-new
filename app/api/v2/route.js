
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    return NextResponse.json("New Version 2", { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
