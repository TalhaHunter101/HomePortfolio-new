"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Peoplegender from "./Demographic/Peoplegender";
import HouseTypeData from "./Demographic/HouseData/HouseTypeData";
import HouseTenure from "./Demographic/HouseData/HouseTenure";
import HouseOccupation from "./Demographic/HouseData/HouseOccupation";

export function FamilyCard({ postcode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [peopleGenderData, setPeopleGenderData] = useState([]);
  const [housingData, setHousingData] = useState([]);
  const [tenureData, setTenureData] = useState([]);
  const [occupationData, setOccupationData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = [
          "/api/indevisual/demographic/get-people-gender-data",
          "/api/indevisual/demographic/get-house-occupation-data",
          "/api/indevisual/demographic/get-house-tenure-data",
          "/api/indevisual/demographic/get-house-type-data",
        ];

        const fetchData = endpoints.map((endpoint) =>
          fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postcode }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
        );

        const [
          fetchedPeopleGenderData,
          fetchedOccupationData,
          fetchedTenureData,
          fetchedHousingData,
        ] = await Promise.all(fetchData);

        setPeopleGenderData(fetchedPeopleGenderData);
        setOccupationData(fetchedOccupationData);
        setTenureData(fetchedTenureData);
        setHousingData(fetchedHousingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [postcode]);

  // Carousel navigation functions
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1));
  };

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardBody>
        <div className="relative w-full overflow-hidden rounded-lg">
          {/* Carousel Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: "100%", // Adjusted for two slides
            }}
          >
           
            <div className="flex-shrink-0 w-full">
              <Peoplegender PeopleGenderData={peopleGenderData} />
            </div>

            {/* Slide 2 */}
            <div className="flex-shrink-0 w-full">
              <div className="grid grid-rows-1 md:grid-rows-3 gap-4">
                <HouseTypeData housingData={housingData} />
                <HouseTenure tenureData={tenureData} />
                <HouseOccupation occupationData={occupationData} />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
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
      </CardBody>
    </Card>
  );
}
