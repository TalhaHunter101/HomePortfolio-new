import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { PricetrackerChart } from "./Charts/pricetrckerChart";
import { useListingStore } from "@/store/listingStore";

export function PriceTrackerCard({ uprn, data: newData }) {
  const [data, setData] = useState([]);
  const { setFullAddress } = useListingStore();

  useEffect(() => {
    const getHomeThreeYearData = async () => {
      try {
        const res = await fetch("/api/indevisual/get-house-by-year", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uprn }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const reults = await res.json();

        setFullAddress(reults[0]?._source?.full_address);
        

        let historicSales = reults[0]._source.history?.historicSales;
        historicSales = historicSales
          .replace(/'/g, '"')
          .replace(/None/g, "null");
        const parsedHistoricSales = JSON.parse(historicSales);
        setData(parsedHistoricSales);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    if (uprn) {
      getHomeThreeYearData();
    }
  }, [uprn]);

  const { chartData, chartCategories } = data.reduce(
    (acc, item) => {
      acc.chartData.unshift(item.price);
      acc.chartCategories.unshift(
        new Date(item.date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        })
      );
      return acc;
    },
    { chartData: [], chartCategories: [] }
  );

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader></CardHeader>
      <CardBody>
        {chartData.length <= 0 ? (
          <p className="text-default-500">No data available</p>
        ) : (
          <section
            id="price-tracker"
            className="max-w-1/2 p-4 w-full font-medium border border-gray-200bg-default-white rounded-lg mx-auto max-w-screen-md lg:max-w-screen-lg"
          >
            <div className="flex flex-col md:flex-row">
              <h2 className="text-xl md:w-2/5 text-foreground">
                Home prices in{" "}
                <span className="text-primary">
                  {newData?.location?.townOrCity}
                </span>{" "}
                have grown faster.
              </h2>
              <div className="md:w-3/5 flex flex-col md:flex-col-reverse md:pl-4">
                <div
                  className="w-full mt-6 sm:mt-5 text-foreground"
                  style={{ minHeight: "215px" }}
                >
                  <div style={{ minHeight: "215px" }}>
                    <div className="apexcharts-canvas">
                      <PricetrackerChart
                        data={chartData}
                        categories={chartCategories}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between font-light text-foreground">
                  <div>
                    <div className="text-sm">
                      {newData?.location?.townOrCity} growth Rate
                    </div>
                    <div className="text-[16px] text-primary">
                      <b className="font-medium text-[22px]">...</b> per year
                    </div>
                  </div>
                  <div className="text-foreground">
                    <div className="text-sm">
                      {newData?.location?.townOrCity} Rate
                    </div>
                    <div className="text-[16px]">
                      <b className="font-medium text-[22px]">..</b> per year
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </CardBody>
    </Card>
  );
}
