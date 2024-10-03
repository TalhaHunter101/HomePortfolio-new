import {
  fetchListingsProperty,
  searchAndFilterListingsProperty,
  searchListingsProperty,
} from "@/lib/ESfunctions/listings";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const data = await fetchListingsProperty();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
export async function POST(request) {
  try {
    const { searchValue } = await request.json();
    const data = await searchListingsProperty(searchValue);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
// export async function POST(request) {
//   try {
//     const { searchValue, filters } = await request.json();
//     const data = await searchAndFilterListingsProperty(searchValue, filters);
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.log("error is", error);
//     return NextResponse.json("Error", { status: 500 });
//   }
// }
