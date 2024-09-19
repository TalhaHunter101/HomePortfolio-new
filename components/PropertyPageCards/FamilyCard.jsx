"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Peoplegender from "./Demographic/Peoplegender";
import HouseTypeData from "./Demographic/HouseData/HouseTypeData";
import HouseTenure from "./Demographic/HouseData/HouseTenure";
import HouseOccupation from "./Demographic/HouseData/HouseOccupation";

export function FamilyCard({ postcode, city }) {
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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  };

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
     <CardHeader>
  <div className="flex items-center m-5">
    <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
      <Icon
        icon="mdi:account-group"
        width={16} // Adjust the icon size to fit well within the circle
        className="text-purple-700" // Adjust the icon color if needed
      />
    </div>
    <h2 className="text-xl font-bold text-gray-700">What are the demographics here?</h2>
  </div>
</CardHeader>
      <CardBody>
        <div className="relative w-full overflow-hidden rounded-lg">
          {/* Carousel Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: "100%",
            }}
          >
            {/* Slide 1 */}
            <div className="flex-shrink-0 w-full">
              <Peoplegender PeopleGenderData={peopleGenderData} city={city} />
            </div>

            {/* Slide 2 */}
            <div className="flex-shrink-0 w-full">
              <HouseTypeData housingData={housingData} city={city} />
            </div>

            {/* Slide 3 */}
            <div className="flex-shrink-0 w-full">
              <HouseTenure tenureData={tenureData} city={city} />
            </div>

            {/* Slide 4 */}
            <div className="flex-shrink-0 w-full">
              <HouseOccupation occupationData={occupationData} city={city} />
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
