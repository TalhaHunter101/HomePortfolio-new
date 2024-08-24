"use client";
import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop,
} from "recharts";
import { CardBody } from "@nextui-org/react";

const data = [
  { x: 1000, y: 700000, z: 200 },
  { x: 1500, y: 1400000, z: 260 },
  { x: 2000, y: 2100000, z: 400 },
  { x: 2500, y: 2800000, z: 280 },
  { x: 3000, y: 1400000, z: 500 },
  { x: 3500, y: 700000, z: 200 },
  // { x: 4010, y: 2801000, z: 333 },
];

export const ScatterChartComponent = ({ data,text }) => {
  const [sizePerSqFeet, setSizePerSqFeet] = useState([]);
  const [prices, setPrices] = useState([]);
  const [scatterData, setScatterData] = useState([]);

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
            if (size !== "" && price !== undefined) {
              sizesqfeet.push(size);
              prices.push(price);
            }
          });



          setSizePerSqFeet(sizesqfeet);
          setPrices(prices);

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
          setScatterData(scatterData);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    

    getMarketComparisonData();
  }, [data]);

  

  return (
    <CardBody className="w-full flex flex-col justify-between bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="pl-2">
          <span className="text-pink-500 font-bold">This Home</span>
          <span className="text-gray-700 mx-2">vs</span>
          <span className="text-teal-400 font-bold">{data}</span>
        </div>
        <div className="bg-gray-300 rounded-lg px-2 py-1 text-gray-700 text-xs flex items-center">
          1/4
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
            {/* Define a gradient for the 3D bubble effect */}
            <defs>
              <linearGradient
                id="bubbleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#38bdf8", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#0ea5e9", stopOpacity: 0.8 }}
                />
              </linearGradient>
            </defs>
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
                value: "Home Size in Square Feet",
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
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
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
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e5e7eb",
              }}
              labelStyle={{ color: "#374151" }}
              itemStyle={{ color: "#374151" }}
              formatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Scatter
              name="Glen Park"
              data={scatterData}
              fill="url(#bubbleGradient)"
              shape="circle"
              stroke="#0ea5e9"
              strokeWidth={1}
              legendType="circle"
              isAnimationActive
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </CardBody>
  );
};
