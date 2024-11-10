// "use client";
// import React, { useEffect, useState, useRef } from "react";

import Footer from "@/components/common/Footer/Footer";

import PropertyDisplay from "@/components/SoldPrperty/SoldPropertyDisplay";
// import { Spinner } from "@nextui-org/react";
// import { marketInfoStore } from "@/store/listingStore";

export async function generateMetadata({ params }) {
  const uprn = params.uprn.split("%3D")[1];
  const { res } = await getData(uprn);

  if (!res || !res._source) {
    return {
      title: "Homeprotfolio",
      openGraph: {
        title: "Homeprotfolio",
      },
      description: "", // Set default description if no data
    };
  }

  const fullAddress = res._source.full_address || "Homeprotfolio property";
  const title =
    fullAddress.length > 60
      ? `${fullAddress.substring(0, 60)}...`
      : fullAddress;

  const description = res._source.full_address || "";

  return {
    title,
    openGraph: {
      title,
    },
    description,
  };
}

async function getData(uprn) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/uprn/get-house-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uprn: uprn }),
    }
  );

  const res = await response.json();
  return { res };
}

export default async function PropertyPage({ params }) {
  const uprn = params.uprn.split("%3D")[1];
  const { res } = await getData(uprn);

  return (
    <>
      {/* {isDataLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner className="mt-20" size="lg" />
        </div>
      ) : (
      )} */}
      <PropertyDisplay listingData={res?._source} params={params} />

      {/* <PropertyDisplay listingData={listingDatasa} params={params} /> */}
      <Footer />
    </>
  );
}
