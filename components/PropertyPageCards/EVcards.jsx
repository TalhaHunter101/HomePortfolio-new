"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import CardItem from "./EVcardComponents/CarousalCards";
import { EvChargingMapStatic } from "../Maps";

export function EVCard({ price, roi, postTownName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [evChargingData, setEvChargingData] = useState([]);
  const [evChargingCount, setEvChargingCount] = useState(0);

  const nextSlide = () => {
    if (currentIndex < evChargingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const getEvChargingData = async () => {
      try {
        const res = await fetch("/api/indevisual/get-evcharge-by-town", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            town: postTownName,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setEvChargingData(data?.hits || []);
          setEvChargingCount(data?.totalCount || 0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEvChargingData();
  }, [postTownName]);


  console.log("evChargingData",evChargingData);
  


  return (
    <Card className="m-4" style={{ minHeight: "150px", maxWidth: "1066px" }}>
      <CardHeader>
      <div className="flex items-center my-2  ">
    <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
      <Icon
        icon="mdi:ev-station"
        width={16} // Adjust the icon size to fit well within the circle
        className="text-purple-700" // Adjust the icon color if needed
      />
    </div>
    <h2 className="text-xl font-bold text-gray-700">Electric Vehicle Charging</h2>
  </div>
      </CardHeader>
      <CardBody>
        <div className=" rounded-md p-2">
          <div className="p-4 sm:p-4 sm:py-6 lg:flex relative bg-background text-foreground rounded-t-lg">
            <h2 className="w-full pr-10 lg:pr-4 relative z-10 mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground text-lg">
             
              <span>Where Can I Charge My Electric Vehicle near {postTownName}?</span>
            </h2>
            <div className="w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 text-foreground grid item-start sm:items-center grid-cols-1">
              <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                <div className="text-xs md:text-sm capitalize text-foreground">Charging stations nearby</div>
                <div className="text-xl text-foreground font-medium">{evChargingCount}</div>
              </div>
            </div>
          </div>
          <div className="pt-7 pb-8 rounded-md text-foreground shadow relative h-full w-[100%] flex-1">
            <div className="mx-6 lg:mx-12 z-10 shadow text-gray-500 font-medium bg-purple-100 text-xs sm:text-sm p-4 rounded-lg">
              Charging an EV does take a bit of planning. Knowing the type of charger available at a public station (Level 2 units, DC fast chargers, or Superchargers), as well as the time taken to charge your vehicle can help you avoid delays.
            </div>
            <div className="mx-6 lg:mx-12 flex mt-7 max-w-sm justify-between">
              <div className="flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">Number of Nearby Stations</div>
                  <div className="text-yellow-800 flex items-end stat-wrapper">
                    <div className="text-2xl lg:text-3xl font-semibold">{evChargingCount}</div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">Free charging?</div>
                  <div className="text-yellow-800 flex items-end stat-wrapper">
                    <div className="text-2xl lg:text-3xl font-semibold">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 mt-4 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
            <div className="hidden xl:flex h-96">
              <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                {/* Map section on the left */}
                <div className="flex-1 z-40 w-1/2 h-full">
                  <div className="h-full w-full">
                    <div className="w-full h-full bg-white border-1">
                      <EvChargingMapStatic center={evChargingData.map(data => ({
                          lat: parseFloat(data._source.latitude),
                          lng: parseFloat(data._source.longitude)
                        }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Carousel section on the right */}
                <div className="flex-1 w-1/2 flex flex-col justify-center h-full">
                  <div className="relative w-full h-full flex items-center">
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
                      {evChargingData.map((item, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-[100%] h-full p-2"
                        >
                          <CardItem
                            title1={item._source.name}
                            address1={item._source.street}
                            description1={item._source.deviceModel}
                            svgIcon1={item._source.svgIcon}
                            title2={item._source.deviceOwnerName}
                            address2={item._source.deviceOwnerWebsite}
                            description2={item._source.deviceNetworks}
                            svgIcon2={item._source.svgIcon}
                            type={item._source.connector1Type}
                            status={item._source.connector1Status}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={nextSlide}
                      disabled={currentIndex === evChargingData.length - 1}
                      className="absolute right-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
                    >
                      &#10095;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
