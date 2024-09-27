"use client";
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { DistributionPieChart } from "./Charts/DistributionPieChart";
import { ScatterChartComponent } from "./Charts/MarketScatterChart";
import { DistributionBarChart } from "./Charts/DistributionBarChart";
import { formatPrice } from "@/utils/Helper";
import { useState } from "react";
import { Icon } from "@iconify/react";

export function HomeTypesCard({ city }) {
  const [minMaxData, setMinMaxData] = useState({});
  const [data, setData] = useState([]);
  const [barchart, setbarchart] = useState({
    type: "",
    name: "detached",
    value: "",
  });

  function analyzePrices(data) {
    const prices = data
      .map((item) => parseFloat(item._source?.pricing?.internalValue))
      .filter((price) => !isNaN(price));

    prices.sort((a, b) => a - b);

    const min = prices[0];
    const max = prices[prices.length - 1];

    let median;
    const mid = Math.floor(prices.length / 2);
    if (prices.length % 2 === 0) {
      median = (prices[mid - 1] + prices[mid]) / 2;
    } else {
      median = prices[mid];
    }

    return {
      min: formatPrice(min),
      max: formatPrice(max),
      median: formatPrice(median),
    };
  }

  useEffect(() => {
    const getHouseTypeData = async (city) => {
      try {
        const response = await fetch(
          `/api/indevisual/get-listing-data-by-city`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ city: city }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
          const data = analyzePrices(result);
          setMinMaxData(data);
        }
      } catch (error) {}
    };

    getHouseTypeData(city);
  }, [city]);

  return (
    <Card className="m-4" style={{ maxHeight: "900px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-green-400 rounded-full mr-2">
            <Icon
              icon="carbon:home"
              width={16} // Adjust the icon size to fit well within the circle
              className="" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            What type of Homes available for sale by home type, beds & price
            range?
          </h2>
        </div>
        {/* <h4 className='pl-4 text-gray-500 font-medium'>Homes available for sale by home type, beds & price range
        </h4> */}
      </CardHeader>
      <CardBody>
        <div className="h-full  rounded-md p-4">
          <div className="flex flex-col justify-between gap-y-4 h-full layout-single md:fullbleed">
            {/* Home Types Distribution Section */}
            <div className="flex flex-row flex-wrap gap-8">
              <div className="flex flex-col gap-y-2 flex-1 basis-96">
                <div className="text-xl font-semibold">
                  Home Types Distribution
                </div>

                <div className="grid relative md:pt-12/16 pt-15/16">
                 

                  <div className="grid relative  md:pt-12/16 pt-15/16">
                    <DistributionPieChart
                      main_data={data}
                      setbarchart={setbarchart}
                    />
                  </div>
                </div>
              </div>

              {/* Home Price Distribution Section */}
              <div className="flex  flex-col gap-y-2 flex-1 basis-80">
                <div className="text-xl font-semibold">
                  Home Price Distribution
                </div>

                <div className="flex flex-col gap-3 md:flex-row justify-between">
                  <div className="flex flex-col items-start">
                    <div className="  lg:mb-1">Min</div>
                    <div className="text-lime-500">
                      <span className="text-4xl text-2xl lg:text-3xl">
                        £{minMaxData.min}
                      </span>
                    </div>
                  </div>
                  <div className="justify-self-end">
                    <div className="flex flex-col items-start">
                      <div className="  lg:mb-1">Median</div>
                      <div className="text-amber-500">
                        <span className="text-4xl text-2xl lg:text-3xl">
                          £{minMaxData.median}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="justify-self-end">
                    <div className="flex flex-col items-start">
                      <div className="text-zdsecondary-600 dark:text-zdsecondary-300 lg:mb-1">
                        Max
                      </div>
                      <div className="text-red-500">
                        <span className="text-4xl text-2xl lg:text-3xl">
                          £{minMaxData.max}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="self-center  pt-4 text-sm lg:text-base text-zd-600">
                  Houses
                </span>
                <div
                  className="relative flex-1 font-mono pt-9/16"
                  style={{ width: "100%" }}
                >
                  <div className="absolute hidden md:block inset-0 flex items-center justify-center">
                    <DistributionBarChart
                      main_data={data}
                      barchart={barchart}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
