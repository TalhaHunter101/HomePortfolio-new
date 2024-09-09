"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import SearchCard from "../SearchPage/SearchCrd";
import { Icon } from "@iconify/react";
import Link from "next/link";



export function RecentlySoldCard({ city, postcode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [SoldListingData, setSoldListingData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  

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
          setIsDataLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsDataLoading(false);
      } finally {
        setIsDataLoading(false);
      }
    };

    getSoldListingData();
  }, [postcode]);

  console.log("SoldListingData data...",SoldListingData);
  

  return (
    <Card className="m-4" style={{ minHeight: "150px", maxWidth: "1000px" }}>
      
      <CardBody>
        {isDataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {SoldListingData.length === 0 ? (
              <p>No data available</p>
            ) : (
              <div className="   rounded-md">
                <div className="bg-gray-250 p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden scroll-m-6 lg:scroll-m-8 bg-background text-foreground rounded-t-lg">
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
                        $796K
                      </div>
                    </div>
                  </div>
                </div>
                <div className="z-10 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
                  <div className=" xl:flex h-96">
                    <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                      {/* Map section on the left */}
                      <div className="flex-1 z-40 h-full">
                        <div className="h-full w-full">
                          <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                            <div>





                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Carousel section on the right */}
                      <div className="flex-1 w-1/2 flex flex-col justify-center h-full">
                        <div className="relative  h-full flex items-center">
                          <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className="absolute left-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
                          >
                            &#10094;
                          </button>
                          <div
                            className="flex transition-transform duration-500 ease-in-out w-full"
                            style={{
                              transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                          >
                            {SoldListingData?.hits?.map((item, index) => (
                              <div
                                key={index}
                                className="flex-shrink-0 w-[100%] h-full p-2"
                              >
                                {/* <Card className="w-full h-full" shadow="sm">
                                  <CardHeader className="p-0">
                                    <Image
                                      width={150}
                                      height={150}
                                      src="https://via.placeholder.com/150"
                                      alt={item?.name || 'image'}
                                      className="w-full h-64 object-cover rounded-t-md"
                                    />
                                  </CardHeader>
                                  <CardBody className="p-4 flex flex-col justify-between">
                                    <div>
                                      <h3 className="text-lg font-bold">
                                        {item._source?.full_address}
                                      </h3>
                                  
                                    </div>
                                  </CardBody>
                                </Card> */}
                           <Card   >
      <CardHeader className="p-0 relative">
        {/* Wrapper for positioning */}
        <div className="relative">
          {/* Heart Icon */}
          {/* <div className="absolute top-2 right-2 z-10">
            <Icon
              onClick={handleLikeToggle} // Toggle like on click
              icon={ isLiked ? "twemoji:red-heart" : "ant-design:heart-twotone"}
              width="24"
              height="24"
              color={isLiked ? "" : "white"} // Change color based on state
              style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
            />
          </div> */}

          <div className="w-full overflow-hidden rounded-none">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              // style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                <div  className="flex-shrink-0 w-full">
                  {/* <Link href={`/property/${item?._source?.id}`}> */}
                    <Image
                      radius="none"
                      src={"https://lc.zoocdn.com/9c370f7e2f8484aa78cfec6e7b864b96eff849ca.jpg"}
                      alt={`Property`}
                      width={600} // Full width
                      height={200}
                      classNames={{ wrapper: "min-w-full" }}
                    />
                  {/* </Link> */}
                </div>
            </div>
          </div>
          {/* <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
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
          </div> */}
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden py-2">
        {/* <Link href={`/property/${item?._source?.id}`}> */}
          <div className="p-1">
            <h3 className="text-bold text-2xl">£{item?._source?.saleEstimate?.currentPrice || "NA"}</h3>
            <div className="text-sm uppercase flex text-bold">
              <span className="ml-0 text-bold flex justify-center gap-1">
                <Icon icon="mdi:bed-outline" width={16} height={16} /> {item?._source?.attributes?.bedrooms || 0}
              </span>
              <span className="ml-2 text-bold flex justify-center gap-1">
                <Icon icon="bx:bath" width={16} height={16} /> {item?._source?.attributes?.bathrooms || 0} 
              </span>
              <span className="ml-2 text-bold flex justify-center gap-1">
                <Icon icon="carbon:area" width={16} height={16} /> {item?._source?.squareFeet || 1000} 
              </span>
            </div>
            <p className="pt-2 text-default-500 text-sm">{item?._source?.full_address}</p>
            <div className="pt-2 flex space-x-2">
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                #bonus room
              </span>
              <span className="bg-gray-200 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                +6 more
              </span>
            </div>
          </div>
        {/* </Link> */}
      </CardBody>
    </Card>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={nextSlide}
                            disabled={currentIndex === SoldListingData?.hits?.length - 1}
                            className="absolute right-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
                          >
                            &#10095;
                          </button>
                        </div>
                      </div>
                      {/* End of carousel integration */}
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
