"use client";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { RentHomeValCard } from "../PropertyPageCards/RentHomeValCard";
import { LocationCard } from "../PropertyPageCards/locationCard"; 

function PropertyDisplay({ listingData, params }) {
  console.log("listingData", listingData);
  const [rentEstimate, setRentEstimate] = useState(0);
  const [schoolData, setSchoolData] = useState([]); 

  
  const uprn = params?.uprn || "123456"; 

  // Hardcoded values for demonstration
  const fullAdress = listingData?.full_address
  const formattedPrice = listingData?.history?.historicSales[0]?.price || listingData?.saleEstimate?.currentPrice
  
  
  
    
  
    const bedrooms =
      listingData?.attributes?.bedrooms ||
      
      null;
    const bathrooms =
      listingData?.attributes?.bathrooms ||
     
      null;
  const squareFeet = listingData?.analyticsTaxonomy?.sizeSqFeet || null; 
  const builtYear = 1962; // Hardcoded year built
  const newData = {
    counts: { numBedrooms: bedrooms, numBathrooms: bathrooms },
    // analyticsTaxonomy: { sizeSqFeet: 1050 },
    analyticsTaxonomy: listingData?.analyticsTaxonomy,
  }; 

  const [pricePaidData, setPricePaidData] = useState([]);
  const locationData = {
    address: fullAdress,
    location: {
      coordinates: {
        latitude:listingData?.address?.latitude,
            longitude:listingData?.address?.longitude
      },
    },
  };

  useEffect(() => {
    const getSchoolData = async () => {
      try {
        const response = await fetch(
          `/api/indevisual/get-schools-by-postcode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postcode: listingData?.ref_postcode }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          setSchoolData(result);
        }
      } catch (error) {
        console.log("error is", error);
      }
    };

    const getPricePaidData = async () => {
      try {
        const result = await fetch("/api/indevisual/get-price-paid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: listingData?.analyticsTaxonomy?.postTownName,
          }),
        });

        if (result.ok) {
          const resultData = await result.json();
          setPricePaidData(resultData);
        }
      } catch (error) {
        console.log("error is", error);
      }
    };

    getSchoolData();
    getPricePaidData();
  }, [listingData]);

  const postcode = listingData?.ref_postcode; 

  return (
    <>
      <div className="max-w-full mx-auto mt-48 px-4">
        {/* Property Details Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">
            <Chip
              startContent={<Icon icon="mdi:checkbox-marked-circle-outline" />}
              radius="lg"
              variant="bordered"
              color="warning"
              size="sm"
            >
              Currently Off-Market
            </Chip>
          </div>
          <h3 className="font-bold text-2xl">{fullAdress}</h3>
          {/* <h3 className="font-bold text-2xl">£{formattedPrice}</h3> */}
          <div className="text-gray-500 text-sm mt-1">
            Single Family | {bedrooms || 'N.A'} Beds | {bathrooms || 'N.A'} Bath | {squareFeet || 'N.A'} sq.ft. | Built {builtYear || 'N.A'}
          </div>
          {/* <div className="flex justify-center space-x-4 text-sm mt-2">
            <span>
              Rent alert:{" "}
              <Chip startContent={<Icon icon="fluent-emoji-flat:green-circle" />}
        variant="bordered"
        color="success" size="sm">
                ON
              </Chip>
            </span>
            <span>
              Market updates:{" "}
              <Chip startContent={<Icon icon="fluent-emoji-flat:green-circle" />}
        variant="bordered"
        color="success" size="sm">
                ON
              </Chip>
            </span>
          </div> */}
        </div>

        {/* Full-width Rent Estimate using RentHomeValCard */}
        <div className="mt-6 w-full">
          <RentHomeValCard
            uprn={uprn} 
            data={newData}
            setRentEstimate={setRentEstimate} 
          />
        </div>

        {/*  rent estimate */}
        <div className="mt-6 text-center">
          <h4 className="text-xl font-bold">
            Current Rent Estimate: £{rentEstimate}
          </h4>
        </div>

        {/*  LocationCard */}
        <div className="mt-6 w-full">
          <LocationCard
         data={locationData}
            postcode={postcode}
            schoolData={schoolData} 
           
          />
        </div>
      </div>
    </>
  );
}

export default PropertyDisplay;
