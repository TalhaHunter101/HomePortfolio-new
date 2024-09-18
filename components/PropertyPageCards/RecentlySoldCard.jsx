"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { RecentlySoldMapsStatic } from "../Maps";
import { marketInfoStore } from "@/store/listingStore";

const calculateMedian = (prices) => {
  if (prices.length === 0) return 0;

  const sortedPrices = prices.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedPrices.length / 2);

  if (sortedPrices.length % 2 === 0) {
    return (sortedPrices[middleIndex - 1] + sortedPrices[middleIndex]) / 2;
  }

  return sortedPrices[middleIndex];
};

export function RecentlySoldCard({ city, postcode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [SoldListingData, setSoldListingData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [soldLocations, setSoldLocations] = useState([]);
  const { setMarketInfo } = marketInfoStore();
  const [medianPrice, setMedianPrice] = useState(0);

  const nextSlide = () => {
    if (currentIndex < SoldListingData?.hits.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const getSoldListingData = async () => {
      try {
        setIsDataLoading(true);

        const response = await fetch("/api/indevisual/get-sold-listing-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode }),
        });

        if (response.ok) {
          const data = await response.json();
          setSoldListingData(data);
          setMarketInfo(data);

          const locations = data.hits.map((listing) => ({
            lat: listing._source?.address?.latitude,
            lng: listing._source?.address?.longitude,
          }));

          const prices = data.hits
            .map((listing) =>
              parseInt(listing._source?.saleEstimate?.currentPrice || 0, 10)
            )
            .filter((price) => !isNaN(price));
          setMedianPrice(calculateMedian(prices));

          setSoldLocations(locations);
          setIsDataLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsDataLoading(false);
      } finally {
        setIsDataLoading(false);
      }
    };
    // const getSoldData = async () => {
    //   try {
    //     const lat = parseFloat(latitude);
    //     const lng = parseFloat(longitude);

    //     const response = await fetch(
    //       `https://bustimes.org/vehicles.json?ymax=${lat + 0.2}&xmax=${
    //         lng + 0.2
    //       }&ymin=${lat - 0.2}&xmin=${lng - 0.2}`
    //     );

    //     if (response.ok) {
    //       const busData = await response.json();
    //       setsoldData(busData);

    //       // Extract latitude and longitude from bus coordinates
    //       const SoldHouses = SoldListingData.hits.map((SoldListingData) => ({
    //         lat: SoldListingData.hits.coordinates[1],
    //         lng: SoldListingData.hits.coordinates[0],
    //       }));

    //       setSoldLocations(SoldListingData); // Set the bus locations with correct lat/lng
    //     } else {
    //       console.log("Failed to fetch bus data");
    //     }
    //   } catch (error) {
    //     console.log("Error fetching bus data:", error);
    //   }
    // };
    getSoldListingData();
  }, [postcode]);

  return (
    <Card className="m-4" style={{ minHeight: "150px", maxWidth: "1070px" }}>
      <CardBody>
        {isDataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {SoldListingData.length === 0 ? (
              <p>No data available</p>
            ) : (
              <div className="rounded-md">
                <div className="bg-gray-250 p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden bg-background text-foreground rounded-t-lg">
                  <div className="flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground mb-2 sm:mb-4 text-lg">
                    <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-purple-400">
                      <Icon icon="mdi:home-group" />
                    </div>
                    <span>Recently Sold Homes in {city}</span>
                  </div>
                  <div className="grid item-start sm:items-center grid-cols-2">
                    <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                      <div className="text-xs md:text-sm capitalize text-foreground">
                        # recently sold
                      </div>
                      <div className="text-xl text-foreground font-medium">
                        {SoldListingData?.totalCount}
                      </div>
                    </div>
                    <div className="flex flex-col items-center mb-2 pr-2 text-center justify-between">
                      <div className="text-xs md:text-sm capitalize text-foreground">
                        Median Price in {city}
                      </div>
                      <div className="text-xl text-muted-foreground font-medium">
                        £{medianPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="z-10 w-full rounded-br-lg rounded-bl-lg">
                  <div className="xl:flex h-96">
                    <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                      {/* Map section */}
                      <div className="flex-1 z-40 h-full">
                        <div className="h-full w-full">
                          <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                            <RecentlySoldMapsStatic center={soldLocations} />
                          </div>
                        </div>
                      </div>

                      {/* Carousel section */}
                      <div className="flex-1 h-full overflow-hidden">
                        <div className="h-full overflow-y-auto">
                          {SoldListingData?.hits?.map((item, index) => (
                            <div key={index} className="w-full p-2">
                              <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                {/* <div className="flex-shrink-0">
                                  <Image
                                    radius="none"
                                    src="https://lc.zoocdn.com/9c370f7e2f8484aa78cfec6e7b864b96eff849ca.jpg"
                                    alt="Property"
                                    width={100}
                                    height={100}
                                    classNames={{
                                      wrapper: "min-w-full",
                                    }}
                                  />
                                </div> */}
                                <div className="ml-4">
                                  <h3 className="text-bold text-2xl">
                                    £
                                    {item?._source?.saleEstimate?.currentPrice ||
                                      "NA"}
                                  </h3>
                                  <div className="text-sm uppercase flex text-bold">
                                    <span className="ml-0 text-bold flex justify-center gap-1">
                                      <Icon
                                        icon="mdi:bed-outline"
                                        width={16}
                                        height={16}
                                      />{" "}
                                      {item?._source?.attributes?.bedrooms || 0}
                                    </span>
                                    <span className="ml-2 text-bold flex justify-center gap-1">
                                      <Icon
                                        icon="bx:bath"
                                        width={16}
                                        height={16}
                                      />{" "}
                                      {item?._source?.attributes?.bathrooms || 0}
                                    </span>
                                    <span className="ml-2 text-bold flex justify-center gap-1">
                                      <Icon
                                        icon="carbon:area"
                                        width={16}
                                        height={16}
                                      />{" "}
                                      {item?._source?.squareFeet || 1000}
                                    </span>
                                  </div>

                                  <p className="pt-2 text-default-500 text-sm">
                                    {item?._source?.full_address}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* End of carousel section */}
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
}
