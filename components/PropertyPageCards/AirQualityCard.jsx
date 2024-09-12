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

  const airQualityDetails = [
      {
          label: "CO",
          icon: "ion:skull",
          title: "What is Carbon Monoxide?",

          value: `${airQualityData?.components?.co} µg/m³`,
          description: "Carbon monoxide (CO) is a colorless, odorless gas that can be harmful when inhaled in large amounts.",
          level: airQualityData?.components?.co > 10000 ? "High" : "Normal",
          color: airQualityData?.components?.co > 10000 ? "red" : "green",
          ranges:{
            "0-50": "Good",
            "51-100": "Moderate",
            "101-150": "Unhealthy for Sensitive Groups",
            "151-200": "Unhealthy",
            "201-300": "Very Unhealthy",
            "301-400": "Severe",
            "401-500": "Severe",
          }
        
      },
      {
          label: "NO",
          icon: "ion:skull",
          title: "What is Nitric Oxide?",
          value: `${airQualityData?.components?.no} µg/m³`,
          description: "Nitric oxide (NO) is a gas that can contribute to air pollution and respiratory problems.",
          level: airQualityData?.components?.no > 200 ? "High" : "Normal",
          color: airQualityData?.components?.no > 200 ? "red" : "green",
          bgColor: airQualityData?.components?.no > 200 ? "red" : "green",
          ranges:{
            "0-50": "Good",
            "51-100": "Moderate",
            "101-150": "Unhealthy for Sensitive Groups",
            "151-200": "Unhealthy",
            "201-300": "Very Unhealthy",
            "301-400": "Severe",
            "401-500": "Severe",
          }
      },
      {
          label: "NO2",
          icon: "ion:skull",
          title: "What is Nitrogen Dioxide?",
          value: `${airQualityData?.components?.no2} µg/m³`,
          description: "Nitrogen dioxide (NO2) is a reddish-brown gas that can irritate the respiratory system.",
          level: airQualityData?.components?.no2 > 200 ? "High" : "Normal",
          color: airQualityData?.components?.no2 > 200 ? "red" : "green",
          bgColor: airQualityData?.components?.no2 > 200 ? "red" : "green",
          ranges:{
            "0-50": "Good",
            "51-100": "Moderate",
            "101-150": "Unhealthy for Sensitive Groups",
            "151-200": "Unhealthy",
            "201-300": "Very Unhealthy",
            "301-400": "Severe",
            "401-500": "Severe",
          }
      },
      {
          label: "O3",
          icon: "ion:skull",
          title: "What is Ozone?",
          value: `${airQualityData?.components?.o3} µg/m³`,
          description: "Ozone (O3) at ground level is a harmful air pollutant that affects the respiratory system.",
          level: airQualityData?.components?.o3 > 180 ? "High" : "Normal",
          color: airQualityData?.components?.o3 > 180 ? "red" : "green",
          bgColor: airQualityData?.components?.o3 > 180 ? "red" : "green",
          ranges:{
            "0-50": "Good",
            "51-100": "Moderate",
            "101-150": "Unhealthy for Sensitive Groups",
            "151-200": "Unhealthy",
            "201-300": "Very Unhealthy",
            "301-400": "Severe",
            "401-500": "Severe",
          }
      },
      {
          label: "SO2",
          icon: "ion:skull",
          title: "What is Sulfur Dioxide?",

          
          value: `${airQualityData?.components?.so2} µg/m³`,
          description: "Sulfur dioxide (SO2) is a gas that can cause respiratory problems and contribute to acid rain.",
          level: airQualityData?.components?.so2 > 75 ? "High" : "Normal",
          color: airQualityData?.components?.so2 > 75 ? "red" : "green",
          bgColor: airQualityData?.components?.so2 > 75 ? "red" : "green",
          ranges:{
            "0-50": "Good",
            "51-100": "Moderate",
            "101-150": "Unhealthy for Sensitive Groups",
            "151-200": "Unhealthy",
            "201-300": "Very Unhealthy",
            "301-400": "Severe",
            "401-500": "Severe",
          }
      },
      {
          label: "PM2.5",
          icon: "ion:skull",
          title: "What is PM2.5?",
          value: `${airQualityData?.components?.pm2_5} µg/m³`,
          description: "PM2?.5 are fine particulate matter that can penetrate the respiratory system and cause health issues.",
          level: airQualityData?.components?.pm2_5 > 35 ? "High" : "Normal",
          color: airQualityData?.components?.pm2_5 > 35 ? "red" : "green",
          bgColor: airQualityData?.components?.pm2_5 > 35 ? "red" : "green",
          ranges:{
            "0-15": "Good",
            "15-30": "Moderate",
            "30-40": "Unhealthy for Sensitive Groups",
            "40-50": "Unhealthy",
            "50-60": "Very Unhealthy",
            "60-70": "Severe",
            "70-80": "Severe",
          }
      },
      {
          label: "PM10",
          icon: "ion:skull",
          title: "What is PM10?",
          value: `${airQualityData?.components?.pm10} µg/m³`,
          description: "PM10 are particulate matter that can cause respiratory problems and other health issues.",
          level: airQualityData?.components?.pm10 > 50 ? "High" : "Normal",
          color: airQualityData?.components?.pm10 > 50 ? "red" : "green",
          bgColor: airQualityData?.components?.pm10 > 50 ? "red" : "green",
          ranges:{
            "0-15": "Good",
            "15-30": "Moderate",
            "30-40": "Unhealthy for Sensitive Groups",
            "40-50": "Unhealthy",
            "50-60": "Very Unhealthy",
            "60-70": "Severe",
            "70-80": "Severe",
          }
      },
      {
          label: "NH3",
          icon: "ion:skull",
          title: "What is Ammonia?",
          value: `${airQualityData?.components?.nh3} µg/m³`,
          description: "Ammonia (NH3) is a gas that can cause irritation to the eyes, nose, and throat.",
          level: airQualityData?.components?.nh3 > 400 ? "High" : "Normal",
          color: airQualityData?.components?.nh3 > 400 ? "red" : "green",
          bgColor: airQualityData?.components?.nh3 > 400 ? "red" : "green",
          ranges:{
            "0-200": "Good",
            "201-400": "Moderate",
            "401-800": "Unhealthy for Sensitive Groups",
            "801-1200": "Unhealthy",
            "1201-1600": "Very Unhealthy",
            "1601-2000": "Severe",
            "2001-3000": "Severe",
          }
      }
  ];
  
  const airQualityComponents = airQualityDetails.map((detail) => ({
    label: detail.label,
    value: detail.value,
    description: detail.description,
    level: detail.level,
    icon: detail.icon,
    title: detail.title,
    color: detail.color,
    bgColor: detail.bgColor,
  }));

  return (
    <Card className="m-4" style={{ minHeight: "250px" }}>
      <CardBody>
        <div className="bg-default-white rounded-md">
          <div className="p-4 sm:p-6 flex flex-col items-center relative cursor-pointer overflow-hidden rounded-t-lg">
            <h2 className="w-full mb-4 flex font-semibold capitalize text-foreground text-lg">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-300 mr-2">
                <Icon icon="ion:skull" width={24} height={24} />
              </div>
              How is the air quality in your area?
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
                     <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md h-full">
                        <h3 className="font-semibold text-xl mb-2 text-center">
                          {component.title}
                        </h3>
                        <div className="flex justify-center items-center rounded-full bg-gray-100 p-2">
                          <Icon icon={component.icon} width={24} height={24} />


                          </div>
                        <p className="text-lg mb-2">{component.description}</p>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md h-full">
                        <h3 className="font-semibold text-xl mb-2 text-center">
                          {component.label}
                        </h3>
                        <p className="text-lg mb-2 text-center">{component.value}</p>

                        {/* level */}
                        <p className={`text-lg mb-2 text-center border-2 border-${component.color}-500 bg-${component.bgColor}-500 rounded-lg p-2`}>
                          {component.level}
                        </p>

                   
                      </div>
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
