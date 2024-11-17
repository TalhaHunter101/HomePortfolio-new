import { Icon } from "@iconify/react";
import { Spinner } from "@nextui-org/react";
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

function HouseOccupation({ occupationData, city }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if the screen size is small
  const isSmallScreen = useMediaQuery("only screen and (max-width: 640px)");

  useEffect(() => {
    if (occupationData && occupationData._source) {
      const sourceData = occupationData._source;

      // Mapping to simplify occupation labels
      const occupationMapping = {
        "1. Managers, directors and senior officials": "Managers & Directors",
        "2. Professional occupations": "Professionals",
        "3. Associate professional and technical occupations":
          "Associate Professionals",
        "4. Administrative and secretarial occupations":
          "Administrative & Secretarial",
        "5. Skilled trades occupations": "Skilled Trades",
        "6. Caring, leisure and other service occupations": "Caring & Service",
        "7. Sales and customer service occupations":
          "Sales & Customer Service",
        "8. Process, plant and machine operatives":
          "Process & Machine Operatives",
        "9. Elementary occupations": "Elementary Occupations",
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith("Occupation (current):") && !key.includes("Total")) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace("Occupation (current):", "").trim();
            const mappedLabel = occupationMapping[label] || label;

            data.push({ name: mappedLabel, value: count });
          }
        }
      }

      setChartData(data);
      setLoading(false);
    }
  }, [occupationData]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start p-4">
      <div className="flex items-center p-2">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full mr-2 ml-1">
          <Icon icon="tdesign:member" width={24} className="text-gray-700" />
        </div>
        <p className="text-lg sm:text-xl font-semibold text-gray-700">
          House Occupation
        </p>
      </div>

      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="w-full font-semibold flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout={isSmallScreen ? "vertical" : "horizontal"}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap={isSmallScreen ? "20%" : "10%"} // Add space between bars when in small screen mode
            >
              
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
        </div>
      )}
    </div>
  );
}

export default HouseOccupation;
