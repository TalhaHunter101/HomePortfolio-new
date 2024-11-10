
import { fetchSimilarListings } from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const listing = await request.json();
    const similarListings = await fetchSimilarListings(listing.poscode);
    return NextResponse.json(similarListings, { status: 200 });
  } catch (error) {
    console.error("Error fetching similar listings:", error);
    return NextResponse.json({ error: "Failed to fetch similar listings" }, { status: 500 });
  }
}