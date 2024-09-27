"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Peoplegender from "./Demographic/Peoplegender";
import HouseTypeData from "./Demographic/HouseData/HouseTypeData";
import HouseTenure from "./Demographic/HouseData/HouseTenure";
import HouseOccupation from "./Demographic/HouseData/HouseOccupation";
import AgePopulationData from "./Demographic/AgePopulationData";
import { Familyinformation } from "./Demographic/Familyinformation";
import {
  marketCompStore,
  useDemographicStore,
  useListingStore,
} from "@/store/listingStore";
import { formatCurrency } from "@/utils/Helper";

export function FamilyCard({ postcode, city }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [peopleGenderData, setPeopleGenderData] = useState([]);
  const [housingData, setHousingData] = useState([]);
  const [tenureData, setTenureData] = useState([]);
  const [occupationData, setOccupationData] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState([]);
  const [agePopulationData, setAgePopulationData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const { walkScore } = useListingStore();
  const { medianPrice } = marketCompStore();
  const { singleFamilyHouseholds, setEducationData: setSingleEducationData } =
    useDemographicStore();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = [
          "/api/indevisual/demographic/get-people-gender-data",
          "/api/indevisual/demographic/get-house-occupation-data",
          "/api/indevisual/demographic/get-house-tenure-data",
          "/api/indevisual/demographic/get-house-type-data",
          "/api/indevisual/demographic/get-total-population-data",
          "/api/indevisual/demographic/get-population-data-by-age",
          "/api/indevisual/demographic/get-education-data",
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
          fetchedTotalPopulationData,
          fetchedAgePopulationData,
          fetchedEducationData,
        ] = await Promise.all(fetchData);

        setPeopleGenderData(fetchedPeopleGenderData);
        setOccupationData(fetchedOccupationData);
        setTenureData(fetchedTenureData);
        setHousingData(fetchedHousingData);
        setTotalPopulation(fetchedTotalPopulationData);
        setAgePopulationData(fetchedAgePopulationData);
        setEducationData(fetchedEducationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [postcode, setSingleEducationData]);

  useEffect(() => {
    if (educationData) {
      setSingleEducationData(educationData);
    }
  }, [educationData, setSingleEducationData]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
  };

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:account-group"
              width={16}
              className="text-purple-700"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
          Can I raise a family in {postcode} ?
          </h2>
        </div>
      </CardHeader>

      {/* Static demographic section */}
      <div className="bg-white w-full mx-7">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* Left section */}
          <div className="lg:w-1/2">
            <Familyinformation
              postcode={postcode}
              city={city}
              housingData={housingData}
              totalPopulation={totalPopulation}
            />
          </div>

          {/* Right section */}
          <div className="lg:w-1/2 flex flex-col gap-4 text-gray-700 text-xl px-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Total Population</span>
                <span className="font-semibold text-3xl text-purple-300">
                  {
                    totalPopulation?._source?.[
                      "Sex: All persons; measures: Value"
                    ]
                  }
                </span>
              </div>
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Median Age</span>
                <span className="font-semibold text-3xl text-purple-300">38</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-14">
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Average HH Income</span>
                <span className="font-semibold text-3xl text-purple-300">
                  £{formatCurrency(medianPrice)}
                </span>
              </div>
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Single Family Household</span>
                <span className="font-semibold text-3xl text-purple-300">
                  {singleFamilyHouseholds}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full shadow-none  overflow-hidden mt-8">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: "100%",
          }}
        >
          {/* Slide 1 */}
          <div className="flex-shrink-0 w-full shadow-none">
            <AgePopulationData
              AgePopulationData={agePopulationData}
              city={city}
            />
          </div>

          <div className="flex-shrink-0 w-full shadow-none">
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
    </Card>
  );
}
