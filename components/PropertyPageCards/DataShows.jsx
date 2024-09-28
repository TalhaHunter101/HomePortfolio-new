import {
  marketCompStore,
  useDemographicStore,
  useListingStore,
} from "@/store/listingStore";
import { formatCurrency } from "@/utils/Helper";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

function DataShows({ postcode, rentData }) {
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
            Is {postcode}, A Good Place To Live?
          </h2>
        </div>
      </CardHeader>

      <div className="p-6  rounded-lg">
        <div className="space-y-6">
          {/* Highlights Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-2">
              <Icon
                icon="mdi:stars"
                width="38"
                height="30"
                className="inline "
              />{" "}
              {postcode}: Higlights
            </h2>
            <div className="grid grid-cols-2 gap-4 text-gray-600 pt-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">
                  Total Population
                </p>
                <p className="text-4xl font-medium text-purple-300 ">
                  {populationData}
                  <Icon
                    icon="mdi:account-group"
                    height={48}
                    className="inline pb-2"
                  />
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">
                  Walk Score
                </p>
                <p className="text-4xl font-medium text-purple-300 ">
                  {walkScore}{" "}
                  <Icon
                    icon="fa-solid:walking"
                    height={48}
                    className="inline pb-2"
                  />
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">
                  Average Home Price
                </p>
                <p className="text-4xl font-medium text-purple-300 ">
                  £{formatCurrency(medianPrice)}{" "}
                  <Icon
                    icon="f7:house-fill"
                    height={40}
                    className="inline pb-2"
                  />
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">
                  Median Rent
                </p>
                <p className="text-4xl font-medium text-purple-300 ">
                {rentData[0]?._source?.median_rent.replace("pcm", "").trim()}
                  <Icon
                    icon="mage:building-b"
                    height={48}
                    className="inline pb-2"
                  />
                </p>
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
