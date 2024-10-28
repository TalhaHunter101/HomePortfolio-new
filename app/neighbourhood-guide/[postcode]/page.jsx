"use client";
import React, { useEffect, useState } from "react";
import DisplayLayout from "@/components/Demographic/Display";
import { Icon } from "@iconify/react"; // Import Iconify for icons
import AutoCompleteSearchNew from "@/components/Demographic/AutoCompleteSearch";
import {
  useNeighbourhoodDemographicStore,
  usePostcodeStore,
  userNewNeighbourhoodData,
} from "@/store/neighbourhoodStore";
import CrimeDisplayLayout from "@/components/Demographic/CrimeDisplay";
import OverviewDisplayLayout from "@/components/Demographic/OverViewDisplay";
import PlanningDisplayLayout from "@/components/Demographic/PlanningDisplay";

// Dummy content for each tab
const TabContent = ({ tab, data }) => {
  switch (tab) {
    case "Overview":
      return <OverviewDisplayLayout/>;
      case "Demographics":
        return <DisplayLayout />
    case "Planning Applications":
      return <PlanningDisplayLayout/>;
    case "Crime":
      return <CrimeDisplayLayout />;
    case "Environment":
      return <div>Environment data here</div>;
    case "Transport":
      return <div>Transport data here</div>;
    case "Amenities":
      return <div>Amenities data here</div>;
    case "Schools":
      return <div>Schools data here</div>;
    case "Noise":
      return <div>Noise data here</div>;
    default:
      return null;
  }
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { currentPostcode, setCurrentPostcode } = usePostcodeStore();
  const {
    setEconomicData,
    setEucationData,
    setOccupationData,
    setTenureData,
    setCompositionData,
    setPaetnerShipData,
    setPopulationData,
    setPopulationAgeData,
    setEthnicGroupData,
    setAccomadationData,
    setCrimeData,
    setRentData,
    setWalkScore,
    setWalkScoreDescription,
    setIsLoading,
  } = useNeighbourhoodDemographicStore();

  const { setNewNeighbourhoodData, setNewIsLoading } =
    userNewNeighbourhoodData();

  const properties = [
    {
      title: "Residential Properties",
      value: "30M+",
      icon: "solar:home-outline",
    },
    {
      title: "Property records updated",
      value: "10K+",
      icon: "mdi:update",
    },
    {
      title: "Postcodes available",
      value: "2M+",
      icon: "entypo:location",
    },
    {
      title: "Market Deals",
      value: "1M+",
      icon: "mdi:handshake",
    },
  ];

  const tabs = [
    { key: "Overview", label: "Overview", icon: "mdi:view-dashboard" },
    { key: "Demographics", label: "Demographics", icon: "mdi:account-group" },
    { key: "Planning Applications", label: "Planning Applications", icon: "mdi:currency-usd" },
    { key: "Crime", label: "Crime", icon: "mdi:shield-alert" },
    { key: "Environment", label: "Environment", icon: "mdi:tree" },
    { key: "Transport", label: "Transport", icon: "mdi:bus" },
    { key: "Amenities", label: "Amenities", icon: "mdi:store" },
    { key: "Schools", label: "Schools", icon: "mdi:school" },
    { key: "Noise", label: "Noise", icon: "mdi:volume-high" },
  ];

  useEffect(() => {
    const savedPostcode = localStorage.getItem("selectedPostcode");
    if (savedPostcode && !currentPostcode) {
      setCurrentPostcode(savedPostcode);
    }
  }, [currentPostcode, setCurrentPostcode]);

  useEffect(() => {
    const fetchAllDemographicData = async ({ postcode }) => {
      try {
        setIsLoading(true);
        const endpoints = [
          "/api/v2/demographic/get-economic-activity-data",
          "/api/v2/demographic/get-education-data",
          "/api/v2/demographic/get-hous-occupation-data",
          "/api/v2/demographic/get-house-tenure-data",
          "/api/v2/demographic/get-houshold-composition-data",
          "/api/v2/demographic/get-partnership-data",
          "/api/v2/demographic/get-population-data",
          "/api/v2/demographic/get-population-data-by-age",
          "/api/v2/demographic/get-ethnic-group-data",
          "/api/v2/demographic/get-accomodation-data",
          "/api/indevisual/get-crime-data",
        ];

        const fetchData = endpoints.map((endpoint) =>
          fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postcode: postcode }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
        );

        const [
          fetchEconomicData,
          fetchEducationData,
          fetchHousOccupationData,
          fetchHouseTenureData,
          fetchHousholdCompositionData,
          fetchPartnershipData,
          fetchPopulationData,
          fetchPopulationAgeData,
          fetchEthnicGroupData,
          fetchAccomodationData,
          fetchCrimeData,
        ] = await Promise.all(fetchData);

        setEconomicData(fetchEconomicData);
        setEucationData(fetchEducationData);
        setOccupationData(fetchHousOccupationData);
        setTenureData(fetchHouseTenureData);
        setCompositionData(fetchHousholdCompositionData);
        setPaetnerShipData(fetchPartnershipData);
        setPopulationData(fetchPopulationData);
        setPopulationAgeData(fetchPopulationAgeData);
        setEthnicGroupData(fetchEthnicGroupData);
        setAccomadationData(fetchAccomodationData);
        setCrimeData(fetchCrimeData);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getNeighbourhoodData = async ({ outcode }) => {
      try {
        setNewIsLoading(true);
        const res = await fetch("/api/neighbourhood/get-neighbourhood-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            outcode: outcode,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          setNewNeighbourhoodData(result[0]?._source);
          setNewIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setNewIsLoading(false)
      }finally{
        setNewIsLoading(false)
      }
    };

    const getWalkScore = async ({ postcode }) => {
      try {
        const res = await fetch("/api/indevisual/get-walk-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postcode: postcode,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          const walkData = result[0]?._source;
          setWalkScore(walkData?.walk_score || 0);
          setWalkScoreDescription(walkData?.description || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getRentData = async ({ postcode }) => {
      const outcode = postcode.split(" ")[0];
      try {
        const result = await fetch("/api/indevisual/get-rent-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            outcode: outcode,
          }),
        });

        if (result?.ok) {
          const resultData = await result?.json();
          setRentData(resultData);
        }
      } catch (error) {}
    };

    if (currentPostcode) {
      getNeighbourhoodData({ outcode: currentPostcode });
      getWalkScore({ postcode: currentPostcode });
      getRentData({ postcode: currentPostcode });
    }

    return () => {};
  }, [
    currentPostcode,
    setEconomicData,
    setEucationData,
    setOccupationData,
    setTenureData,
    setCompositionData,
    setPaetnerShipData,
    setPopulationData,
    setPopulationAgeData,
    setEthnicGroupData,
    setAccomadationData,
    setCrimeData,
    setRentData,
    setIsLoading,
    setWalkScore,
    setWalkScoreDescription,
  ]);

  return (
    <div className="max-w-[87rem] mt-16 mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 gap-4 w-full py-8">
        <h1 className="text-black font-bold text-5xl text-center">
          Know the neighbourhood behind the postcode.
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-lg text-center">
          Make sure you have all the facts before you buy or rent a property in
          the UK.
        </p>

        {/* Search Box */}
        <div className="relative w-full max-w-lg mt-4">
          <AutoCompleteSearchNew properties={properties} />
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full sm:w-auto px-4 py-2 text-sm md:text-base rounded-full flex items-center justify-center space-x-2 transform transition duration-300 ease-in-out ${
              activeTab === tab.key
                ? "bg-gray-800 text-white scale-105 shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-md"
            }`}
          >
            <Icon icon={tab.icon} /> <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <TabContent tab={activeTab} />
    </div>
  );
};

export default Page;
//consolimg data
