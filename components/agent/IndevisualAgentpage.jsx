"use client";
import { Tabs, Tab, Card, Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { IndevisualAgentMapStatic } from "../Maps";
import AgentPie from "./Chart/AgentPie";
import AgentBarchart from "./Chart/AgentBarchart";
import AgentLinechart from "./Chart/AgentLinechart";
import { formatNumberWithCommas } from "@/utils/Helper";

function IndevisualAgentpage({ data, name, id }) {
  const agent = {
    name: "Duxburys Commercial, FY3",
    address:
      "8 Metropolitan Business Park, Preston New Road, Blackpool, FY3 9LT",
    phone: "01253 520823",
    email: "info@duxburycommercial.com",
    overview: `Duxburys Commercial is an estate agent in Blackpool. They mainly list properties in FY1, FY3, and FY4. Over the last 6 months, they've listed 134 properties, with 53 currently on the market. Most of the properties listed have 3 bedrooms. They list properties for sale on Zoopla and Rightmove.`,
    openingHours: [
      { day: "Monday", hours: "8:00am - 8:00pm" },
      { day: "Tuesday", hours: "8:00am - 8:00pm" },
      { day: "Wednesday", hours: "8:00am - 8:00pm" },
      { day: "Thursday", hours: "8:00am - 8:00pm" },
      { day: "Friday", hours: "8:00am - 8:00pm" },
      { day: "Saturday", hours: "9:00am - 6:00pm" },
      { day: "Sunday", hours: "10:00am - 4:00pm" },
    ],
    mapUrl: "https://via.placeholder.com/600x300", // Placeholder map image URL
  };

  const mapCenter = {
    lat: parseFloat(data?.agentData?.location?.lat),
    lng: parseFloat(data?.agentData?.location?.lng),
  };

  console.log("data is", data);
  
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 mt-10">
      <div className="container mx-auto px-8 py-12 rounded-lg">
        {/* Agent Header */}
        <div className="mb-10 border-b pb-8 border-blue-300">
          <h1 className="text-5xl font-extrabold text-blue-900">{name}</h1>
          <p className="text-blue-700 text-lg mt-2">
            {data?.agentData?.displayAddress}
          </p>
          <div className="flex items-center mt-6 space-x-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Icon icon="solar:phone-outline" width="20" height="20" />
              <a
                href={`tel:${data?.agentData?.phone}`}
                className="underline hover:text-blue-800"
              >
                {data?.agentData?.phone}
              </a>
            </div>
            <i>

            <div className="flex items-center gap-2 text-blue-600">
              <Icon icon="line-md:email" width="20" height="20" />
              <a
                href={`mailto:${agent.email}`}
                className="underline hover:text-blue-800"
              >
                Email agent
              </a>
            </div>
            </i>
          </div>
        </div>

        {/* Tabs for Overview and Location */}
        <Tabs variant="underlined" aria-label="Agent Detail Tabs">
          <Tab key="overview" title="Overview">
            {/* Overview Content */}
            <div className="mt-10 flex flex-col lg:flex-row lg:gap-12">
              {/* Description on the Left */}
              <div
                className="lg:w-2/3 text-blue-800 leading-relaxed mb-6 lg:mb-0 bg-white p-6 rounded-lg shadow-md"
                dangerouslySetInnerHTML={{ __html: data?.agentData?.details }}
              />

              {/* Opening Hours on the Right */}
              <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Opening hours
                </h3>
                <ul className="text-blue-800 text-sm space-y-2">
                  {data.agentData?.openingTimes.map((entry, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <Icon
                          icon="ic:round-circle"
                          color="green"
                          width="10"
                          height="10"
                          className="mr-2"
                        />
                        <span className="font-medium">{entry.day}</span>
                      </div>
                      <span>{entry.open}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Tab>

          <Tab key="location" title="Location">
            {/* Location Content */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <p className="text-blue-800 leading-relaxed mb-4">
                View the location of{" "}
                <span className="font-semibold text-blue-900">{name}</span> on
                the map below.
              </p>
              <div className="rounded-lg overflow-hidden shadow-lg border border-blue-300">
                <IndevisualAgentMapStatic center={mapCenter} height="300px" />
              </div>
            </div>
          </Tab>
        </Tabs>

        <div className="p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Performance stats
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center bg-gray-50 rounded-lg space-y-4 p-12">
                  <span className="text-sm text-gray-600">
                    % of asking price
                  </span>
                  <span className="text-xl font-semibold text-gray-800">
                    £{formatNumberWithCommas(data?.agentData?.listingsStatistics?.residential?.forSale?.avgAskingPrice)}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Average sale time
                  </span>
                  <span className="text-xl font-semibold text-gray-800">
                    {data?.agentData?.listingsStatistics?.residential?.forSale?.avgWeeksOnMarket} days
                  </span>
                </div>
                <i>

                <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-600">Fee</span>
                  <span className="text-xl font-semibold text-gray-800">
                    £1,200
                  </span>
                </div>
                </i>
              </div>
            </div>
        </div>

        {/* Grid for Charts */}

        <AgentPie data={data} />

        {/* Bar Chart */}
        <AgentBarchart data={data} />

        {/* Line Chart */}
        <AgentLinechart data={data} />
      </div>
    </section>
  );
}

export default IndevisualAgentpage;
