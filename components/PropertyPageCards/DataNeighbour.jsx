import React from "react";
import {
  marketCompStore,
  useDemographicStore,
  useListingStore,
} from "@/store/listingStore";
import { formatCurrency } from "@/utils/Helper";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader, Spinner, Image } from "@nextui-org/react";

function DataNeighbour({ postcode, ShortAddress }) {
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
      return (((socialRented + privateRented) / totalHouseholds) * 100).toFixed(
        0
      );
    }
    return null;
  };

  const calculateOwnersPercentage = () => {
    const totalHouseholds = parseInt(
      tenureAllData?._source?.["Tenure of household: Total: All households"]
    );
    const ownsOutright =
      parseInt(tenureAllData?._source?.["Tenure of household: Owned"]) +
      parseInt(
        tenureAllData?._source?.["Tenure of household: Shared ownership"]
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

  // Check if data is available
  const isDataAvailable =
    educationData &&
    educationData._source &&
    Object.keys(educationData._source).length > 0 &&
    tenureAllData &&
    tenureAllData._source &&
    Object.keys(tenureAllData._source).length > 0 &&
    economicActivityData &&
    economicActivityData._source &&
    Object.keys(economicActivityData._source).length > 0;

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
            Who are your {ShortAddress} neighbours?
          </h2>
        </div>
      </CardHeader>

      {isDataLoading ? (
        <CardBody className="flex flex-col items-center justify-center">
          <Spinner size="lg" />
          <div className="text-gray-500 text-lg mt-4">Loading data...</div>
        </CardBody>
      ) : isDataAvailable ? (
        <div className="p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-4">
                The demographics of a place can be a fair indicator of how
                neighborly a place is.{" "}
                {calculateRentersPercentage() ?? "N/A"}% of the households in{" "}
                {postcode} are renter-occupied.
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
          </div>
        </div>
      ) : (
        <CardBody className="flex flex-col items-center justify-center">
          <Image
            src="/undraw_no_data_re_kwbl (1).svg"
            alt="No data found"
            className="w-40 h-40 mb-4"
          />
          <div className="text-gray-500 text-lg">No data available</div>
        </CardBody>
      )}
    </Card>
  );
}

export default DataNeighbour;
