import { Icon } from "@iconify/react";
import { Spinner } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AgePopulationData({ AgePopulationData }) {
  const [formattedData, setFormattedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (AgePopulationData && AgePopulationData["_source"]) {
      const data = [
        {
          name: "Under 4",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 4 years and under"]
          ),
        },
        {
          name: "5-9",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 5 to 9 years"]
          ),
        },
        {
          name: "10-14",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 10 to 14 years"]
          ),
        },
        {
          name: "15-19",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 15 to 19 years"]
          ),
        },
        {
          name: "20-24",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 20 to 24 years"]
          ),
        },
        {
          name: "25-29",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 25 to 29 years"]
          ),
        },
        {
          name: "30-34",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 30 to 34 years"]
          ),
        },
        {
          name: "35-39",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 35 to 39 years"]
          ),
        },
        {
          name: "40-44",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 40 to 44 years"]
          ),
        },
        {
          name: "45-49",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 45 to 49 years"]
          ),
        },
        {
          name: "50-54",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 50 to 54 years"]
          ),
        },
        {
          name: "55-59",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 55 to 59 years"]
          ),
        },
        {
          name: "60-64",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 60 to 64 years"]
          ),
        },
        {
          name: "65-69",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 65 to 69 years"]
          ),
        },
        {
          name: "70-74",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 70 to 74 years"]
          ),
        },
        {
          name: "75-79",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 75 to 79 years"]
          ),
        },
        {
          name: "80-84",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 80 to 84 years"]
          ),
        },
        {
          name: "85+",
          value: parseInt(
            AgePopulationData["_source"]["Age: Aged 85 years and over"]
          ),
        },
      ];
      setFormattedData(data);
      setLoading(false);
    }
  }, [AgePopulationData]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start p-4">
      {/* Age Data at the top */}
      <div className="flex items-center p-2">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full mr-2 ml-1">
          <Icon icon="game-icons:ages" width={24} className="text-gray-700" />
        </div>
        <p className="text-lg sm:text-xl font-semibold text-gray-700">
          Age Data
        </p>
      </div>

      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {formattedData ? (
            <div className="w-full flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={formattedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#5AB2F6" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ):(
            <div className="w-full h-full flex justify-center items-center">
              No Data Available
            </div>
          )}
        </>
      )}

      {/* Chart below */}
    </div>
  );
}

export default AgePopulationData;
