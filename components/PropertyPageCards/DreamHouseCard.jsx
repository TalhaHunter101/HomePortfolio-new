"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { DreamHouseLineChart } from "./Charts/LineChartDreamHouse";
import { Icon } from "@iconify/react";

const calculateStats = (data, propertyType) => {


  if (!data || data.length === 0) {
    console.log(`No data available for property type: ${propertyType}`);
    return null;
  }

  const currentYear = new Date().getFullYear();
  const oneYearAgo = currentYear - 1;


  const prices = data
    .filter(
      (item) => {
        const itemYear = parseInt(item._source.deed_date.split('-')[0]);
        const isIncluded = 
          item._source?.property_type === propertyType &&
          item._source?.price_paid &&
          item._source?.deed_date &&
          itemYear >= oneYearAgo;
        return isIncluded;
      }
    )
    .map((item) => ({
      price_paid: parseInt(item._source.price_paid),
      deed_date: new Date(item._source.deed_date),
    }))
    .sort((a, b) => b.deed_date - a.deed_date);


  if (prices.length === 0) {
    console.log(`No valid prices found for property type: ${propertyType}`);
    return null;
  }

  const median = prices[Math.floor(prices.length / 2)].price_paid;
  const minPrice = Math.min(...prices.map(p => p.price_paid));
  const maxPrice = Math.max(...prices.map(p => p.price_paid));

  // Calculate percentage change in 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const recentPrices = prices.filter((item) => item.deed_date >= threeMonthsAgo);
  const olderPrices = prices.filter((item) => item.deed_date < threeMonthsAgo);



  let percentageChange = null;
  if (recentPrices.length > 0 && olderPrices.length > 0) {
    const recentMedian = recentPrices[Math.floor(recentPrices.length / 2)].price_paid;
    const olderMedian = olderPrices[Math.floor(olderPrices.length / 2)].price_paid;
    percentageChange = ((recentMedian - olderMedian) / olderMedian) * 100;
  }

  const result = {
    median,
    minPrice,
    maxPrice,
    percentageChange,
  };

  return result;
};

export function DreamHouseCard({ pricePaidData }) {
  const [detachedStats, setDetachedStats] = useState(null);
  const [semiDetachedStats, setSemiDetachedStats] = useState(null);
  const [flatStats, setFlatStats] = useState(null);
  const [terracedStats, setTerracedStats] = useState(null);

  useEffect(() => {
    if (pricePaidData) {
      setDetachedStats(calculateStats(pricePaidData, "D"));
      setSemiDetachedStats(calculateStats(pricePaidData, "S"));
      setFlatStats(calculateStats(pricePaidData, "F"));
      setTerracedStats(calculateStats(pricePaidData, "T"));
    }
  }, [pricePaidData]);
  return (
    <Card className="m-4">
      <CardHeader>
        <div className="flex items-center my-2 ">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-green-400 rounded-full mr-2">
            <Icon
              icon="fluent-mdl2:insights"
              width={16} // Adjust the icon size to fit well within the circle
              className="" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            Gain insight into current & past market trends
          </h2>
        </div>

      </CardHeader>
      <CardBody>
        <div className="p-2 rounded-md">
          <span className="text-sm">
            Last month on average, Single Family homes sold for{" "}
            <span className="font-medium inline-block text-base text-green-600">
              £207K
            </span>{" "}
            more than Condos.
          </span>
          <span className="block text-sm ">
            Last month, sale price of Single Family homes decreased by{" "}
            <span className="font-medium inline-block text-base text-red-600">
              4.7%
            </span>{" "}
            whereas sale price of Condos decreased by{" "}
            <span className="font-medium inline-block text-base text-red-600">
              1.6%
            </span>
            , in comparison to its previous month.
          </span>

          <div className="flex justify-between flex-col  lg:flex-row gap-8 mt-4">
            <div className="lg:w-7/12 mt-28 ">
              <DreamHouseLineChart  data={pricePaidData} />
            </div>

            <div className="lg:w-5/12 py-3 hidden md:block ">
              <div className="grid gap-y-4 ">
                {/* Single Family Section */}

                {detachedStats && (
                  <div className="grid gap-y-1 ">
                    <div className="font-medium text-purple-500">Detached</div>

                    <ul className="grid gap-2 list-disc pt-2 pl-6">
                      <li>
                        Median Sale Price (last month):{" "}
                        <span className="font-medium inline-block text-base text-purple-500">
                          £{detachedStats.median.toLocaleString()}
                        </span>
                      </li>
                      <li>
                        Sale price range:{" "}
                        <span className="font-medium inline-block text-base text-purple-500">
                          £{detachedStats.minPrice.toLocaleString()}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium inline-block text-base text-purple-500">
                          £{detachedStats.maxPrice.toLocaleString()}
                        </span>
                      </li>
                      {detachedStats.percentageChange !== null && (
                        <li>
                          Sale price{" "}
                          <span className="text-sm">
                            (% change in 12 months)
                          </span>
                          :{" "}
                          <span
                            className={`font-medium inline-block text-base ${
                              detachedStats.percentageChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {detachedStats.percentageChange.toFixed(2)}%
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {semiDetachedStats && (
                  <div className="grid gap-y-1">
                    <div className="font-medium text-blue-600">
                      Semi-detached
                    </div>

                    <ul className="grid gap-2 list-disc pt-2 pl-6">
                      <li>
                        Median Sale Price (last month):{" "}
                        <span className="font-medium inline-block text-base text-blue-600">
                          £{semiDetachedStats.median.toLocaleString()}
                        </span>
                      </li>
                      <li>
                        Sale price range:{" "}
                        <span className="font-medium inline-block text-base text-blue-600">
                          £{semiDetachedStats.minPrice.toLocaleString()}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium inline-block text-base text-blue-600">
                          £{semiDetachedStats.maxPrice.toLocaleString()}
                        </span>
                      </li>

                      {semiDetachedStats.percentageChange !== null && (
                        <li>
                          Sale price{" "}
                          <span className="text-sm">
                            (% change in 12 months)
                          </span>
                          :{" "}
                          <span
                            className={`font-medium inline-block text-base ${
                              semiDetachedStats.percentageChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {semiDetachedStats.percentageChange.toFixed(2)}%
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {flatStats && (
                  <div className="grid gap-y-1">
                    <div className="font-medium text-gray-600">Flat</div>

                    <ul className="grid gap-2 list-disc pt-2 pl-6">
                      <li>
                        Median Sale Price (last month):{" "}
                        <span className="font-medium inline-block text-base text-blue-600">
                          £{flatStats.median.toLocaleString()}
                        </span>
                      </li>
                      <li>
                        Sale price range:{" "}
                        <span className="font-medium inline-block text-base text-blue-600">
                          £{flatStats.minPrice.toLocaleString()}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium inline-block text-base text-blue-600">
                          £{flatStats.maxPrice.toLocaleString()}
                        </span>
                      </li>

                      {flatStats.percentageChange !== null && (
                        <li>
                          Sale price{" "}
                          <span className="text-sm">
                            (% change in 12 months)
                          </span>
                          :{" "}
                          <span
                            className={`font-medium inline-block text-base ${
                              flatStats.percentageChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {flatStats.percentageChange.toFixed(2)}%
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
