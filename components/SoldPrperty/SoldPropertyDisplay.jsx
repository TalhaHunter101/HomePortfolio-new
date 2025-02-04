"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MainCard from "../Property/MainCard";
// import ThumbnailCard from "./ThumbnailCard";
import { Waypoint } from "react-waypoint";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { mcards } from "@/public/dummydata/listingData";
import { BasicInfoCard } from "../PropertyPageCards/basic";
import { ReachOutCard } from "../PropertyPageCards/ReachOutCard";
import { PriceHistory } from "../PropertyPageCards/PriceHistory";
import { LocationCard } from "../PropertyPageCards/locationCard";
import { GoodTimeToBuy } from "../PropertyPageCards/TimeCard";
import { PriceTrackerCard } from "../PropertyPageCards/priceTracker";
import { MarketComparisonCard } from "../PropertyPageCards/MarketComparison";
import { SchoolsCard } from "../PropertyPageCards/SchoolCard";
import { FamilyCard } from "../PropertyPageCards/FamilyCard";
import { NearbyCard } from "../PropertyPageCards/NearbyCard";
import { PublicTransportCard } from "../PropertyPageCards/PublicTransport";
import { RecentlySoldCard } from "../PropertyPageCards/RecentlySoldCard";
import { CrimeCard } from "../PropertyPageCards/CrimeCard";
import { AirQualityCard } from "../PropertyPageCards/AirQualityCard";
import { NoiseLevelCard } from "../PropertyPageCards/NoiseLevelCard";
import {
  NeighbourCard,
  NeighbrourCard,
} from "../PropertyPageCards/neighbourCard";
import { HomeTypesCard } from "../PropertyPageCards/HomeTypesCard";
import { DreamHouseCard } from "../PropertyPageCards/DreamHouseCard";
import Component from "@/app/home-valuation/page";
import { PlanningCard } from "../PropertyPageCards/PlanningCard";
import Calculation from "../PropertyPageCards/Calculator/Calculation";
import { EPCCard } from "../PropertyPageCards/EPCcard";
import { EVCard } from "../PropertyPageCards/EVcards";
import { RentHomeValCard } from "../PropertyPageCards/RentHomeValCard";
import { formatCurrency } from "@/utils/Helper";
import { useListingStore } from "@/store/listingStore";
import MarketInfoPage from "../PropertyPageCards/MarketInfo/MarketInfoPage";
import DataShows from "../PropertyPageCards/DataShows";
import DataNeighbour from "../PropertyPageCards/DataNeighbour";
import ThumbnailCard from "../Property/ThumbnailCard";

function PropertyDisplay({ listingData, params }) {
  const [walkScore, setWalkScore] = useState(null);
  const [listingWalkScore, setListingWalkScore] = useState(null);
  const [busData, setBusData] = useState([]);
  const [busLocations, setBusLocations] = useState([]);
  const [sqfeetData, setSetsqfeetData] = useState("");
  // const price = listingData?.pricing?.internalValue;

  const { squerfoot, fullAddress } = useListingStore();
  // const uprn = params?.uprn || "123456";
  const uprn = params.uprn.split("%3D")[1];
  const fullAdress = listingData?.full_address || "N.A";
  const price =
    listingData?.history?.historicSales[0]?.price ||
    listingData?.saleEstimate?.currentPrice ||
    "N.A";
  const bedrooms = listingData?.attributes?.bedrooms || "N.A";
  const bathrooms = listingData?.attributes?.bathrooms || "N.A";
  const squareFeet = listingData?.analyticsTaxonomy?.sizeSqFeet || "N.A";
  const builtYear = listingData?.attributes?.builtYear || "N.A";
  const postcode = listingData?.ref_postcode || "N.A";
  // const newData = {
  //   counts: { numBedrooms: bedrooms, numBathrooms: bathrooms },
  //   analyticsTaxonomy: listingData?.analyticsTaxonomy,
  // };
  const town = fullAdress ? fullAdress.split(", ")[2] : null;
  const locationData = {
    address: fullAdress,
    location: {
      coordinates: {
        latitude: listingData?.address?.latitude || 0,
        longitude: listingData?.address?.longitude || 0,
      },
    },
    analyticsTaxonomy: {
      outcode: listingData?.address?.outcode,
    },
    adTargeting: {
      location: listingData?.address?.postcode,
      countyAreaName: listingData?.address?.country,
    },
    pricing: {
      internalValue: price,
    },
  };

  const formattedPrice = formatCurrency(price);
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
  const newData = {
    counts: { numBedrooms: bedrooms, numBathrooms: bathrooms },

    analyticsTaxonomy: listingData?.analyticsTaxonomy,
  };

  // getSchoolData();
  // getPricePaidData();

  //   const getPricePaidData = async () => {
  //     try {
  //       const response = await fetch("/api/indevisual/get-price-paid", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           city: listingData?.analyticsTaxonomy || "N.A",
  //         }),
  //       });

  //       if (response.ok) {
  //         const resultData = await response.json();
  //         setPricePaidData(resultData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching price paid data:", error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     setLoading(true);
  //     await getSchoolData();
  //     await getPricePaidData();
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [listingData, postcode]);

  let pathname = usePathname();
  let hashId = pathname.split("#")[1];

  const [openSection, setOpenSection] = useState(hashId);
  const [hoveredSubElement, setHoveredSubElement] = useState(null);
  const [schoolData, setSchoolData] = useState([]);
  const [pricePaidData, setPricePaidData] = useState([]);
  const [rentEstimate, setRentEstimate] = useState(0);
  const [rentData, setRentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const formatedSqft = formatCurrency(
  //   listingData?.analyticsTaxonomy?.sizeSqFeet || squerfoot
  // );

  useEffect(() => {
    const getSchoolData = async () => {
      if (!listingData?.ref_postcode) return; // Ensure there's a valid postcode before making the API call

      try {
        const response = await fetch(
          `/api/indevisual/get-schools-by-postcode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postcode: listingData.ref_postcode }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          setSchoolData(result);
        }
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    getSchoolData();
  }, [listingData?.ref_postcode]);

  // const getPricePaidData = async () => {
  //   try {
  //     const result = await fetch("/api/indevisual/get-price-paid", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         city: listingData?.analyticsTaxonomy?.postTownName,
  //       }),
  //     });

  //     if (result.ok) {
  //       const resultData = await result.json();
  //       setPricePaidData(resultData);
  //     }
  //   } catch (error) {}
  // };

  const getRentData = async () => {
    try {
      setIsLoading(true); // Start loading state
      const result = await fetch("/api/indevisual/get-rent-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outcode: listingData?.ref_postcode?.split(" ")[0],
        }),
      });

      if (result.ok) {
        const resultData = await result.json();
        setRentData(resultData);
      }
    } catch (error) {
      console.error("Error fetching rent data:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  useEffect(() => {
    if (listingData?.ref_postcode) {
      getRentData();
    }
  }, [listingData?.ref_postcode]);
  // }, [listingData]);

  useEffect(() => {
    const fetchEPCData = async (uprn) => {
      try {
        const response = await fetch("/api/indevisual/get-epc-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uprn }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch EPC data");
        }

        const { epcData } = await response.json();

        const address1 = epcData[0]?._source?.ADDRESS1 || "";
        const address2 = epcData[0]?._source?.ADDRESS2 || "";
        const address3 = epcData[0]?._source?.ADDRESS3 || "";
        const postcode = epcData[0]?._source?.POSTCODE || "";
        const town = epcData[0]?._source?.POSTTOWN || "";

        const fullAddress = [address1, address2, address3, postcode, town]
          .filter(Boolean)
          .join(", ");

        const squerfootInMeters = epcData[0]?._source?.TOTAL_FLOOR_AREA;
        const squerfootInFeet = parseInt(squerfootInMeters) * 10.7639;
        setSetsqfeetData(squerfootInFeet.toFixed(0) || "NA");

        return {
          totalFloorArea: epcData[0]?._source?.TOTAL_FLOOR_AREA || null,
          fullAddress,
        };
      } catch (error) {
        console.error(`Error fetching EPC data for UPRN ${uprn}:`, error);
        return null;
      }
    };
    if (uprn) {
      fetchEPCData(uprn);
    }
  }, [uprn]);

  const navElements = [
    {
      name: "All about the Home",
      id: "about-home",
      subElements: [
        {
          name: "The Basics",
          icon: "mdi:home",
          bgColor: "bg-pink-200",
          id: "basics",
          Component: BasicInfoCard,
        },
        {
          name: "Location",
          icon: "mdi:map-marker",
          bgColor: "bg-pink-300",
          id: "location",
          Component: LocationCard,
        },
        {
          name: "Reach Out to us",
          icon: "mdi:email",
          bgColor: "bg-pink-400",
          id: "reachout",
          Component: ReachOutCard,
        },
      ],
    },

    {
      name: "Around the Neighborhood",
      id: "around-neighborhood",
      subElements: [
        {
          name: "How are the Schools?",
          icon: "mdi:school",
          bgColor: "bg-purple-200",
          id: "schools",
          Component: SchoolsCard,
        },

        {
          name: "All about the Home",
          icon: "mdi:account-group",
          bgColor: "bg-purple-300",
          id: "goodplace",
          Component: DataShows,
        },

        {
          name: "Around the Neighborhood",
          icon: "mdi:person-details",
          bgColor: "bg-purple-300",
          id: "neighbors",
          Component: DataNeighbour,
        },

        {
          name: "Can I raise a family here?",
          icon: "mdi:account-group",
          bgColor: "bg-purple-300",
          id: "family",
          Component: FamilyCard,
        },
        {
          name: "What's nearby?",
          icon: "mdi:map",
          bgColor: "bg-purple-400",
          id: "nearby",
          Component: NearbyCard,
        },
        {
          name: "Public Transport",
          icon: "mdi:bus",
          bgColor: "bg-purple-500",
          id: "publictransport",
          Component: PublicTransportCard,
        },
        {
          name: "EV Charging Stations",
          icon: "mdi:ev-station",
          bgColor: "bg-purple-500",
          id: "EvChargingStations",
          Component: EVCard,
        },
      ],
    },
    {
      name: "Financials",
      id: "financials",
      subElements: [
        {
          name: "Rent & Home Valuation",
          icon: "hugeicons:chart-evaluation",
          bgColor: "bg-green-200",
          id: "renthomevaluation",
          Component: RentHomeValCard,
        },
        {
          name: "Price history",
          icon: "mdi:history",
          bgColor: "bg-green-200",
          id: "pricehistory",
          Component: PriceHistory,
        },
        {
          name: "Is this a good time to buy?",
          icon: "mdi:chart-line",
          bgColor: "bg-green-300",
          id: "goodtimetobuy",
          Component: GoodTimeToBuy,
        },
        {
          name: "Price tracker",
          icon: "solar:tag-price-bold",
          bgColor: "bg-green-400",
          id: "pricetracker",
          Component: PriceTrackerCard,
        },
        {
          name: "Market Comparison",
          icon: "mdi:scale-balance",
          bgColor: "bg-green-500",
          id: "marketcomparison",
          Component: MarketComparisonCard,
        },
        {
          name: "Market Info",
          icon: "icon-park-outline:market-analysis",
          bgColor: "bg-green-500",
          id: "marketinfo",
          Component: MarketInfoPage,
        },
        {
          name: "Know your Home Options",
          icon: "carbon:home",
          bgColor: "bg-green-500",
          id: "knowyourhometypes",
          Component: HomeTypesCard,
        },
        {
          name: "right time to buy?",
          icon: "fluent:data-trending-16-filled",
          bgColor: "bg-green-500",
          id: "dreamhouse",
          Component: DreamHouseCard,
        },
        {
          name: "Calculate potential returns",
          icon: "solar:calculator-minimalistic-bold",
          bgColor: "bg-green-500",
          id: "calculateyourdreamhouse",
          Component: Calculation,
        },
      ],
    },
    {
      name: "Quality of Life",
      id: "quality-life",
      subElements: [
        {
          name: "Planning Applications",
          icon: "mdi:planner",
          bgColor: "bg-red-200",
          id: "Planning",
          Component: PlanningCard,
        },
        {
          name: "Crime Rate",
          icon: "mdi:shield-alert",
          bgColor: "bg-red-200",
          id: "crimerate",
          Component: CrimeCard,
        },
        {
          name: "Is the air quality good?",
          icon: "mdi:weather-windy",
          bgColor: "bg-red-300",
          id: "airquality",
          Component: AirQualityCard,
        },
        {
          name: "How are the noise levels?",
          icon: "mdi:volume-high",
          bgColor: "bg-red-400",
          id: "noiselevels",
          Component: NoiseLevelCard,
        },
        // {
        //   name: "Will I like my neighbors?",
        //   icon: "mdi:account-group",
        //   bgColor: "bg-red-500",
        //   id: "neighbors",
        //   Component: NeighbourCard,
        // },
        {
          name: "Energy Performance Certificate",
          icon: "mdi:account-group",
          bgColor: "bg-red-500",
          id: "EPC",
          Component: EPCCard,
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    if (openSection === id) {
      setOpenSection(null);
    }
    setOpenSection(id);
  };

  const handleMouseEnter = (id) => {
    setHoveredSubElement(id);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleIconClick = () => {
    setIsLiked(!isLiked);
  };

  

  return (
    <>
      <div className="max-w-[87rem] mt-16 mx-auto flex flex-col items-center justify-center">
        <div className="p-4 flex items-center justify-end  w-full hidden md:flex  ">
          <div className="flex  space-x-2">
            <Icon
              icon={isLiked ? "fxemoji:redheart" : "mdi:heart-outline"}
              onClick={handleIconClick}
              className={`text-2xl mt-3 cursor-pointer ${
                isLiked ? "text-red-500" : "text-gray-500"
              }`}
            />
            <Button size="lg" className="bg-transparent">
              <Icon icon="bx:share" />
              Share
            </Button>
          </div>
        </div>

        {/* main div */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-6 w-full">
          <div className="lg:col-span-7">
            {mainImages && <MainCard images={mainImages} />}
          </div>
          <div className="hidden lg:grid lg:col-span-3 grid-cols-1 md:grid-cols-2 gap-4">
            {thumbnailImages &&
              thumbnailImages?.map((imageUrl, index) => (
                <ThumbnailCard key={index} imageUrl={imageUrl} />
              ))}
          </div>
        </div>
        <div className="flex justify-start px-6 gap=4 w-full">
          <Chip color="warning" className="mt-4 text-white font-semibold">
            OFF Market
          </Chip>
        </div>

        {/* lower div */}
        <div className="p-4 flex flex-col lg:flex-row justify-between w-full">
          <div className="flex-1">
            <div className="mb-4">
              <p className="font-bold text-md"></p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white md:hidden m-2">
              {/* This container will only be visible on small screens */}
              <div className="flex items-center justify-between mb-4">
                {/* Price Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    £{formattedPrice}
                  </h3>
                  <span className="text-sm text-gray-600 flex items-center">
                    <Icon
                      icon="mdi:map-marker-outline"
                      className="text-gray-500 mr-1"
                    />
                    {fullAdress || listingData?.address}
                  </span>
                </div>
                {/* Heart and Share Icons */}
              </div>

              {/* Property Details Section */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="text-lg font-semibold">{bedrooms}</h4>
                  <p className="text-xs text-gray-500">Beds</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{bathrooms}</h4>
                  <p className="text-xs text-gray-500">Baths</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    {listingData?.sqft || sqfeetData || "N.A."}
                  </h4>
                  <p className="text-xs text-gray-500">Sq Ft</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-4 flex flex-col space-y-2">
                {/* <div className="flex items-center">
      <Icon icon="mdi:home-outline" className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-700">House for sale</span>
    </div>
    <div className="flex items-center">
      <Icon icon="mdi:map-marker-outline" className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-700">
        {listingData?.area || "Area"}
      </span>
    </div> */}
              </div>

              {/* CTA Buttons */}
              {/* <p className="text-sm  font-bold">{listingData?.title}</p> */}
            </div>

            {/* Existing styles for larger screens */}
            <div className="mb-4 lg:pl-6 flex items-center flex-col lg:flex-row hidden md:flex">
              {/* Original content for larger screens */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-bold text-2xl lg:text-4xl">
                  £{formattedPrice}
                </h3>
                <span className="text-sm font-bold lg:text-base flex items-center">
                  <Icon
                    icon="mdi:map-marker-outline"
                    className="text-gray-500 mr-1"
                  />
                  {fullAdress || listingData?.address}
                </span>
                <span className="font-bold text-gray-400 text-sm lg:text-base">
                  {" "}
                  {listingData?.area}
                </span>
              </div>
              <div className="flex flex-row space-x-4 lg:space-x-8 mt-4 lg:mt-0">
                <div>
                  <h3 className="font-semibold text-2xl lg:text-4xl">
                    {bedrooms}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">beds</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl lg:text-4xl">
                    {bathrooms}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">baths</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl lg:text-4xl">
                    {listingData?.sqft || sqfeetData || squerfoot || "N.A"}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">sqft</p>
                </div>
              </div>
            </div>

            {/* <p className="text-sm pl-6 font-bold hidden md:block">
              {listingData?.title}
            </p> */}

            {navElements.map((element, index) => (
              <React.Fragment key={index}>
                <Waypoint onEnter={() => setOpenSection(element.id)} />

                {element.subElements.map((subElement, subIndex) => (
                  <div
                    className="pl-1"
                    key={subIndex}
                    id={subElement.id}
                    onMouseEnter={() => handleMouseEnter(subElement.id)}
                  >
                    <subElement.Component
                      {...listingData}
                      title={subElement.name}
                      // schoolData={schoolData}
                      city={town}
                      postTownName={
                        listingData?.analyticsTaxonomy?.postTownName
                      }
                      cards={mcards}
                      // data={listingData}
                      pricePaidData={pricePaidData}
                      propertyPrice={formattedPrice || "NA"}
                      // uprn={listingData?.location?.uprn}
                      // postcode={listingData?.ref_postcode}
                      // setRentEstimate={setRentEstimate}
                      rentEstimate={rentEstimate}
                      latitude={listingData?.address?.latitude || 0}
                      longitude={listingData?.address?.longitude || 0}
                      price={formattedPrice || "NA"}
                      area={listingData?.area || "NA"}
                      address={fullAdress}
                      uprn={uprn}
                      // data1={newData}
                      data={locationData}
                      postcode={postcode}
                      schoolData={schoolData}
                      setRentEstimate={setRentEstimate}
                      rentData={rentData}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Sidebar Navigation */}
          <nav className="sticky top-6 p-4 bg-white w-45 h-fit hidden lg:block">
            <div className="w-full h-auto text-sm bg-transparent card flex flex-col relative border-gray-150 bg-gray-100 sm:rounded-lg">
              <div className="py-2 text-foreground h-full w-full overflow-hidden flex-1">
                {navElements.map((element, index) => (
                  <motion.div
                    key={index}
                    className="w-full h-auto text-sm bg-transparent card flex flex-col relative border-gray-150 bg-gray-100 sm:rounded-lg mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="py-2 text-foreground h-full w-full overflow-hidden flex-1">
                      <div className="w-full">
                        <button
                          className="w-full text-left"
                          aria-label=""
                          onClick={() => toggleSection(element.id)}
                        >
                          <h2 className="py-2 text-foreground border-subtle-border transition flex justify-between duration-300 leading-8 text-xl font-bold border-b">
                            {element.name}
                          </h2>
                        </button>
                        <AnimatePresence>
                          {openSection && element.id == openSection && (
                            <motion.div
                              key={openSection}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <motion.ul className="mt-1">
                                {element.subElements.map(
                                  (subElement, subIndex) => (
                                    <motion.li
                                      key={subElement.id}
                                      className={`rounded-lg flex items-center mb-1 text-foreground py-2 px-2 hover:${
                                        subElement.bgColor
                                      } ${
                                        hoveredSubElement === subElement.id
                                          ? subElement.bgColor
                                          : ""
                                      }`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.01 }}
                                    >
                                      <a
                                        href={"#" + subElement.id}
                                        onClick={() =>
                                          handleMouseEnter(subElement.id)
                                        }
                                        className="flex items-center space-x-4 w-full text-md font-semibold"
                                      >
                                        <div
                                          className={`rounded-full h-6 w-6 aspect-square flex items-center justify-center text-black ${subElement.bgColor}`}
                                        >
                                          <Icon icon={subElement.icon} />
                                        </div>
                                        <span className="text-base">
                                          {subElement.name}
                                        </span>
                                      </a>
                                    </motion.li>
                                  )
                                )}
                              </motion.ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default PropertyDisplay;
