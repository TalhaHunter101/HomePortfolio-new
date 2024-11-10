"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Spinner, Image } from "@nextui-org/react";
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
    .filter((item) => {
      const itemYear = parseInt(item?._source?.deed_date?.split("-")[0]);
      return (
        item?._source?.property_type === propertyType &&
        item?._source?.price_paid &&
        item?._source?.deed_date &&
        itemYear >= oneYearAgo
      );
    })
    .map((item) => ({
      price_paid: parseInt(item?._source?.price_paid),
      deed_date: new Date(item?._source?.deed_date),
    }))
    .sort((a, b) => b.deed_date - a.deed_date);

  if (prices.length === 0) {
    console.log(`No valid prices found for property type: ${propertyType}`);
    return null;
  }

  const median = prices[Math.floor(prices.length / 2)].price_paid;
  const minPrice = Math.min(...prices.map((p) => p.price_paid));
  const maxPrice = Math.max(...prices.map((p) => p.price_paid));

  // Calculate percentage change in 12 months
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
  const recentPrices = prices.filter((item) => item.deed_date >= twelveMonthsAgo);
  const olderPrices = prices.filter((item) => item.deed_date < twelveMonthsAgo);

  let percentageChange = null;
  if (recentPrices.length > 0 && olderPrices.length > 0) {
    const recentMedian =
      recentPrices[Math.floor(recentPrices.length / 2)].price_paid;
    const olderMedian =
      olderPrices[Math.floor(olderPrices.length / 2)].price_paid;
    percentageChange = ((recentMedian - olderMedian) / olderMedian) * 100;
  }

  return {
    median,
    minPrice,
    maxPrice,
    percentageChange,
  };
};

export function DreamHouseCard({ pricePaidData }) {
  const [detachedStats, setDetachedStats] = useState(null);
  const [semiDetachedStats, setSemiDetachedStats] = useState(null);
  const [flatStats, setFlatStats] = useState(null);
  const [terracedStats, setTerracedStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    if (pricePaidData) {
      setDetachedStats(calculateStats(pricePaidData, "D"));
      setSemiDetachedStats(calculateStats(pricePaidData, "S"));
      setFlatStats(calculateStats(pricePaidData, "F"));
      setTerracedStats(calculateStats(pricePaidData, "T"));
      setIsDataAvailable(pricePaidData.length > 0);
      setIsLoading(false);
    } else {
      setIsDataAvailable(false);
      setIsLoading(false);
    }
  }, [pricePaidData]);

  return (
    <Card className="m-4">
      <CardHeader>
        <div className="flex items-center my-2 ">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-green-400 rounded-full mr-2">
            <Icon icon="fluent-mdl2:insights" width={16} className="" />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            Gain insight into current & past market trends
          </h2>
        </div>
      </CardHeader>

      {isLoading ? (
        <CardBody className="flex flex-col items-center justify-center">
          <Spinner size="lg" />
          <div className="text-gray-500 text-lg mt-4">Loading data...</div>
        </CardBody>
      ) : isDataAvailable ? (
        <CardBody>
          <div className="p-2 rounded-md">
            <span className="text-sm">
              Last month on average, Single Family homes sold for{" "}
              <span className="font-medium inline-block text-base text-green-600">
                £{detachedStats?.median?.toLocaleString() ?? "N/A"}
              </span>{" "}
              more than Condos.
            </span>
            <span className="block text-sm ">
              Last month, sale price of Single Family homes{" "}
              {detachedStats?.percentageChange !== null
                ? detachedStats.percentageChange > 0
                  ? "increased"
                  : "decreased"
                : "changed"}{" "}
              by{" "}
              <span
                className={`font-medium inline-block text-base ${
                  detachedStats?.percentageChange > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {detachedStats?.percentageChange
                  ? `${detachedStats.percentageChange.toFixed(2)}%`
                  : "N/A"}
              </span>{" "}
              whereas sale price of Condos{" "}
              {flatStats?.percentageChange !== null
                ? flatStats.percentageChange > 0
                  ? "increased"
                  : "decreased"
                : "changed"}{" "}
              by{" "}
              <span
                className={`font-medium inline-block text-base ${
                  flatStats?.percentageChange > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {flatStats?.percentageChange
                  ? `${flatStats.percentageChange.toFixed(2)}%`
                  : "N/A"}
              </span>
              , in comparison to its previous month.
            </span>

            <div className="flex justify-between flex-col lg:flex-row gap-8 mt-4">
              <div className="lg:w-7/12 mt-28">
                <DreamHouseLineChart data={pricePaidData} />
              </div>

              <div className="lg:w-5/12 py-3 hidden md:block">
                <div className="grid gap-y-4">
                  {detachedStats && (
                    <div className="grid gap-y-1">
                      <div className="font-medium text-purple-500">
                        Detached
                      </div>
                      <ul className="grid gap-2 list-disc pt-2 pl-6">
                        <li>
                          Median Sale Price (last month):{" "}
                          <span className="font-medium inline-block text-base text-purple-500">
                            £{detachedStats.median?.toLocaleString() ?? "N/A"}
                          </span>
                        </li>
                        <li>
                          Sale price range:{" "}
                          <span className="font-medium inline-block text-base text-purple-500">
                            £{detachedStats.minPrice?.toLocaleString() ?? "N/A"}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium inline-block text-base text-purple-500">
                            £{detachedStats.maxPrice?.toLocaleString() ?? "N/A"}
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
                            £
                            {semiDetachedStats.median?.toLocaleString() ??
                              "N/A"}
                          </span>
                        </li>
                        <li>
                          Sale price range:{" "}
                          <span className="font-medium inline-block text-base text-blue-600">
                            £
                            {semiDetachedStats.minPrice?.toLocaleString() ??
                              "N/A"}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium inline-block text-base text-blue-600">
                            £
                            {semiDetachedStats.maxPrice?.toLocaleString() ??
                              "N/A"}
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
                          <span className="font-medium inline-block text-base text-gray-600">
                            £{flatStats.median?.toLocaleString() ?? "N/A"}
                          </span>
                        </li>
                        <li>
                          Sale price range:{" "}
                          <span className="font-medium inline-block text-base text-gray-600">
                            £{flatStats.minPrice?.toLocaleString() ?? "N/A"}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium inline-block text-base text-gray-600">
                            £{flatStats.maxPrice?.toLocaleString() ?? "N/A"}
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
