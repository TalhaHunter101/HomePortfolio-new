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
  const [averageIncome, setAverageIncome] = useState(0);
  const [compositionData, setCompositionData] = useState([]);
  const [economicData, setEconomicData] = useState([]);
  const [medianAge, setMedianAge] = useState(null);

  const {
    singleFamilyHouseholds,
    setEducationData: setSingleEducationData,
    setTenureAllData,
    setEconomicActivityData,
  } = useDemographicStore();

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
          "/api/indevisual/demographic/get-composition-data",
          "/api/indevisual/demographic/get-economic-data",
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
          fetchedCompositionData,
          fetchedEconomicData,
        ] = await Promise.all(fetchData);

        setPeopleGenderData(fetchedPeopleGenderData);
        setOccupationData(fetchedOccupationData);
        setTenureData(fetchedTenureData);
        setHousingData(fetchedHousingData);
        setTotalPopulation(fetchedTotalPopulationData);
        setAgePopulationData(fetchedAgePopulationData);
        setEducationData(fetchedEducationData);
        setCompositionData(fetchedCompositionData);
        setEconomicData(fetchedEconomicData);
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
    if (tenureData) {
      setTenureAllData(tenureData);
    }
    if (economicData) {
      setEconomicActivityData(economicData);
    }
  }, [
    educationData,
    setSingleEducationData,
    setTenureAllData,
    tenureData,
    setEconomicActivityData,
    economicData,
  ]);

  const calculateMedianAge = (ageData) => {
    const ageRanges = [
      { range: "0-4", count: parseInt(ageData["Age: Aged 4 years and under"]) },
      { range: "5-9", count: parseInt(ageData["Age: Aged 5 to 9 years"]) },
      { range: "10-14", count: parseInt(ageData["Age: Aged 10 to 14 years"]) },
      { range: "15-19", count: parseInt(ageData["Age: Aged 15 to 19 years"]) },
      { range: "20-24", count: parseInt(ageData["Age: Aged 20 to 24 years"]) },
      { range: "25-29", count: parseInt(ageData["Age: Aged 25 to 29 years"]) },
      { range: "30-34", count: parseInt(ageData["Age: Aged 30 to 34 years"]) },
      { range: "35-39", count: parseInt(ageData["Age: Aged 35 to 39 years"]) },
      { range: "40-44", count: parseInt(ageData["Age: Aged 40 to 44 years"]) },
      { range: "45-49", count: parseInt(ageData["Age: Aged 45 to 49 years"]) },
      { range: "50-54", count: parseInt(ageData["Age: Aged 50 to 54 years"]) },
      { range: "55-59", count: parseInt(ageData["Age: Aged 55 to 59 years"]) },
      { range: "60-64", count: parseInt(ageData["Age: Aged 60 to 64 years"]) },
      { range: "65-69", count: parseInt(ageData["Age: Aged 65 to 69 years"]) },
      { range: "70-74", count: parseInt(ageData["Age: Aged 70 to 74 years"]) },
      { range: "75-79", count: parseInt(ageData["Age: Aged 75 to 79 years"]) },
      { range: "80-84", count: parseInt(ageData["Age: Aged 80 to 84 years"]) },
      { range: "85+", count: parseInt(ageData["Age: Aged 85 years and over"]) },
    ];

    const totalPopulation = ageRanges.reduce(
      (acc, ageRange) => acc + ageRange.count,
      0
    );
    const middlePopulation = totalPopulation / 2;

    let cumulativePopulation = 0;
    for (let i = 0; i < ageRanges.length; i++) {
      cumulativePopulation += ageRanges[i].count;
      if (cumulativePopulation >= middlePopulation) {
        const [lowerBound, upperBound] = ageRanges[i].range
          .split("-")
          .map(Number);
        return upperBound ? (lowerBound + upperBound) / 2 : lowerBound;
      }
    }
    return "N/A"; // In case median can't be calculated.
  };

  useEffect(() => {
    if (agePopulationData?._source) {
      const calculatedMedianAge = calculateMedianAge(agePopulationData._source);
      setMedianAge(calculatedMedianAge);
    }
  }, [agePopulationData]);

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
              compositionData={compositionData}
              agePopulationData={agePopulationData}
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
                <span className="font-semibold text-3xl text-purple-300">
                  {medianAge || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-14">
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Average HH Income</span>
                <span className="font-semibold text-3xl text-purple-300">
                  £{formatCurrency(peopleGenderData?.averageIncome) || "N/A"}
                </span>
              </div>
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">
                  Single Family Household
                </span>
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
