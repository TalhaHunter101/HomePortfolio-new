import React from "react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";

function DataOverview({ postcode = "M1 1AE" }) {
  // Static dummy data for demonstration
  const populationData = 477084;
  const walkScore = 75;
  const medianPrice = 300000;
  const medianRent = "1,500 pcm";

  return (
    <Card className="m-2 sm:m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          {/* <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:account-group"
              width={16}
              className="text-purple-700"
            />
          </div> */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-700">
            Is {postcode}, A Good Place To Live?
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
                  {populationData !== null ? (
                    <>
                      {populationData}
                      <Icon
                        icon="mdi:account-group"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>

              {/* Walk Score */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Walk Score
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {walkScore !== null ? (
                    <>
                      {walkScore}
                      <Icon
                        icon="fa-solid:walking"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>

              {/* Average Home Price */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Average Home Price
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {medianPrice !== null ? (
                    <>
                      £{medianPrice.toLocaleString()}
                      <Icon
                        icon="f7:house-fill"
                        height={32}
                        className="inline pb-2"
                      />
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>

              {/* Median Rent */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1">
                  Median Rent
                </span>
                <div className="text-2xl sm:text-4xl font-medium text-purple-300">
                  {medianRent ? (
                    <>
                      {medianRent}
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

          {/* Additional Sections like Neighbours can be added here */}
        </div>
      </div>
    </Card>
  );
}

export default DataOverview;
