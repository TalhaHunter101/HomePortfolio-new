"use client";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { RentHomeValCard } from "../PropertyPageCards/RentHomeValCard";
import { LocationCard } from "../PropertyPageCards/locationCard";
import { SchoolsCard } from "../PropertyPageCards/SchoolCard";
import { FamilyCard } from "../PropertyPageCards/FamilyCard";
import { PlanningCard } from "../PropertyPageCards/PlanningCard";
import { CrimeCard } from "../PropertyPageCards/CrimeCard";
import { AirQualityCard } from "../PropertyPageCards/AirQualityCard";
import { EPCCard } from "../PropertyPageCards/EPCcard";
import MainCard from "../Property/MainCard";
import ThumbnailCard from "../Property/ThumbnailCard";

function PropertyDisplay({ listingData, params }) {
  const [rentEstimate, setRentEstimate] = useState(0);
  const [schoolData, setSchoolData] = useState([]);
  const [pricePaidData, setPricePaidData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to manage UI while fetching

  const uprn = params?.uprn || "123456";
  const fullAdress = listingData?.full_address || "N.A";
  const formattedPrice =
    listingData?.history?.historicSales[0]?.price ||
    listingData?.saleEstimate?.currentPrice ||
    "N.A";
  const bedrooms = listingData?.attributes?.bedrooms || "N.A";
  const bathrooms = listingData?.attributes?.bathrooms || "N.A";
  const squareFeet = listingData?.analyticsTaxonomy?.sizeSqFeet || "N.A";
  const builtYear = listingData?.attributes?.builtYear || "N.A";
  const postcode = listingData?.ref_postcode || "N.A";
  const newData = {
    counts: { numBedrooms: bedrooms, numBathrooms: bathrooms },
    analyticsTaxonomy: listingData?.analyticsTaxonomy,
  };

  const locationData = {
    address: fullAdress,
    location: {
      coordinates: {
        latitude: listingData?.address?.latitude || 0,
        longitude: listingData?.address?.longitude || 0,
      },
    },
  };

  const mainImages = [
    "https://lc.zoocdn.com/2d792e1a98ef15571de593c32265cae6c5b7810d.jpg",
    "https://lc.zoocdn.com/4090dc638a2ba33e6db6a980e4e5e210d9924f8b.jpg",
    "https://lc.zoocdn.com/33af57fb01f4c76627939ad4fa9603eb16e493d2.jpg",
    "https://lc.zoocdn.com/1a1a9416471a880bc713c96323ba08970dddf238.jpg",
    "https://lc.zoocdn.com/16d1fba8f64291bb2158f07c1f751773cebaf0fc.jpg",
  ];
  const thumbnailImages = [
    "https://lc.zoocdn.com/2d792e1a98ef15571de593c32265cae6c5b7810d.jpg",
    "https://lc.zoocdn.com/4090dc638a2ba33e6db6a980e4e5e210d9924f8b.jpg",
    "https://lc.zoocdn.com/33af57fb01f4c76627939ad4fa9603eb16e493d2.jpg",
    "https://lc.zoocdn.com/1a1a9416471a880bc713c96323ba08970dddf238.jpg",
  ];

  useEffect(() => {
    const getSchoolData = async () => {
      try {
        const response = await fetch(`/api/indevisual/get-schools-by-postcode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode }),
        });

        if (response.ok) {
          const result = await response.json();
          setSchoolData(result);
        }
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    const getPricePaidData = async () => {
      try {
        const response = await fetch("/api/indevisual/get-price-paid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: listingData?.analyticsTaxonomy?.postTownName || "N.A",
          }),
        });

        if (response.ok) {
          const resultData = await response.json();
          setPricePaidData(resultData);
        }
      } catch (error) {
        console.error("Error fetching price paid data:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await getSchoolData();
      await getPricePaidData();
      setLoading(false);
    };

    fetchData();
  }, [listingData, postcode]);

  return (
    <>
      <div className="max-w-full mx-auto mt-24 px-4">
        {/* Top Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-6 w-full">
          <div className="lg:col-span-7">
            {mainImages && <MainCard images={mainImages} />}
          </div>
          <div className="hidden lg:grid lg:col-span-3 grid-cols-1 md:grid-cols-2 gap-4">
            {thumbnailImages?.map((imageUrl, index) => (
              <ThumbnailCard key={index} imageUrl={imageUrl} />
            ))}
          </div>
        </div>

        {/* Property Details Header */}
        <div className="p-4 flex flex-col lg:flex-row justify-between w-full mt-6">
          <div className="flex-1">
            <div className="mb-4 text-center lg:text-left">
              <Chip
                startContent={<Icon icon="mdi:checkbox-marked-circle-outline" />}
                radius="lg"
                variant="bordered"
                color="warning"
                size="sm"
                className="mb-2"
              >
                Currently Off-Market
              </Chip>
              <h3 className="font-bold text-2xl">{fullAdress}</h3>
              <div className="text-gray-500 text-sm mt-1">
                Single Family | Built {builtYear}
              </div>
            </div>
          </div>

          <div className="flex flex-row space-x-4 lg:space-x-8 mt-4 lg:mt-0">
            <div className="text-center">
              <h3 className="font-semibold text-2xl lg:text-4xl">{bedrooms}</h3>
              <p className="text-xs lg:text-sm text-gray-600">Beds</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-2xl lg:text-4xl">{bathrooms}</h3>
              <p className="text-xs lg:text-sm text-gray-600">Baths</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-2xl lg:text-4xl">{squareFeet}</h3>
              <p className="text-xs lg:text-sm text-gray-600">Sq Ft</p>
            </div>
          </div>
        </div>

        {/* Full-width Rent Estimate using RentHomeValCard */}
        <div className="mt-6 w-full">
          <RentHomeValCard
            uprn={uprn}
            data={newData}
            setRentEstimate={setRentEstimate}
          />
        </div>

        {/* Rent Estimate */}
        

        {/* LocationCard */}
        <div className="mt-6 w-full">
          <LocationCard
            data={locationData}
            postcode={postcode}
            schoolData={schoolData}
          />
        </div>

        <div className="mt-6 w-full">
          <SchoolsCard schoolData={schoolData} />
        </div>

        <div className="mt-6 w-full">
          <FamilyCard postcode={postcode} city={listingData?.analyticsTaxonomy?.postTownName || "N.A"} />
        </div>

        <div className="mt-6 w-full">
          <PlanningCard postcode={postcode} />
        </div>

        <div className="mt-6 w-full">
          <CrimeCard postcode={postcode} />
        </div>
        <div className="mt-6 w-full">
          <AirQualityCard
            latitude={listingData?.address?.latitude || 0}
            longitude={listingData?.address?.longitude || 0}
          />
        </div>
        
        <div className="mt-6 w-full">
          <EPCCard uprn={uprn} />
        </div>
      </div>
    </>
  );
}

export default PropertyDisplay;
