import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { PricetrackerChart } from "./Charts/pricetrckerChart";
import { useListingStore } from "@/store/listingStore";
import { Icon } from "@iconify/react";

export function PriceTrackerCard({ uprn, data: newData, postcode }) {
  const [data, setData] = useState([]);
  const { setFullAddress } = useListingStore();
  const [growthRate, setGrowthRate] = useState(null);
  const [ratePerYear, setRatePerYear] = useState(null);

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    const getPriceTrackerData = async () => {
      try {
        const res = await fetch("/api/indevisual/get-price-tracking-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode }),
        });
    
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
    
        const results = await res.json();
        setData(results?.hits);
    
        // Extract and map the year and price data from results
        const mappedData = results?.hits?.map((item) => ({
          year: new Date(item._source.deed_date).getFullYear(),
          price: Number(item._source.price_paid),
        }));
    
        // Sort the data by year in descending order
        const sortedData = [...mappedData].sort((a, b) => b.year - a.year);
    
        // Ensure we have at least two years of data
        if (sortedData.length >= 2) {
          const lastYearData = sortedData[0]; // Latest year data
          const secondLastYearData = sortedData[1]; // Second latest year data
    
          // Calculate growth rate and rate per year
          const growthRateCalc = ((lastYearData.price - secondLastYearData.price) / secondLastYearData.price) * 100;
          const ratePerYearCalc = lastYearData.price - secondLastYearData.price; // No decimal points
    
          // Set the calculated values to state
          setGrowthRate(growthRateCalc.toFixed(2)); // Format to 2 decimal places
          setRatePerYear(Math.floor(ratePerYearCalc)); // No decimal points
        }
    
        console.log("pricetrack data is", results);
    
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    
    
    if (uprn) {
      getHomeThreeYearData();
    }

    if (postcode) {
      getPriceTrackerData();
    }
  }, [uprn, postcode, setFullAddress]);

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="solar:tag-price-bold"
              width={16} // Adjust the icon size to fit well within the circle
              className="text-purple-700" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            What is the price trend?
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        {data.length <= 0 ? (
          <p className="text-default-500">No data available</p>
        ) : (
          <section
            id="price-tracker"
            className="max-w-1/2 p-4 w-full font-medium  mx-auto max-w-screen-md lg:max-w-screen-lg"
          >
            <div className="flex flex-col md:flex-row">
              <h2 className="text-xl md:w-2/5 text-foreground">
                Home prices in{" "}
                <span className="text-primary">
                  {postcode}
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
                        priceData={data}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between font-light text-foreground">
                  <div>
                    <div className="text-sm">
                      {postcode} growth Rate
                    </div>
                    <div className="text-[16px] text-primary">
                      <b className="font-medium text-[22px]">
                        {growthRate || "..."}%
                      </b> per year
                    </div>
                  </div>
                  <div className="text-foreground">
                    <div className="text-sm">
                      {postcode} Rate
                    </div>
                    <div className="text-[16px]">
                      <b className="font-medium text-[22px]">
                        £{ratePerYear || "..."} per year
                      </b>
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
