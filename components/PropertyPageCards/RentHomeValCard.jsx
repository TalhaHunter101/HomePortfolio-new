"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Chip, Progress } from "@nextui-org/react";
import { useListingStore } from "@/store/listingStore";
import { formatNumberWithCommas } from "@/utils/Helper";

export function RentHomeValCard({ price, roi,setRentEstimate, uprn, data: newData }) {
  const [data, setData] = useState([]);
  const { squerfoot } = useListingStore();

  useEffect(() => {
    const getHomeThreeYearData = async () => {
      try {
        const res = await fetch("/api/indevisual/get-house-by-year", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uprn: "32092783" }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const results = await res.json();
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    if (uprn) {
      getHomeThreeYearData();
    }
  }, [uprn]);

  // Destructuring newData for easier access
  const { counts, analyticsTaxonomy } = newData || {};
  const numBedrooms = parseFloat(counts?.numBedrooms || 0);
  const sizeSqFeet = parseFloat(
    analyticsTaxonomy?.sizeSqFeet || squerfoot || 0
  ); // Avoid division by 0

  // Destructuring data for rent and sale estimates
  const rentEstimate = data[0]?._source?.rentEstimate?.currentPrice || 0;
  const saleEstimate = data[0]?._source?.saleEstimate?.currentPrice || 0;
  const lowerRentEstimate = data[0]?._source?.rentEstimate?.lowerPrice || 0;
  const upperRentEstimate = data[0]?._source?.rentEstimate?.upperPrice || 0;
  const lowerSaleEstimate = data[0]?._source?.saleEstimate?.lowerPrice || 0;
  const upperSaleEstimate = data[0]?._source?.saleEstimate?.upperPrice || 0;

setRentEstimate(rentEstimate);
  // Per square foot and per bedroom calculations
  const rentPerSqFt = rentEstimate / sizeSqFeet || 0;
  const rentPerBedroom = rentEstimate / numBedrooms || 0;
  const salePerSqFt = saleEstimate / sizeSqFeet || 0;
  const salePerBedroom = saleEstimate / numBedrooms || 0;

  // Progress bar calculations for rent and sale
  const rentProgress =
    upperRentEstimate > lowerRentEstimate
      ? ((rentEstimate - lowerRentEstimate) /
          (upperRentEstimate - lowerRentEstimate)) *
        100
      : 0;

  const saleProgress =
    upperSaleEstimate > lowerSaleEstimate
      ? ((saleEstimate - lowerSaleEstimate) /
          (upperSaleEstimate - lowerSaleEstimate)) *
        100
      : 0;

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardBody>
        {data.length === 0 ? (
          <div className="text-center">
            <p>No data available</p>
          </div>
        ) : (
          <div className="flex gap-2 p-2 flex-row bg-default-background border border-subtle-border rounded-md justify-between">
           {/* Left div for Sale Estimate */}
           <div className="w-1/2 rounded-lg shadow p-6 bg-white">
              <div className="items-center justify-center flex flex-col">
                <Chip
                  radius="lg"
                  className="text-sm font-semibold text-blue-600 bg-primary-50 px-2 py-1 mb-4 inline-block"
                >
                  Estimated Home Valuation
                </Chip>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  £{formatNumberWithCommas(saleEstimate)}
                </div>
                <div>
                  <Chip
                    radius="lg"
                    className="text-sm font-semibold text-blue-600 bg-primary-50 px-2 py-1 mb-4 inline-block"
                  >
                    {data[0]?._source?.saleEstimate?.confidenceLevel}
                  </Chip>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div>
                    £{salePerSqFt.toFixed(2)} <br />
                    <span>per sq.ft.</span>
                  </div>
                  <div className="mx-2 h-10 border-l border-gray-300"></div>
                  <div>
                    £{salePerBedroom.toFixed(2)} <br />
                    <span>per bedroom</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-gray-700 text-sm">
                <div className="flex w-full justify-between mb-2">
                  <div className="text-md text-gray-500">Low Estimate</div>
                  <div className="text-md text-gray-500">High Estimate</div>
                </div>
                <Progress
                  color="primary"
                  className="h-full w-full rounded-full bg-gradient-to-r from-primary-400 to-purple-600"
                  value={saleProgress}
                />
                <div className="flex w-full justify-between mt-2">
                  <div className="flex flex-col items-center">
                    <span className="font-bold">
                      £{formatNumberWithCommas(lowerSaleEstimate)}
                    </span>
                    <span className="text-xs">
                      £{salePerSqFt.toFixed(2)}/sq.ft.
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold">
                      £{formatNumberWithCommas(upperSaleEstimate)}
                    </span>
                    <span className="text-xs">
                      £{salePerSqFt.toFixed(2)}/sq.ft.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right div for Rent Estimate */}
            <div className="w-1/2 rounded-lg shadow p-6 bg-white">
              <div className="items-center justify-center flex flex-col">
                <Chip
                  radius="lg"
                  className="text-sm font-semibold text-blue-600 bg-primary-50 px-2 py-1 mb-4 inline-block"
                >
                  Estimated Rent Valuation
                </Chip>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  £{formatNumberWithCommas(rentEstimate)}
                </div>
                <div>
                  <Chip
                    radius="lg"
                    className="text-sm font-semibold text-blue-600 bg-primary-50 px-2 py-1 mb-4 inline-block"
                  >
                   Rent Estimate
                  </Chip>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div>
                    £{rentPerSqFt.toFixed(2)} <br />
                    <span>per sq.ft.</span>
                  </div>
                  <div className="mx-2 h-10 border-l border-gray-300"></div>
                  <div>
                    £{rentPerBedroom.toFixed(2)} <br />
                    <span>per bedroom</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-gray-700 text-sm">
                <div className="flex w-full justify-between mb-2">
                  <div className="text-md text-gray-500">Low Estimate</div>
                  <div className="text-md text-gray-500">High Estimate</div>
                </div>
                <Progress
                  color="primary"
                  className="h-full w-full rounded-full bg-gradient-to-r from-primary-400 to-purple-600"
                  value={rentProgress}
                />
                <div className="flex w-full justify-between mt-2">
                  <div className="flex flex-col items-center">
                    <span className="font-bold">
                      £{formatNumberWithCommas(lowerRentEstimate)}
                    </span>
                    <span className="text-xs">
                      £{rentPerSqFt.toFixed(2)}/sq.ft.
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold">
                      £{formatNumberWithCommas(upperRentEstimate)}
                    </span>
                    <span className="text-xs">
                      £{rentPerSqFt.toFixed(2)}/sq.ft.
                    </span>
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        )}
      </CardBody>
    </Card>
  );
}
