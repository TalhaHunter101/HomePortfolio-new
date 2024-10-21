import {
  marketCompStore,
  useDemographicStore,
  useListingStore,
} from "@/store/listingStore";
import { formatCurrency } from "@/utils/Helper";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import React from "react";

function DataShows({ postcode, rentData,ShortAddress }) {
  const { populationData, educationData, isDataLoading } =
    useDemographicStore();
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
      return ((level4AndAbove / totalPopulation) * 100).toFixed(2);
    }
    return "N/A";
  };

  return (
    <Card className="m-2 sm:m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:account-group"
              width={16}
              className="text-purple-700"
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-700">
            Is {ShortAddress}, A Good Place To Live?
          </h2>
        </div>
      </CardHeader>

      <div className="p-4 sm:p-6 rounded-lg">
        <div className="space-y-6">
          {/* Highlights Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-2">
              <Icon
                icon="mdi:stars"
                width={30}
                height={24}
                className="inline"
              />{" "}
              {postcode}: Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 pt-4">
              {/* Total Population */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Total Population
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {isDataLoading ? (
                    <Spinner />
                  ) : populationData === null ? (
                    "N/A"
                  ) : (
                    <>
                      {populationData}
                      <Icon
                        icon="mdi:account-group"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Walk Score */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Walk Score
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {isDataLoading ? (
                    <Spinner />
                  ) : walkScore === null ? (
                    "N/A"
                  ) : (
                    <>
                      {walkScore}
                      <Icon
                        icon="fa-solid:walking"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Average Home Price */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Average Home Price
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {isDataLoading ? (
                    <Spinner />
                  ) : medianPrice === null ? (
                    "N/A"
                  ) : (
                    <>
                      £{formatCurrency(medianPrice)}{" "}
                      <Icon
                        icon="f7:house-fill"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Median Rent */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Median Rent
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {rentData[0]?._source?.median_rent ? (
                    <>
                      {rentData[0]?._source?.median_rent
                        .replace("pcm", "")
                        .trim()}
                      <Icon
                        icon="mage:building-b"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Neighbours Section */}
        </div>
      </div>
    </Card>
  );
}

export default DataShows;
