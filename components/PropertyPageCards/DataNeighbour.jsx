import {
    marketCompStore,
    useDemographicStore,
    useListingStore,
  } from "@/store/listingStore";
  import { formatCurrency } from "@/utils/Helper";
  import { Icon } from "@iconify/react";
  import { Card, CardBody, CardHeader } from "@nextui-org/react";
  import React from "react";
  
  function DataNeighbour({ postcode }) {
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
  
        <div className="p-6  rounded-lg">
          <div className="space-y-6">
            {/* Highlights Section */}
        
  
            {/* Neighbours Section */}
            <div>
              {/* <h2 className="text-lg font-semibold mb-2">
              <Icon icon="mdi:person-details" width={40} height={30} className="inline " />   Who are your {postcode} neighbours
              </h2> */}
              <p className="text-sm text-gray-500 mb-4">
                The demographics of a place can be a fair indicator of how
                neighborly a place is. 42% of the households in Allandale are
                renter-occupied.
              </p>
              <div className="grid grid-cols-2 gap-6 text-gray-600">
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">College Degree</p>
                  <p className="text-4xl font-medium text-blue-300 ">
                    {calculateCollegeDegreePercentage()}%
                  </p>
                  
                </div>
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">Full time Employment</p>
                  <p className="text-4xl font-medium text-blue-300">58%</p>
                  
                </div>
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">Renters</p>
                  <p className="text-4xl font-medium text-blue-300">42%</p>
                  
                </div>
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1 ">Owners</p>
                  <p className="text-4xl font-medium text-blue-300">58%</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  export default DataNeighbour;
  