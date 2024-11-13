import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function HouseTypeData({ housingData, city }) {
  const [chartData, setChartData] = useState([]);
  const isSmallScreen = useMediaQuery("only screen and (max-width: 640px)");

  useEffect(() => {
    if (housingData && housingData._source) {
      const sourceData = housingData._source;

      const validValues = {
        Detached: "Detached",
        "Semi-detached": "Semi-detached",
        Terraced: "Terraced",
        "flats or tenement": "Flats or Tenement",
        warehouse: "Warehouse",
        mobile: "Mobile Home",
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith("Accommodation type:")) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace("Accommodation type:", "").trim();
            let mappedLabel = null;

            for (let validKey in validValues) {
              if (label.toLowerCase().includes(validKey.toLowerCase())) {
                mappedLabel = validValues[validKey];
                break;
              }
            }

            if (mappedLabel) {
              data.push({ name: mappedLabel, value: count });
            }
          }
        }
      }

      setChartData(data);
    }
  }, [housingData]);

  const COLORS = ["#33b5b5", "#66cccc", "#99e6e6", "#b3f0f0", "#f87171"];

  const CustomLegend = () => {
    return (
      <div className="custom-legend">
        {chartData.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="legend-item flex items-center mb-2"
          >
            <span
              className="legend-color mr-2"
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: "50%",
              }}
            />
            <span className="text-gray-700 text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      <div className="flex items-center p-2 ml-5">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full mr-2">
          <Icon icon="fa6-solid:house-flag" width={24} className="text-gray-700" />
        </div>
        <p className="text-xl font-semibold text-gray-700">House Type</p>
      </div>

      <div className="flex w-full mt-8 justify-center">
        {/* Bar Chart Section */}
        <div className="chart-container w-full">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout={isSmallScreen ? "vertical" : "horizontal"}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap={isSmallScreen ? "20%" : "10%"} // Add space between bars when in small screen mode
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              {isSmallScreen ? (
                <>
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" fill="#33b5b5" barSize={20}>
                    <LabelList dataKey="value" position="right" fontSize={12} />
                  </Bar>
                </>
              ) : (
                <>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" fill="#33b5b5" barSize={60}>
                    <LabelList dataKey="value" position="top" fontSize={12} />
                  </Bar>
                </>
              )}
              <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            {/* <CustomLegend /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseTypeData;
