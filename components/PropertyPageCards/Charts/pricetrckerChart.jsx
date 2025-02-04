import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const PricetrackerChart = ({ priceData }) => {
  const [chartDimensions, setChartDimensions] = useState({
    height: 256,
    margin: { top: 10, right: 80, left: 0, bottom: 0 },
  });

  // Calculate chart dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setChartDimensions({
        height: isLargeScreen ? 256 : 200,
        margin: isLargeScreen
          ? { top: 10, right: 80, left: 0, bottom: 0 }
          : { top: 10, right: 20, left: 0, bottom: 0 },
      });
    };

    updateDimensions(); // Call on component mount
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Format the data
  const formattedData = priceData
    .map((item) => ({
      name: new Date(item._source.deed_date).getFullYear(),
      price: Number(item._source.price_paid),
    }))
    .sort((a, b) => a.name - b.name); // Sort by year (ascending)

  return (
    <div className="w-full h-auto max-w-5xl  mx-auto bg-white rounded-lg">
      <div className="w-full" style={{ height: chartDimensions.height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={chartDimensions.margin}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00457C" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00457C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `£${(value / 1000000).toFixed(0)}M`;
                } else if (value >= 1000) {
                  return `£${(value / 1000).toFixed(0)}K`;
                } else {
                  return `£${value}`;
                }
              }}
              dx={10}
            />
            <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00457C"
              fillOpacity={1}
              fill="url(#colorUv)"
              strokeLinejoin="miter"
              strokeLinecap="round"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PricetrackerChart;
