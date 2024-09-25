import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function HouseTenure({ tenureData, city }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (tenureData && tenureData._source) {
      const sourceData = tenureData._source;

      const validTensor = {
        "Owns outright": "Owned outright",
        "Owns with a mortgage or loan": "Owned (mortgage)",
        "Shared ownership": "Shared Ownership",
        "Social rented": "Rented (social landlord)",
        "Rents from council": "Rented (council)",
        "Private rented": "Rented (private landlord)",
        "Lives rent free": "Rent-Free",
      };

      let ownedCount = 0;
      let rentedCount = 0;

      for (let key in sourceData) {
        if (key.startsWith("Tenure of household:")) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace("Tenure of household:", "").trim();
            for (let validKey in validTensor) {
              if (label.toLowerCase().includes(validKey.toLowerCase())) {
                const mappedLabel = validTensor[validKey];
                if (mappedLabel.includes("Owned")) {
                  ownedCount += count;
                } else if (mappedLabel.includes("Rented")) {
                  rentedCount += count;
                }
                break;
              }
            }
          }
        }
      }

      // Set the chart data with combined "Owned" and "Rented"
      setChartData([
        { name: "Owned", count: ownedCount },
        { name: "Rented (Private & Social)", count: rentedCount },
      ]);
    }
  }, [tenureData]);

  const COLORS = ["#1A2B41", "#5AB2F6"];

  return (
    <>
      <div className="flex items-center p-2">
        <Icon
          icon="fluent:person-key-20-filled"
          width={24}
          className="text-gray-700 mr-2"
        />
        <h2 className="text-xl font-semibold text-gray-700">House Tenure</h2>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#5AB2F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default HouseTenure;
