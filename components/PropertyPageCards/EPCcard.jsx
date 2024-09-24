"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button, Divider } from "@nextui-org/react";
import { EnergyPerformanceTable } from "./EPCcomponents/table";
import { PerformanceSection } from "./EPCcomponents/PerformanceSection";
import ECPBarChart from "./ECPBarChart";
import { Icon } from "@iconify/react";
import { useListingStore } from "@/store/listingStore";

export function EPCCard({ title, price, roi, uprn }) {
  const [epcData, setEpcData] = useState(null);
  const [currentColour, setCurrentColour] = useState("");
  const { setSquarfoot } = useListingStore();
  const [recData, setRecData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel index

  useEffect(() => {
    const fetchEpcData = async () => {
      try {
        const response = await fetch("/api/indevisual/get-epc-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uprn }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch EPC data");
        }
        const { epcData, recommendationsData } = await response.json();
        setRecData(recommendationsData);

        setEpcData(epcData[0]?._source);
        setSquarfoot(epcData[0]?._source?.TOTAL_FLOOR_AREA);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchEpcData();
  }, [uprn]);

  // Define breakdownData after fetching EPC data
  const breakdownData = [
    {
      feature: "Walls",
      description: epcData?.WALLS_DESCRIPTION,
      rating: epcData?.WALLS_ENERGY_EFF,
    },
    {
      feature: "Roof",
      description: epcData?.ROOF_DESCRIPTION,
      rating: epcData?.ROOF_ENERGY_EFF,
    },
    {
      feature: "Floor",
      description: epcData?.FLOOR_DESCRIPTION,
      rating: epcData?.FLOOR_ENERGY_EFF,
    },
    {
      feature: "Windows",
      description: epcData?.WINDOWS_DESCRIPTION,
      rating: epcData?.WINDOWS_ENERGY_EFF,
    },
    {
      feature: "Main heating",
      description: epcData?.MAINHEAT_DESCRIPTION,
      rating: epcData?.MAINHEAT_ENERGY_EFF,
    },
    {
      feature: "Main heating control",
      description: epcData?.MAINHEATCONT_DESCRIPTION,
      rating: epcData?.MAINHEATC_ENERGY_EFF,
    },
    {
      feature: "Hot water",
      description: epcData?.HOTWATER_DESCRIPTION,
      rating: epcData?.HOT_WATER_ENERGY_EFF,
    },
    {
      feature: "Lighting",
      description: epcData?.LIGHTING_DESCRIPTION,
      rating: epcData?.LIGHTING_ENERGY_EFF,
    },
    {
      feature: "Air tightness",
      description: epcData?.AIR_DESCRIPTION || "-",
      rating: epcData?.AIR_ENERGY_EFF || "-",
    },
    {
      feature: "Secondary heating",
      description: epcData?.SECONDHEAT_DESCRIPTION,
      rating: epcData?.SECONDHEAT_ENERGY_EFF || "-",
    },
  ];

  // Carousel data
  const slides = [
    {
      content: <EnergyPerformanceTable data={breakdownData} />,
    },
    {
      content: <PerformanceSection recData={recData} />,
    },
  ];

  // Carousel navigation
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card className="m-4" >
      <CardHeader></CardHeader>
      <CardBody>
        {epcData && (
          <div className="overflow-hidden">
            <div className="relative h-full w-full flex-1">
              <div className="mx-6">
                <h3 className="font-semibold mb-2">
                  Energy Performance Certificate (EPC)
                </h3>
                <span className=" text-gray-500 text-xs">
                  This property&apos;s current energy rating is{" "}
                  <strong>{epcData?.CURRENT_ENERGY_RATING}</strong>. It has the
                  potential to be{" "}
                  <strong>{epcData?.POTENTIAL_ENERGY_RATING}</strong>.
                  <svg
                    aria-hidden="true"
                    x="515"
                    y="320"
                    width="50"
                    height="30"
                    className={`rating-current rating-label`}
                  >
                    <polygon
                      points="0,15 15,30 60,30 60,0 15,0 0,15"
                      className={`${currentColour.class}`}
                    ></polygon>
                    <text x="20" y="20" className="govuk-!-font-weight-bold">
                      {epcData?.CURRENT_ENERGY_EFFICIENCY}{" "}
                      {epcData?.CURRENT_ENERGY_RATING}
                    </text>
                  </svg>
                </span>
                <ECPBarChart
                  data={epcData}
                  setCurrentColour={setCurrentColour}
                />
              </div>

              <div className="w-full overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                      <div className="mx-2 p-4 bg-white rounded-lg">
                        {slide.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
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
          </div>
        )}
      </CardBody>
    </Card>
  );
}
