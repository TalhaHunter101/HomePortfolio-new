"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Progress,
  CardHeader,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function AirQualityCard({ latitude, longitude }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [airQualityData, setAirQualityData] = useState(null);

  // const months = [
  //   "Sep",
  //   "Nov",
  //   "Jan",
  //   "Mar",
  //   "May",
  //   "Jul",
  //   "Sep"
  // ];

  // Hardcoded values for highlighted days (0 is no highlight, 1 is highlighted)
  // const daysHighlighted = [
  //   [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ];

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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 6 - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 6 - 1 ? 0 : prevIndex + 1));
  };

  // Fetch air quality data from API
  const airQualityDetails = [
    {
      //hardcoded
      label: "Average Air Quality",
      icon: "ion:skull",
      title: "Average air quality last month",
      value: "Good",
      description: "CO: Present, PM2.5: Present",
      level: "Good",
      color: "green",
      bgColor: "green",
    },
    {
      label: "CO",
      icon: "ion:skull",
      title: "What is Carbon Monoxide?",
      value: `${airQualityData?.components?.co} µg/m³`,
      description:
        "Carbon monoxide (CO) is a colorless, odorless gas that can be harmful when inhaled in large amounts.",
      level: airQualityData?.components?.co > 10000 ? "High" : "Normal",
      color: airQualityData?.components?.co > 10000 ? "red" : "green",
    },
    {
      label: "NO",
      icon: "ion:skull",
      title: "What is Nitric Oxide?",
      value: `${airQualityData?.components?.no} µg/m³`,
      description:
        "Nitric oxide (NO) is a gas that can contribute to air pollution and respiratory problems.",
      level: airQualityData?.components?.no > 200 ? "High" : "Normal",
      color: airQualityData?.components?.no > 200 ? "red" : "green",
    },
    {
      label: "NO2",
      icon: "ion:skull",
      title: "What is Nitrogen Dioxide?",
      value: `${airQualityData?.components?.no2} µg/m³`,
      description:
        "Nitrogen dioxide (NO2) is a reddish-brown gas that can irritate the respiratory system.",
      level: airQualityData?.components?.no2 > 200 ? "High" : "Normal",
      color: airQualityData?.components?.no2 > 200 ? "red" : "green",
    },
    {
      label: "O3",
      icon: "ion:skull",
      title: "What is Ozone?",
      value: `${airQualityData?.components?.o3} µg/m³`,
      description:
        "Ozone (O3) at ground level is a harmful air pollutant that affects the respiratory system.",
      level: airQualityData?.components?.o3 > 180 ? "High" : "Normal",
      color: airQualityData?.components?.o3 > 180 ? "red" : "green",
    },
    {
      label: "PM2.5",
      icon: "twemoji:lungs",
      title: "What is PM2.5?",
      value: `${airQualityData?.components?.pm2_5} µg/m³`,
      description:
        "PM2.5 are fine particulate matter that can penetrate the respiratory system and cause health issues.",
      level: airQualityData?.components?.pm2_5 > 35 ? "High" : "Normal",
      color: airQualityData?.components?.pm2_5 > 35 ? "red" : "green",
    },
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

  // const DayGrid = () => {
  //   return (
  //     <div className="flex flex-col space-y-1">
  //       {months.map((month, index) => (
  //         <div key={index} className="flex  items-center">
  //           <span className="w-8 text-xs text-left  mr-2">{month}</span>
  //           <div className="grid grid-flow-col auto-cols-max gap-0.5">
  //             {daysHighlighted[index].map((highlight, dayIndex) => (
  //               <div
  //                 key={dayIndex}
  //                 className={`w-3 h-3 ${highlight === 1 ? "bg-green-400" : "bg-gray-200"} rounded-sm`}
  //               ></div>
  //             ))}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <Card className="m-4 min-h-[250px]">
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="ion:skull"
              width={16} // Adjust the icon size to fit well within the circle
              className="text-purple-700" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            {" "}
            How is the air quality in your area?
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="bg-white rounded-md">
          <div className="p-6 flex flex-col items-center relative cursor-pointer overflow-hidden rounded-t-lg">
            {/* <h2 className="w-full mb-4 flex font-semibold capitalize text-lg text-black">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-300 mr-2">
                <Icon icon="ion:skull" width={24} height={24} />
              </div>
              How is the air quality in your area?
            </h2> */}

            {airQualityData ? (
              <div className="relative w-full overflow-hidden rounded-lg">
                {/* Carousel */}
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: "100%",
                  }}
                >
                  {airQualityComponents.map((component, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full flex justify-center"
                    >
                      {index === 0 ? (
                        <div className="flex flex-col md:flex-row justify-between  rounded-lg shadow-md w-full max-w-6xl">
                          <div className="w-3/5 text-left p-8 ">
                            <h3 className="text-lg font-medium mt-24 mb-2">
                              Average air quality last month
                            </h3>
                            <h1 className="text-5xl font-semibold mb-4">
                              Good
                            </h1>
                            <div className="relative w-full mb-2">
                              <Progress value={50} color="success" />
                              <div className="flex justify-between text-sm mt-2">
                                <span className="text-green-600">Good</span>
                                <span className="text-yellow-500">
                                  Moderate
                                </span>
                                <span className="text-red-500">Unhealthy</span>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-2/5 text-center bg-blue-50 p-5 rounded-lg">
                            <h3 className="text-lg font-medium mt-10 mb-10">
                              What&#39;s in the air?
                            </h3>
                            <div className="flex justify-around mb-6">
                              <div className="flex flex-col items-center">
                                <Icon icon="ion:skull" width={32} height={32} />
                                <span className="mt-2">CO</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Icon
                                  icon="twemoji:lungs"
                                  width={32}
                                  height={32}
                                />
                                <span className="mt-2">PM2.5</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => setCurrentIndex(1)}
                              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                            >
                              Learn more about the air{" "}
                              <Icon
                                className="inline"
                                icon="ion:chevron-forward"
                              />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-8 rounded-lg w-full">
                          <div className="flex flex-col items-center p-6 rounded-lg shadow h-full">
                            <h3 className="font-semibold text-xl mb-4 mt-16 text-center text-gray-700">
                              {component.title}
                            </h3>
                            <div className="flex justify-center items-center mb-3 p-3 rounded-full bg-gray-100">
                              <Icon
                                icon={component.icon}
                                width={32}
                                height={32}
                              />
                            </div>
                            <p className="text-md text-gray-600 text-center">
                              {component.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-center p-6 rounded-lg shadow h-full">
                            <h3 className="font-semibold text-xl mb-4 mt-10 text-center text-gray-700">
                              {component.label}
                            </h3>
                            <p className="text-2xl font-bold mb-3 text-center text-gray-800">
                              {component.value}
                            </p>
                            <p
                              className={`text-md font-medium text-center rounded-lg mt-4 p-2 bg-${component.color}-100 text-${component.color}-700`}
                            >
                              {component.level}
                            </p>
                          </div>
                        </div>
                      )}
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
        {/* Adding DayGrid component */}
      </CardBody>
    </Card>
  );
}
