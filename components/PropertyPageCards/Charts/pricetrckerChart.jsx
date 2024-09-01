import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const PricetrackerChart = ({ data, categories }) => {
  const formattedData = data.map((price, index) => ({
    name: categories[index],
    uv: price,
  }));

  return (
    <div className="w-full h-auto max-w-4xl p-4 mx-auto bg-white rounded-lg">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
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
                  return `£${(value / 1000000).toFixed(2)}M`;
                } else if (value >= 1000) {
                  return `£${(value / 1000).toFixed(2)}K`;
                } else {
                  return `£${value}`;
                }
              }}
              dx={10}
            />

            <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="uv"
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
