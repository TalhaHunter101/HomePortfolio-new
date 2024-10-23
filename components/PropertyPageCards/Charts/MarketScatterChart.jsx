import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CardBody } from "@nextui-org/react";
import { marketCompStore } from "@/store/listingStore";

// Helper function to calculate the median for the top 3 values
// const calculateMedian = (values) => {
//   if (values.length === 0) return 0;

//   // Sort values in ascending order and take only the top 3
//   values.sort((a, b) => a - b);
//   const top3Values = values.slice(0, 3); // Extract top 3 values

//   const half = Math.floor(top3Values.length / 2);

//   if (top3Values.length % 2) return top3Values[half];
//   return (top3Values[half - 1] + top3Values[half]) / 2.0;
// };

const calculateMedian = (values) => {
  if (values.length === 0) return 0;

  // Sort values in ascending order
  values.sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];
  return (values[half - 1] + values[half]) / 2.0;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { x, y } = payload[0].payload;
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded">
        <p className="label text-gray-700">{`Home Size: ${x} sqft`}</p>
        <p className="intro text-gray-700">{`Listing Price: £${(
          y / 1000
        ).toFixed(0)}K`}</p>
      </div>
    );
  }

  return null;
};

export const ScatterChartComponent = ({ data, text, price, currentSize }) => {
  
  const [sizePerSqFeet, setSizePerSqFeet] = useState([]);
  const [prices, setPrices] = useState([]);
  const [scatterData, setScatterData] = useState([]);

  const { setMedianPrice } = marketCompStore(); // Zustand store

  useEffect(() => {
    const getMarketComparisonData = async () => {
      try {
        const result = await fetch("/api/indevisual/get-market-comparision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: data }),
        });

        if (result.ok) {
          const resultData = await result.json();
          const sizesqfeet = [];
          const prices = [];

          resultData.forEach((item) => {
            const size = item._source?.analyticsTaxonomy?.sizeSqFeet;
            const price = item._source.pricing?.internalValue;

            // Ensure the price and size are valid
            if (size !== "" && price !== undefined) {
              sizesqfeet.push(size);
              prices.push(price);
            }
          });

          setSizePerSqFeet(sizesqfeet);
          setPrices(prices);

          // Calculate the median using the top 3 prices
          const median = calculateMedian(prices);
          setMedianPrice(median); // Set in Zustand store

          // Prepare scatter data
          const scatterData = sizesqfeet.map((size, index) => ({
            x: size,
            y: prices[index],
          }));

          scatterData.sort((a, b) => {
            if (a.x === b.x) {
              return a.y - b.y;
            }
            return a.x - b.x;
          });

          if (price) {
            scatterData.push({
              x: parseInt(currentSize) || 0,
              y: price,
              isCurrentListing: true,
            });
          }

          setScatterData(scatterData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMarketComparisonData();
  }, [data, price, currentSize, setMedianPrice]);

  return (
    <CardBody className="w-full flex flex-col justify-between bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="pl-2">
          <span className="text-pink-500 font-bold">This Home</span>
          <span className="text-gray-700 mx-2">vs</span>
          <span className="text-teal-400 font-bold">{data}</span>
        </div>
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              className="font-medium"
              type="number"
              dataKey="x"
              name="Home Size"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              label={{
                value: "Home Size in sqft",
                position: "insideBottom",
                offset: -10,
                fill: "#6b7280",
                fontSize: 14,
              }}
            />
            <YAxis
              className="font-medium"
              type="number"
              dataKey="y"
              name="Listing Price"
              unit=""
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `£${(value / 1000).toFixed(0)}K`}
              label={{
                value: "Listing Price",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                fill: "#6b7280",
                fontSize: 14,
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<CustomTooltip />}
            />
            <Scatter
              name="Glen Park"
              data={scatterData.filter((item) => !item.isCurrentListing)}
              fill="#0ea5e9"
              shape="circle"
              stroke="#0ea5e9"
              strokeWidth={1}
              isAnimationActive
            />
            <Scatter
              name="Current Listing"
              data={scatterData.filter((item) => item.isCurrentListing)}
              fill="green"
              shape="circle"
              stroke="green"
              strokeWidth={2}
              isAnimationActive
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </CardBody>
  );
};
