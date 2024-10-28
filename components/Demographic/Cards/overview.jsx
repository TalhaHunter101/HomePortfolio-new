import React from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import { userNewNeighbourhoodData, usePostcodeStore } from '@/store/neighbourhoodStore';

// Function for currency formatting
function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
}

function OverviewCard() {
  const { newNeighbourhoodData, isLoading } = userNewNeighbourhoodData();
  const { currentPostcode } = usePostcodeStore();

  // Assume that newNeighbourhoodData always exists for simplicity
  const data = newNeighbourhoodData || {};

  const totalPopulation = data["population"] || 0;
  const malePercentage = ((data["Sex: Male; measures: Value"] / totalPopulation) * 100).toFixed(0);
  const femalePercentage = ((data["Sex: Female; measures: Value"] / totalPopulation) * 100).toFixed(0);
  const medianAge = data["median_age"] || 0;
  const singleFamilyHouseholds = data["Single family Household"] || 0;
  const averageIncome = formatCurrency(data["Average Income"]);

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <CardHeader className="flex items-center">
            <h2 className="ml-2 font-bold text-lg text-gray-700">Overview</h2>
          </CardHeader>
          <CardBody className="text-gray-600">
            <p className="text-base sm:text-lg">
              The population of {currentPostcode} is <strong>{totalPopulation}</strong> with
              <strong>{malePercentage}%</strong> males and <strong>{femalePercentage}%</strong> females, and a
              median age of <strong>{medianAge}</strong>.
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>{((data["One Person household"] / data["Total households"]) * 100).toFixed(0) || 44}%</strong>
              of this neighborhood is occupied by families with <strong>{(singleFamilyHouseholds / totalPopulation).toFixed(0)}%</strong>
              single families, <strong>{((data["One Person household"] / totalPopulation) * 100).toFixed(0) || 44}%</strong>
              one-person households, and <strong>{((data["Single family Household"] / totalPopulation) * 100).toFixed(0) || 39}%</strong>
              couple families with kids.
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>{parseInt(data["edu_att_bachelors"] || "0")}%</strong> of residents in this neighborhood have a college degree.
            </p>
          </CardBody>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-gray-700 text-base sm:text-xl px-2">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Total Population</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : totalPopulation}
              </span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Median Age</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : medianAge}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 sm:mt-14">
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Average HH Income</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isLoading ? <Spinner /> : `${averageIncome}`}
              </span>
            </div>
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
