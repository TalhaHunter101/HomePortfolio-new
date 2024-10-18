import {
  marketCompStore,
  useDemographicStore,
  useListingStore,
} from "@/store/listingStore";
import { formatCurrency } from "@/utils/Helper";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import React from "react";

function DataNeighbour({ postcode }) {
  const {
    populationData,
    educationData,
    tenureAllData,
    economicActivityData,
    isDataLoading,
  } = useDemographicStore();
  const { walkScore } = useListingStore();
  const { medianPrice } = marketCompStore();

  const calculateCollegeDegreePercentage = () => {
    const totalPopulation = parseInt(
      educationData?._source?.[
        "Highest level of qualification: Total: All usual residents aged 16 years and over"
      ]
    );
    const level4AndAbove = parseInt(
      educationData?._source?.[
        "Highest level of qualification: Level 4 qualifications and above"
      ]
    );

    if (totalPopulation && level4AndAbove) {
      return ((level4AndAbove / totalPopulation) * 100).toFixed(0);
    }
    return null;
  };

  const calculateRentersPercentage = () => {
    const totalHouseholds = parseInt(
      tenureAllData?._source?.["Tenure of household: Total: All households"]
    );
    const socialRented = parseInt(
      tenureAllData?._source?.["Tenure of household: Social rented"]
    );
    const privateRented = parseInt(
      tenureAllData?._source?.["Tenure of household: Private rented"]
    );

    if (totalHouseholds && (socialRented || privateRented)) {
      return (
        ((socialRented + privateRented) / totalHouseholds) *
          100
      ).toFixed(0);
    }
    return null;
  };

  const calculateOwnersPercentage = () => {
    const totalHouseholds = parseInt(
      tenureAllData?._source?.["Tenure of household: Total: All households"]
    );
    const ownsOutright = parseInt(
      tenureAllData?._source?.["Tenure of household: Owned: Owns outright"]
    );

    if (totalHouseholds && ownsOutright) {
      return ((ownsOutright / totalHouseholds) * 100).toFixed(0);
    }
    return null;
  };

  const calculateFullTimeEmploymentPercentage = () => {
    const totalActive = parseInt(
      economicActivityData?._source?.[
        "Economic activity status: Economically active (excluding full-time students)"
      ]
    );
    const inEmployment = parseInt(
      economicActivityData?._source?.[
        "Economic activity status: Economically active (excluding full-time students):In employment"
      ]
    );

    if (totalActive && inEmployment) {
      return ((inEmployment / totalActive) * 100).toFixed(0);
    }
    return null;
  };

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:person-details"
              width={16}
              className="text-purple-700"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            Who are your {postcode} neighbours?
          </h2>
        </div>
      </CardHeader>

      <div className="p-6 rounded-lg">
        <div className="space-y-6">
          {isDataLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                The demographics of a place can be a fair indicator of how
                neighborly a place is. {calculateRentersPercentage() ?? "N/A"}%
                of the households in {postcode} are renter-occupied.
              </p>
              <div className="grid grid-cols-2 gap-6 text-gray-600">
                {/* College Degree */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    College Degree
                  </p>
                  <div className="text-4xl font-medium text-purple-300">
                    {calculateCollegeDegreePercentage() !== null ? (
                      `${calculateCollegeDegreePercentage()}%`
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>

                {/* Full Time Employment */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Full time Employment
                  </p>
                  <div className="text-4xl font-medium text-purple-300">
                    {calculateFullTimeEmploymentPercentage() !== null ? (
                      `${calculateFullTimeEmploymentPercentage()}%`
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>

                {/* Renters */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Renters
                  </p>
                  <div className="text-4xl font-medium text-purple-300">
                    {calculateRentersPercentage() !== null ? (
                      `${calculateRentersPercentage()}%`
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>

                {/* Owners */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Owners
                  </p>
                  <div className="text-4xl font-medium text-purple-300">
                    {calculateOwnersPercentage() !== null ? (
                      `${calculateOwnersPercentage()}%`
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default DataNeighbour;
