"use client";
import React, { useEffect, useState } from "react";
import { Button, Chip, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { BasicInfoCard } from "../PropertyPageCards/basic";
import { PriceHistory } from "../PropertyPageCards/PriceHistory";
import { MarketComparisonCard } from "../PropertyPageCards/MarketComparison";
import { formatCurrency } from "@/utils/Helper";
import { useListingStore } from "@/store/listingStore";


function PropertyDisplay({ listingData, params }) {

const fullAdress = listingData?.full_address
const formattedPrice = listingData?.saleEstimate?.currentPrice



  

  const bedrooms =
    listingData?.attributes?.bedrooms ||
    
    null;
  const bathrooms =
    listingData?.attributes?.bathrooms ||
   
    null;

  const [schoolData, setSchoolData] = useState([]);
  const [pricePaidData, setPricePaidData] = useState([]);
  const [rentEstimate, setRentEstimate] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);



  useEffect(() => {
    const getSchoolData = async () => {
      try {
        const response = await fetch(`/api/indevisual/get-schools-by-postcode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode: listingData?.ref_postcode }),
        });

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
        console.log(error);
      }
    };

    // getSchoolData();
    // getPricePaidData();
  }, [listingData]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="max-w-[87rem] mt-16 mx-auto flex flex-col items-center justify-center">
        <div className="p-4 flex items-center justify-between w-full">
          <Button size="lg" variant="flat" className="bg-transparent">
            <Icon icon="mdi:keyboard-arrow-left" />
            Back to {params.id}
          </Button>
          <div className="flex space-x-2">
            <Button size="lg" className="bg-transparent">
              <Icon icon="mdi:heart-outline" />
              Like
            </Button>
            <Button size="lg" className="bg-transparent">
              <Icon icon="bx:share" />
              Share
            </Button>
          </div>
        </div>

        
        <div className=" p-4 w-full">
          <div className="lg:col-span-7 max-w-screen md:block flex items-center justify-center">
          
           
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhvdXNlfGVufDB8fHx8MTY3MjEyOTc4Mw&ixlib=rb-1.2.1&q=80&w=1080"
                alt="Beautiful House"
                width={1500}
                className="h-96   object-cover"
              />
            
          </div>
       
        </div>

        {/* Property Details */}
        <div className="p-4 flex justify-between w-full">
          <div className="flex-1">
          <div className="mb-4 flex items-center relative">
             
              <div className="flex-1 text-left">
             <Chip  
             startContent={<Icon icon="mdi:checkbox-marked-circle-outline" />}
             radius="lg"
        variant="bordered"
       color="danger" className="bg-red-200 mb-2">
                Sold Out
              </Chip>   
               <h3 className="font-bold text-4xl">£{formattedPrice}</h3>
                <span className="font-bold text-sm">
                  {fullAdress || listingData?.address},
                </span>
                <span className="font-bold text-gray-400 text-sm">
                  {" "}
                  {/* {listingData?.area} */}
                </span>
              </div>
              <div className="flex flex-row ml-[auto] mr-8 space-x-8">
                <div className="">
                  <h3 className="font-semibold text-4xl">{bedrooms}</h3>
                  <p className="text-sm text-gray-600">beds</p>
                </div>
                <div className="">
                  <h3 className="font-semibold text-4xl">{bathrooms}</h3>
                  <p className="text-sm text-gray-600">baths</p>
                </div>
                {/* <div className="">
                  <h3 className="font-semibold text-4xl"> */}
                    {/* {formatedSqft || "NA"} */}
                  {/* </h3>
                  <p className="text-sm text-gray-600">sqft</p>
                </div> */}
              </div>
            </div>
            <div>
              {/* <p className="text-sm font-bold">{listingData?.title}</p> */}
              <div className="pr-4 pt-4">
                <Button
                  size="lg"
                  className="w-full bg-neutral shadow-sm border rounded-md font-bold text-gray-600"
                >
                  Contact agent
                </Button>
              </div>

            </div>

            {/* Basic Info Card */}
            <div id="basics">
              {/* <BasicInfoCard {...listingData} title="The Basics" /> */}
            </div>

            {/* Price History Card */}
            <div id="pricehistory">
              {/* <PriceHistory
                {...listingData}
                title="Price History"
                pricePaidData={pricePaidData}
              /> */}
            </div>

            {/* Market Comparison Card */}
            <div id="marketcomparison">
              {/* <MarketComparisonCard
                {...listingData}
                title="Market Comparison"
                pricePaidData={pricePaidData}
                propertyPrice={listingData?.analyticsTaxonomy?.price}
                uprn={listingData?.location?.uprn}
                postcode={listingData?.ref_postcode}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDisplay;
