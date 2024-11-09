"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { BusMapStatic, TransportMapStatic } from "../Maps";
import { useListingStore } from "@/store/listingStore";

export function PublicTransportCard({ postcode, data, latitude, longitude,ShortAddress }) {
  const [selectedType, setSelectedType] = useState("rail");
  const [walkScore, setWalkScore] = useState(0);
  const [busData, setBusData] = useState([]);
  const [busLocations, setBusLocations] = useState([]);
  const [walkScoreDescription, setWalkScoreDescription] = useState("");
  const { setWalkScore: setListingWalkScore } = useListingStore();

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

  const center = [
    {
      lat: latitude,
      lng: longitude,
    },
  ];

  useEffect(() => {
    const getWalkScore = async () => {
      try {
        const res = await fetch("/api/indevisual/get-walk-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postcode: data?.ref_postcode || postcode,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          const walkData = result[0]?._source;
          setWalkScore(walkData?.walk_score || 0);
          setWalkScoreDescription(walkData?.description || "");
          setListingWalkScore(walkData?.walk_score || 0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getBusData = async () => {
      try {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        const response = await fetch(
          `https://bustimes.org/vehicles.json?ymax=${lat + 0.2}&xmax=${
            lng + 0.2
          }&ymin=${lat - 0.2}&xmin=${lng - 0.2}`
        );

        if (response.ok) {
          const busData = await response.json();
          setBusData(busData);

          // Extract latitude and longitude from bus coordinates
          const busLocations = busData?.map((bus) => ({
            lat: bus?.coordinates[1],
            lng: bus?.coordinates[0],
          }));

          setBusLocations(busLocations || []); // Set the bus locations with correct lat/lng
        } else {
          console.log("Failed to fetch bus data");
        }
      } catch (error) {
        console.log("Error fetching bus data:", error);
      }
    };

    getBusData();
    getWalkScore();
  }, [data?.ref_postcode, latitude, longitude, selectedType]);


  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="w-full ">
          {/* Icon and Question */}
          <div className="flex items-center space-x-2 justify-between">
            <div className="flex ">
              <span className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
                <Icon
                  icon="mdi:bus"
                  width={16} // Adjust the icon size to fit well within the circle
                  className="text-purple-700" // Adjust the icon color if needed
                />
              </span>
              <span className="text-xl font-bold text-gray-700">
                What are my public transportation options in {ShortAddress}?
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
          <div className="z-10 shadow text-gray-500 font-medium bg-purple-100 text-xs sm:text-sm p-4 rounded-lg mb-3">
            {walkScoreDescription}
          </div>

          <div className="hidden xl:flex h-96 ">
            <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
              <div className="flex-1 h-full">
                <div className="h-full w-full border-1 maplibregl-map mapboxgl-map">
                  <div>
                    {selectedType === "bus" ? (
                      <BusMapStatic center={busLocations || []} />
                    ) : (
                      <TransportMapStatic center={center} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end h-full">
                <div className="flex mb-2 space-x-4">
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

                <div className="sm:flex-col sm:flex-wrap flex-1 flex flex-row scrollbar-none overflow overflow-y-hidden snap-mandatory space-x-2 sm:space-x-0 pr-6 sm:pr-0 ml-2 mb-2 sm:mb-0 sm:-mt-2">
                  {filteredTransports?.map((transport, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full h-auto snap-start map-list-item"
                    >
                      <button className="pt-2 pr-2 h-full w-full text-left">
                        <div className="rounded-md p-4 sm:mr-2 card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
                          <div className="flex flex-col text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                            <div className="w-full justify-between">
                              <span className="text-green-800 font-bold">
                                {selectedType === "bus"
                                  ? `Bus ID: ${transport?.id}`
                                  : transport?.title}
                              </span>
                              <span className="font-semibold ml-4">
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
                                className="py-1 px-2 mr-1 mt-2"
                                style={{
                                  backgroundColor: "#e9e9e9",
                                  lineHeight: "29px",
                                }}
                              >
                                {selectedType === "bus"
                                  ? `Line: ${transport?.service?.line_name}`
                                  : transport?.poiType?.replace(/_/g, " ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
