"use client";
import React, { useEffect, useState, useRef } from "react";

import Footer from "@/components/common/Footer/Footer";

import PropertyDisplay from "@/components/Property/PropertyDisplay";
import { Spinner } from "@nextui-org/react";
import { marketInfoStore } from "@/store/listingStore";



export default function PropertyPage({ params }) {
  const id = params.id.split('%3D')[1];  


  const [listingData, setlistingData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { resetMarketInfo } = marketInfoStore();

  useEffect(() => {
    const fetchDatabyListId = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch("/api/indevisual/get-listing-by-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listingId: id }),
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
  }, [params.id, resetMarketInfo]) ;
 
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
