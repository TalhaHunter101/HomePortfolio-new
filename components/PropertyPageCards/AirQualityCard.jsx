"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function AirQualityCard({ latitude, longitude }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [airQualityData, setAirQualityData] = useState(null);

  // Fetch air quality data from API
  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=c6edfc199a2855bf23667e94fc691e70`
        );
        const data = await response.json();
        setAirQualityData(data.list[0]);
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    fetchAirQualityData();
  }, [latitude, longitude]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 5 - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 5 - 1 ? 0 : prevIndex + 1));
  };

  const airQualityComponents = airQualityData
    ? [
        { label: "CO", value: `${airQualityData.components.co} µg/m³` },
        { label: "NO", value: `${airQualityData.components.no} µg/m³` },
        { label: "NO2", value: `${airQualityData.components.no2} µg/m³` },
        { label: "O3", value: `${airQualityData.components.o3} µg/m³` },
        { label: "SO2", value: `${airQualityData.components.so2} µg/m³` },
        { label: "PM2.5", value: `${airQualityData.components.pm2_5} µg/m³` },
        { label: "PM10", value: `${airQualityData.components.pm10} µg/m³` },
        { label: "NH3", value: `${airQualityData.components.nh3} µg/m³` },
      ]
    : [];

  return (
    <Card className="m-4" style={{ minHeight: "250px" }}>
      <CardBody>
        <div className="bg-default-white rounded-md">
          <div className="p-4 sm:p-6 flex flex-col items-center relative cursor-pointer overflow-hidden rounded-t-lg">
            <h2 className="w-full mb-4 flex justify-center font-semibold capitalize text-foreground text-lg">
              <div className="h-8 w-8 flex justify-center items-center rounded-full bg-green-300 mr-2">
                <Icon icon="mdi:weather-windy" width={24} height={24} />
              </div>
              Air Quality in Your Area
            </h2>

            {airQualityData ? (
              <div className="relative w-full overflow-hidden rounded-lg">
                {/* Carousel */}
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {airQualityComponents.map((component, index) => (
                    <div key={index} className="flex-shrink-0 w-full p-4">
                      <div className="flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md h-full">
                        <h3 className="font-semibold text-xl mb-2">
                          {component.label}
                        </h3>
                        <p className="text-lg">{component.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-y-1/2 flex w-full justify-between px-4">
                  <Button
                    isIconOnly
                    variant="ghost"
                    radius="full"
                    size="sm"
                    onClick={handlePrevious}
                  >
                    <Icon
                      color="gray"
                      icon="bx:bx-chevron-left"
                      width={24}
                      height={24}
                    />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    isIconOnly
                    variant="ghost"
                    radius="full"
                    size="sm"
                    onClick={handleNext}
                  >
                    <Icon
                      color="gray"
                      icon="bx:bx-chevron-right"
                      width={24}
                      height={24}
                    />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </div>
            ) : (
              <p>Loading air quality data...</p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
