import { getListingByListingId } from "@/lib/ESfunctions/newsearch";
import { getPostcodeSectorPolygon } from "@/lib/ESfunctions/geospatial";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { listingId } = await request.json();

    const data = await getListingByListingId(listingId);
    const postcode = data?._source?.ref_postcode;

    let geomData = null;
    if (postcode) {
      const sectorResults = await getPostcodeSectorPolygon(postcode);
      if (sectorResults?.hits?.hits?.length > 0) {
        geomData = sectorResults.hits.hits[0]._source.polygon;
      }
    }

    return NextResponse.json(
      {
        listing: data,
        geom: geomData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json("Error", { status: 500 });
  }
}
