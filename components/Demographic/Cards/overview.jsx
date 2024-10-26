import React from "react";
import { Card, CardHeader, CardBody, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useNeighbourhoodDemographicStore, usePostcodeStore } from "@/store/neighbourhoodStore";

// Dummy function for currency formatting
function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function OverviewCard() {
  const {
    populationData,
    accomadationData,
    compositionData,
    populationAgeData,
    educationData,
    isLoading
  } = useNeighbourhoodDemographicStore();

  const { currentPostcode } = usePostcodeStore();

  // Extract data from stores
  const population = populationData?.[0]?._source || {};
  const accommodation = accomadationData?.[0]?._source || {};
  const composition = compositionData?.[0]?._source || {};
  const ageData = populationAgeData?.[0]?._source || {};
  const education = educationData?.[0]?._source || {};

  const totalPopulation = population["Total Population"] || 470;
  const malePercentage = ((population["Male"] / totalPopulation) * 100).toFixed(0) || 46;
  const femalePercentage = ((population["Female"] / totalPopulation) * 100).toFixed(0) || 54;
  const medianAge = ageData["Median Age"] || 37;
  const singleFamilyHouseholds = composition["Single family household"] || 177;
  const averageIncome = formatCurrency(education["edu_att_some_college"]); // Use appropriate field if available

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left section - Overview description */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="flex items-center">
            <h2 className="ml-2 font-bold text-lg text-gray-700">Overview</h2>
          </CardHeader>
          <CardBody className="text-gray-600">
            <p className="text-base sm:text-lg">
              The population of {currentPostcode} is <strong>{totalPopulation}</strong> with{" "}
              <strong>{malePercentage}%</strong> males and <strong>{femalePercentage}%</strong> females, and a
              median age of <strong>{medianAge}</strong>.
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>{((composition["One person household"] / composition["Total households"]) * 100).toFixed(0) || 44}%</strong> 
              of this neighborhood is occupied by families with <strong>{(singleFamilyHouseholds / totalPopulation).toFixed(0)}%</strong> 
              single families, <strong>{((composition["One person household"] / totalPopulation) * 100).toFixed(0) || 44}%</strong> 
              one-person households, and <strong>{((composition["Single family household"] / totalPopulation) * 100).toFixed(0) || 39}%</strong> 
              couple families with kids. 
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>{parseInt(education["edu_att_bachelors"] || "0")}%</strong> of residents in this neighborhood have a college degree.
            </p>
          </CardBody>
        </div>

        {/* Right section - Key statistics */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-gray-700 text-base sm:text-xl px-2">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {/* Total Population */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Total Population</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : totalPopulation}
              </span>
            </div>

            {/* Median Age */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Median Age</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : medianAge}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 sm:mt-14">
            {/* Average HH Income */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Average HH Income</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : `£${averageIncome}`}
              </span>
            </div>

            {/* Single Family Household */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">
                Single Family Household
              </span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : singleFamilyHouseholds}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}


export default OverviewCard;
