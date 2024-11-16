"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import CardItem from "./EVcardComponents/CarousalCards";
import { EvChargingMapStatic } from "../Maps";

export function EVCard({ price, roi, city, postTownName, ShortAddress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [evChargingData, setEvChargingData] = useState([]);
  const [evChargingCount, setEvChargingCount] = useState(0);

  const nextSlide = () => {
    if (currentIndex < evChargingData?.length - 1) {
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
            town: postTownName || city,
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
  }, [postTownName, city]);

  return (
    <Card className="m-4" style={{ minHeight: "150px", maxWidth: "1066px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:ev-station"
              width={16}
              className="text-purple-700"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            Where Can I Charge My Electric Vehicle near {postTownName || city}?
          </h2>
        </div>
      </CardHeader>
      {evChargingData.length === 0 ? (
        <CardBody className="flex flex-col items-center justify-center">
          <Image
            src="/undraw_no_data_re_kwbl (1).svg"
            alt="No data found"
            className="w-40 h-40 mb-4"
          />
          <div className="text-gray-500 text-lg">No data available</div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="rounded-md p-2">
            <div className="z-10 shadow text-gray-500 font-medium bg-purple-100 text-xs sm:text-sm p-4 rounded-lg">
              Charging an EV does take a bit of planning. Knowing the type of
              charger available at a public station (Level 2 units, DC fast
              chargers, or Superchargers), as well as the time taken to charge
              your vehicle can help you avoid delays.
            </div>
            <div className="flex mt-4 max-w-sm justify-between">
              <div className="flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">
                    Number of Nearby Stations
                  </div>
                  <div className="text-yellow-800 flex items-end stat-wrapper">
                    <div className="text-2xl lg:text-3xl font-semibold">
                      {evChargingCount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">
                    Free charging?
                  </div>
                  <div className="text-yellow-800 flex items-end stat-wrapper">
                    <div className="text-2xl lg:text-3xl font-semibold">
                      Available
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-10 mt-4 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
              <div className="flex md:h-96">
                <div className="flex flex-col-reverse md:flex-row relative overflow-hidden sm:mx-4 gap-2 w-full">
                  {/* Map section on the left */}
                  <div className="flex-1 z-40 md:w-1/2 h-full">
                    <div className="h-1/4 w-full">
                      <div className="w-full hidden md:block h-full bg-white border-1">
                        <EvChargingMapStatic
                          center={evChargingData?.map((data) => ({
                            lat: parseFloat(
                              data?._source?.coordinates?.latitude
                            ),
                            lng: parseFloat(
                              data?._source?.coordinates?.longitude
                            ),
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Carousel section on the right */}
                  <div className="flex-1 md:w-1/2 flex flex-col justify-center h-full">
                    <div className="relative w-full h-full flex items-center">
                      <Button
                        radius="full"
                        size="sm"
                        isIconOnly
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className="absolute left-0 z-10 p-2 bg-opacity-50"
                      >
                        &#10094;
                      </Button>
                      <div
                        className="flex transition-transform duration-500 ease-in-out w-full"
                        style={{
                          transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                      >
                        {evChargingData?.map((item, index) => {
                          const source = item?._source;
                          const device = source?.devices?.[0];
                          const evse = device?.evses?.[0];
                          const connector = evse?.connectors?.[0];
                          const isFree = device?.payment_details?.is_free;

                          return (
                            <div
                              key={index}
                              className="flex-shrink-0 w-[100%] h-full p-2"
                            >
                              <CardItem
                                title1={source?.name || "Charging Location"}
                                address1={`${source?.address || ""}, ${
                                  source?.city || ""
                                }`}
                                description1={
                                  device?.payment_details
                                    ?.subscription_details ||
                                  "No payment details"
                                }
                                svgIcon1={source?.operator?.logo}
                                title2={source?.operator?.name || "Operator"}
                                address2={
                                  source?.owner?.name || "Owner Unknown"
                                }
                                description2={
                                  device?.parking?.access_restrictions ||
                                  "Access restrictions not available"
                                }
                                svgIcon2={source?.operator?.banner}
                                type={connector?.standard || "Unknown Type"}
                                status={
                                  connector?.power_type || "Unknown Power Type"
                                }
                                isFree={isFree} // Pass free/paid status
                              />
                            </div>
                          );
                        })}
                      </div>
                      <Button
                        radius="full"
                        size="sm"
                        isIconOnly
                        onClick={nextSlide}
                        disabled={currentIndex === evChargingData?.length - 1}
                        className="absolute right-0 z-10 p-2 bg-opacity-50"
                      >
                        &#10095;
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}
