"use client";
import React, { useEffect, useState } from "react";
import DisplayLayout from "@/components/Demographic/Display";
import AutocompleteSearch from "../autocompleteSearchBar";
import { Icon } from "@iconify/react"; // Import Iconify for icons
import AutoCompleteSearchNew from "@/components/Demographic/AutoCompleteSearch";
import { usePostcodeStore } from "@/store/neighbourhoodStore";

// Dummy content for each tab
const TabContent = ({ tab }) => {
  switch (tab) {
    case "Overview":
      return <DisplayLayout />;
    case "Demographics":
      return <div>Demographics data here</div>;
    case "Affluence":
      return <div>Affluence data here</div>;
    case "Crime":
      return <div>Crime data here</div>;
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
  const {currentPostcode} = usePostcodeStore()


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
    { key: "Affluence", label: "Affluence", icon: "mdi:currency-usd" },
    { key: "Crime", label: "Crime", icon: "mdi:shield-alert" },
    { key: "Environment", label: "Environment", icon: "mdi:tree" },
    { key: "Transport", label: "Transport", icon: "mdi:bus" },
    { key: "Amenities", label: "Amenities", icon: "mdi:store" },
    { key: "Schools", label: "Schools", icon: "mdi:school" },
    { key: "Noise", label: "Noise", icon: "mdi:volume-high" },
  ];

  useEffect(() => {
    if(currentPostcode){
      console.log("currentPostcode", currentPostcode);
      
    }
    
  }, [currentPostcode])
  

  return (
    <div className="max-w-[87rem] mt-16 mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 gap-4 w-full py-8">
        {/* Heading */}
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
