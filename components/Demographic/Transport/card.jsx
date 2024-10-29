"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function PublicTransportCard({ postcode, latitude, longitude }) {
  const [selectedType, setSelectedType] = useState("rail");
  const [walkScore, setWalkScore] = useState(70); // Dummy walk score data
  const [busData, setBusData] = useState([
    { id: "Bus001", destination: "City Center", service: { line_name: "24A" } },
    { id: "Bus002", destination: "Airport", service: { line_name: "10B" } },
  ]); // Dummy bus data
  const [walkScoreDescription, setWalkScoreDescription] = useState(
    "Very Walkable. Most errands can be accomplished on foot."
  ); // Dummy description

  // Dummy transport data
  const data = {
    transports: [
      { title: "Central Station", poiType: "rail_station", distanceInMiles: 0.5 },
      { title: "River Ferry", poiType: "ferry_terminal", distanceInMiles: 1.2 },
    ],
  };

  // Count transports for each type (rail, bus, ferry)
  const transportCounts = data?.transports?.reduce((acc, transport) => {
    const { poiType } = transport;
    const key = poiType?.includes("rail")
      ? "rail"
      : poiType?.includes("bus")
      ? "bus"
      : "ferry";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Filter transports based on selected type
  const filteredTransports =
    selectedType === "bus"
      ? busData
      : data?.transports?.filter((transport) =>
          transport?.poiType?.includes(selectedType)
        );

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="w-full ">
          <div className="flex items-center space-x-2 justify-between">
            <div className="flex ">
              <span className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
                <Icon
                  icon="mdi:bus"
                  width={16}
                  className="text-purple-700"
                />
              </span>
              <span className="text-xl font-bold text-gray-700">
                What are my public transportation options?
              </span>
            </div>

            {/* Walk Score Info */}
            <div className="px-4 text-purple-300 w-[30vw]">
              <div className="text-xs text-gray-500 md:text-sm capitalize text-foreground text-center">
                <a
                  href="https://walkradius.com"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  Walk Score<sup>®</sup>
                </a>
                &nbsp;
                <div className="text-3xl font-bold text-gray-600">
                  {walkScore || "N/A"}
                  <Icon icon="ion:walk" className="inline mb-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="rounded-md">
          <div className="shadow text-gray-500 font-medium bg-purple-100 text-xs sm:text-sm p-4 rounded-lg mb-3">
            {walkScoreDescription}
          </div>

          <div className="flex h-full justify-center gap-4 mb-4">
            <button
              className={`flex space-x-2 items-center rounded-md px-4 py-2 ${
                selectedType === "rail"
                  ? "text-green-800 bg-green-200"
                  : "text-gray-800 bg-gray-200"
              } border hover:bg-green-200`}
              onClick={() => setSelectedType("rail")}
            >
              <Icon icon="mdi:train" width="1em" height="1em" />
              <div>Rail ({transportCounts?.rail || 0})</div>
            </button>
            <button
              className={`flex space-x-2 items-center rounded-md px-4 py-2 ${
                selectedType === "bus"
                  ? "text-green-800 bg-green-200"
                  : "text-gray-800 bg-gray-200"
              } border hover:bg-gray-200`}
              onClick={() => setSelectedType("bus")}
            >
              <Icon icon="mdi:bus" width="1em" height="1em" />
              <div>Bus ({transportCounts?.bus || busData?.length})</div>
            </button>
            <button
              className={`flex space-x-2 items-center rounded-md px-4 py-2 ${
                selectedType === "ferry"
                  ? "text-green-800 bg-green-200"
                  : "text-gray-800 bg-gray-200"
              } border hover:bg-gray-200`}
              onClick={() => setSelectedType("ferry")}
            >
              <Icon icon="mdi:ferry" width="1em" height="1em" />
              <div>Ferry ({transportCounts?.ferry || 0})</div>
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {filteredTransports?.map((transport, index) => (
              <div
                key={index}
                className="rounded-md p-4 bg-gray-100 border border-gray-200"
              >
                <div className="flex justify-between">
                  <span className="text-green-800 font-bold">
                    {selectedType === "bus"
                      ? `Bus ID: ${transport?.id}`
                      : transport?.title}
                  </span>
                  <span className="font-semibold">
                    {selectedType === "bus"
                      ? `Destination: ${transport?.destination}`
                      : `${transport?.poiType?.replace(
                          /_/g,
                          " "
                        )} • ${transport?.distanceInMiles} mi away`}
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className="py-1 px-2 bg-gray-300 rounded"
                  >
                    {selectedType === "bus"
                      ? `Line: ${transport?.service?.line_name}`
                      : transport?.poiType?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
