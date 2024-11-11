"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatCurrency, timeAgo } from "@/utils/Helper";
import { RecentlySoldMapsStatic } from "../Maps";
import CardSimilarProperty from "./CardSimilarProperty";

export const SimilarHomesCard = ({ data, city }) => {
  const [similarProperties, setSimilarProperties] = useState([]);
  const [similarLocation, setSimilarLocation] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch("/api/indevisual/get-nearby-listing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postcode: data?.location?.postalCode,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setSimilarProperties(result);

          const locations = result.map((listing) => ({
            lat: listing._source?.location?.coordinates?.latitude,
            lng: listing._source?.location?.coordinates?.longitude,
          }));

          setSimilarLocation(locations);
        }
        setIsDataLoading(false);
      } catch (error) {
        console.error("Error fetching similar properties:", error);
        setIsDataLoading(false);
      }
    };

    if (data) {
      fetchSimilarProperties();
    }
  }, [data]);

  // Function to go to the previous property
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? similarProperties.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next property
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === similarProperties.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card
      shadow="none"
      className="m-4 "
      style={{ minHeight: "150px", maxWidth: "1070px" }}
    >
      <CardHeader>
        <div className="flex items-center my-2  ">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:home-group"
              width={16}
              className="text-purple-700"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">Similar Homes</h2>
        </div>
      </CardHeader>
      <CardBody>
        {isDataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {similarProperties.length === 0 ? (
              <p>No data available</p>
            ) : (
              <div className="rounded-md">
                <div className="bg-gray-250 p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden bg-background text-foreground rounded-t-lg">
                  <div className="flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground mb-2 sm:mb-4 text-lg">
                    <span>Similar homes in {city}</span>
                  </div>
                  <div className="grid item-start sm:items-center grid-cols-2">
                    <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                      <div className="text-xl text-foreground font-medium">
                        {similarProperties?.totalCount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="z-10 w-full rounded-br-lg rounded-bl-lg">
                  <div className="xl:flex h-96">
                    <div className="flex flex-col md:flex-row relative overflow-hidden sm:mx-4 gap-2 w-full">
                      {/* Map section */}
                      <div className="flex-1 z-40 h-full">
                        <div className="h-full w-full">
                          <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                            <RecentlySoldMapsStatic center={similarLocation} />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 w-full flex flex-col justify-end h-full">
                        <div className="flex p-2 flex-col sm:flex-wrap gap-2 flex-1 mt-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory space-x-2 sm:space-x-0 pr-6 sm:pr-0 ml-2 mb-2 sm:mb-0 sm:-mt-2">
                          {/* Carousel with Previous and Next buttons */}
                          <div className="relative">
                            {similarProperties.length > 0 && (
                              <CardSimilarProperty
                                property={similarProperties[currentIndex]}
                              />
                            )}
                            <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
                              <Button
                                isIconOnly
                                variant="flat"
                                radius="full"
                                size="sm"
                                onClick={handlePrevious}
                              >
                                <Icon
                                  color="white"
                                  icon="bx:bx-chevron-left"
                                  width={24}
                                  height={24}
                                />
                                <span className="sr-only">Previous</span>
                              </Button>
                              <Button
                                isIconOnly
                                variant="flat"
                                radius="full"
                                size="sm"
                                onClick={handleNext}
                              >
                                <Icon
                                  color="white"
                                  icon="bx:bx-chevron-right"
                                  width={24}
                                  height={24}
                                />
                                <span className="sr-only">Next</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};
