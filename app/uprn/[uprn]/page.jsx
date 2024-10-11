"use client";
import React, { useEffect, useState, useRef } from "react";

import Footer from "@/components/common/Footer/Footer";

import PropertyDisplay from "@/components/SoldPrperty/SoldPropertyDisplay";
import { Spinner } from "@nextui-org/react";
import { marketInfoStore } from "@/store/listingStore";

export default function PropertyPage({ params }) {

  const [listingData, setlistingData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { resetMarketInfo } = marketInfoStore();


  useEffect(() => {
    const fetchDatabyListId = async () => {
      try {
        const uprn = params.uprn.split('%3D')[1];
        setIsDataLoading(true);
        const response = await fetch("/api/uprn/get-house-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uprn: uprn }),
        });

        if (response.ok) {
          const data = await response.json();
          setlistingData(data?._source);
          setIsDataLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDatabyListId();

    return () => {
      resetMarketInfo();
    };
  }, [params.id, resetMarketInfo]);

  return (
    <>
      {isDataLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner className="mt-20" size="lg" />
        </div>
      ) : (
        <PropertyDisplay listingData={listingData} params={params} />
      )}

      {/* <PropertyDisplay listingData={listingDatasa} params={params} /> */}
      <Footer />
    </>
  );
}
