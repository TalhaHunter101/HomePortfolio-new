"use client";
import React, { useEffect, useState, useRef } from "react";

import Footer from "@/components/common/Footer/Footer";

import PropertyDisplay from "@/components/Property/PropertyDisplay";
import { Spinner } from "@nextui-org/react";

export default function PropertyPage({ params }) {
  const listingDatasa = [
    {
      address: "Empire Reach, 4 Dowells Street",
      area: "London SE10",
      agent: {
        logoUri: "https://st.zoocdn.com/zoopla_static_agent_logo_(752658).png",
        branchId: "31334",
        branchName: "LiFE Residential - Greenwich",
        phone: "020 3463 0317",
      },
      attributes: {
        bedrooms: 1,
        bathrooms: 1,
        livingRooms: 1,
      },
      flag: "Just added",
      highlights: [],
      imageUris: [
        "https://lid.zoocdn.com/645/430/a08c736ce5863ea7e1d28e8834ef032d25011549.jpg",
        "https://lid.zoocdn.com/645/430/b7d352c4100ea22ee0162f31be3f82de2ac11fd9.jpg",
        "https://lid.zoocdn.com/645/430/466e8ce79cbe34a5e2e8124f88cd00b1d10e4292.jpg",
        "https://lid.zoocdn.com/645/430/2a740be0ac3200de968f6ef4a9c717d1da2e71ba.jpg",
        "https://lid.zoocdn.com/645/430/7a3009780254e834419408b627968011e110f916.jpg",
        "https://lid.zoocdn.com/645/430/e2e2d7eafeeedd44898ea415ba5b903944703329.jpg",
        "https://lid.zoocdn.com/645/430/a698c47f9b3943190dce49b9114ebf685e7b220e.jpg",
        "https://lid.zoocdn.com/645/430/f3e6db80ed786d8b65abe9c0606ce09860a11716.jpg",
        "https://lid.zoocdn.com/645/430/50082152336b5553adcf53570316232bf0220b37.jpg",
        "https://lid.zoocdn.com/645/430/40af41626ae5ce9382405a6f375a1ef10b14ebc7.jpg",
        "https://lid.zoocdn.com/645/430/45d137179ac6ff27c40a16426099bb01c6f3c203.jpg",
      ],
      isExpired: false,
      isFeatured: false,
      isPremium: false,
      listingId: "67980248",
      location: {
        coordinates: {
          latitude: 51.48246,
          longitude: -0.017057,
        },
      },
      pricing: {
        value: 400000,
        qualifier: "",
        qualifierLabel: "",
        label: "£400,000",
      },
      availability: {
        label: "Open",
        day: "Monday",
        date: "(8/10)",
        time: [
          {
            from: "10:00",
            to: "18:00",
          },
        ],
      },
      dimensions: {
        sqft: "1200",
      },
      publicationStatus: "Live",
      tags: [
        {
          label: "Leasehold",
        },
      ],
      title: "1 bed flat for sale",
      grossYields: 7.2,
      rentEstimate: 1300,
      roi: 2.5,
      cashOnCash: 13.2,
    },
  ];

  const [listingData, setlistingData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchDataZooplaHouse = async () => {
      const url = `https://zoopla.p.rapidapi.com/house-prices/v2/detail?uprn=${params.id}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8",
          "x-rapidapi-host": "zoopla.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        setlistingData(result?.data?.property);

        return result;
      } catch (error) {
        console.error("Error fetching Zoopla house data:", error);
        throw new Error("Failed to fetch data from Zoopla");
      }
    };
    const fetchDatabyUprn = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch("/api/property/get-property-by-uprn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uprn: params.id }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data", data);

          if (data.length === 0) {
            const zooplaData = await fetchDataZooplaHouse();
            console.log("Zoopla data", zooplaData);
          }

          setlistingData(data);
          setIsDataLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDatabyUprn();
  }, [params.id]);

  return (
    <>
      {/* {isDataLoading ? (
        <Spinner />
      ) : (
        <PropertyDisplay listingData={listingDatasa} params={params} />
      )} */}

      <PropertyDisplay listingData={listingDatasa} params={params} />
      <Footer />
    </>
  );
}
