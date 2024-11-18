import { getListingByListingId } from "@/lib/ESfunctions/newsearch";
import { NextResponse } from "next/server";
import { useFetchBankRate } from "@/utils/Fetchfunctions/useFetchBankRate";

export async function POST(request) {
  try {
    const { listingId } = await request.json();

    const data = await getListingByListingId(listingId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate";
    const classname = "stat-figure";
    const data = await useFetchBankRate(url, classname);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
