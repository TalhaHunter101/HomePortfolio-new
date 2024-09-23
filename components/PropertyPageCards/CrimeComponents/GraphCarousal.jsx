"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { CrimeReportCard } from "./CarousalItems/TopRated";
import { BadgeCard } from "./CarousalItems/BadgeCard";
import CrimeTypesChart from "./CarousalItems/CrimesTypesChart";
import CrimeLevelsChart from "./CarousalItems/CrimeLevelsChart";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const components = [
    <BadgeCard key={0}  reportData={data}  />,
    <CrimeTypesChart key={1} reportData={data} />,
    <CrimeLevelsChart key={2} reportData={data} />,
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="py-7 text-foreground relative h-full w-full overflow-hidden flex-1">
      <div className="mt-4 relative">
        <div className="w-full overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {components.map((Component, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <div
                  className="mx-2 p-4 bg-white rounded-lg"
                  style={{ minHeight: "150px" }}
                >
                  <div className="flex w-full h-400 flex-row">{Component}</div>
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
  );
};

export default Carousel;
