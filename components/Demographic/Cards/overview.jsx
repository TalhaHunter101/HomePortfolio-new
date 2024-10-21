import React from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import { Icon } from '@iconify/react';

// Dummy function for currency formatting
function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
}

function OverviewCard({
  isDataLoading,
  totalPopulation,
  medianAge,
  peopleGenderData,
  singleFamilyHouseholds,
}) {
  return (
    <Card className="m-4 p-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left section - Overview description */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="flex items-center">
            {/* <Icon icon="mdi:account-group" width="32" height="32" className="text-purple-400" /> */}
            <h2 className="ml-2 font-bold text-lg text-gray-700">Overview</h2>
          </CardHeader>
          <CardBody className="text-gray-600">
            <p className="text-base sm:text-lg">
              The population of BS15 1TE is <strong>470</strong> with <strong>46%</strong> males
              and <strong>54%</strong> females, and a median age of <strong>37</strong>.
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>44%</strong> of this neighborhood is occupied by families with <strong>4%</strong> single families, 
              <strong>44%</strong> one-person households, and <strong>39%</strong> couple families with kids. 
              The average household size in BS15 1TE is <strong>2.22</strong>, and the average family size is 
              <strong>3.04</strong>.
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>56%</strong> of residents in this neighborhood have a college degree.
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
                {isDataLoading ? (
                  <Spinner />
                ) : totalPopulation?.length === 0 ? (
                  'N/A'
                ) : (
                  totalPopulation || '470' // default to 470 for now
                )}
              </span>
            </div>

            {/* Median Age */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Median Age</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isDataLoading ? (
                  <Spinner />
                ) : medianAge === null ? (
                  'N/A'
                ) : (
                  medianAge || '37' // default to 37 for now
                )}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 sm:mt-14">
            {/* Average HH Income */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Average HH Income</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isDataLoading ? (
                  <Spinner />
                ) : peopleGenderData?.averageIncome === undefined ? (
                  'N/A'
                ) : (
                  `£${formatCurrency(peopleGenderData?.averageIncome)}` || '£44,400' // default value
                )}
              </span>
            </div>

            {/* Single Family Household */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">Single Family Household</span>
              <span className="font-semibold text-2xl sm:text-3xl text-purple-400">
                {isDataLoading ? (
                  <Spinner />
                ) : singleFamilyHouseholds === undefined ? (
                  'N/A'
                ) : (
                  singleFamilyHouseholds || '177' // default value
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OverviewCard;
