import {
  marketCompStore,
  useDemographicStore,
  useListingStore,
} from "@/store/listingStore";
import { formatCurrency } from "@/utils/Helper";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

function DataShows({ postcode }) {
  const { populationData, educationData } = useDemographicStore();
  const { walkScore } = useListingStore();
  const { medianPrice } = marketCompStore();

  const calculateCollegeDegreePercentage = () => {
    if (educationData?._source) {
      const totalPopulation = parseInt(
        educationData._source[
          "Highest level of qualification: Total: All usual residents aged 16 years and over"
        ]
      );
      const level4AndAbove = parseInt(
        educationData._source[
          "Highest level of qualification: Level 4 qualifications and above"
        ]
      );

      if (totalPopulation && level4AndAbove) {
        return ((level4AndAbove / totalPopulation) * 100).toFixed(2);
      }
    }
    return "N/A";
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
            Is {postcode} A Good Place To Live?
          </h2>
        </div>
      </CardHeader>

      <div className="p-6  rounded-lg">
        <div className="space-y-6">
          {/* Highlights Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-2">{postcode}</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="text-2xl font-bold">{populationData}</p>
                <p>Total Population</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{walkScore}</p>
                <p>Walk Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  £{formatCurrency(medianPrice)}
                </p>
                <p>Average Home Price</p>
              </div>
              <div>
                <p className="text-2xl font-bold">£1,342</p>
                <p>Median Rent</p>
              </div>
            </div>
          </div>

          {/* Neighbours Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Who are your {postcode} neighbours
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              The demographics of a place can be a fair indicator of how
              neighborly a place is. 42% of the households in Allandale are
              renter-occupied.
            </p>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="text-2xl font-bold">
                  {calculateCollegeDegreePercentage()}%
                </p>
                <p>College Degree</p>
              </div>
              <div>
                <p className="text-2xl font-bold">58%</p>
                <p>Full time Employment</p>
              </div>
              <div>
                <p className="text-2xl font-bold">42%</p>
                <p>Renters</p>
              </div>
              <div>
                <p className="text-2xl font-bold">58%</p>
                <p>Owners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DataShows;
