import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDemographicStore } from "@/store/listingStore";
import { FamilyCustomBarChart } from "../Charts/FamilyPieChart";
import { useMediaQuery } from "@react-hook/media-query";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function Peoplegender({ PeopleGenderData, city }) {
  const [chartData, setChartData] = useState([]);
  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];
  const isSmallScreen = useMediaQuery("only screen and (max-width: 640px)");

  // Destructure the setter from the store
  const setSingleFamilyHouseholds = useDemographicStore(
    (state) => state.setSingleFamilyHouseholds
  );
  

  useEffect(() => {
    const getChartData = async () => {
      try {
        const Validtensore = {
          "Marital and civil partnership status: Never married and never registered a civil partnership; measures: Value":
            "Single",
          "Marital and civil partnership status: Married or in a registered civil partnership; measures: Value":
            "Married",
          "Marital and civil partnership status: Separated, but still legally married or still legally in a civil partnership: Separated, but still married; measures: Value":
            "Separated",
          "Marital and civil partnership status: Divorced or civil partnership dissolved; measures: Value":
            "Divorced",
          "Marital and civil partnership status: Widowed or surviving civil partnership partner: Widowed; measures: Value":
            "Widowed",
        };

        const sourceData = PeopleGenderData._source;
        const chartDataArray = [];

        for (const [key, label] of Object.entries(Validtensore)) {
          if (sourceData[key]) {
            chartDataArray.push({
              name: label,
              value: parseInt(sourceData[key], 10),
            });
          }
        }

        setChartData(chartDataArray);

        // Assuming "Single" corresponds to single-family households
        const singleFamily = chartDataArray.find(
          (item) => item.name === "Single"
        );
        
        if (singleFamily) {

          
          setSingleFamilyHouseholds(singleFamily.value);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (PeopleGenderData) {
      // Corrected condition
      getChartData();
    }
  }, [PeopleGenderData, setSingleFamilyHouseholds]);

  return (
    <div className="">
      <div className="px-4 relative h-full w-full overflow-hidden flex-1">
        <div className="flex items-center p-2">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full mr-2 ml-1">
          <Icon
            icon="mdi:gender-male-female"
            width={24}
            className="text-gray-700"
          />
        </div>
          <p className="text-xl font-semibold text-gray-700">
            Marital and civil partnership
          </p>
        </div>

        <div className="w-full font-semibold flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout={isSmallScreen ? "vertical" : "horizontal"}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
          
              {isSmallScreen ? (
                <>
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" fill="#33b5b5" barSize={30}>
                    <LabelList dataKey="value" position="right" fontSize={12} />
                  </Bar>
                </>
              ) : (
                <>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" fill="#33b5b5" barSize={100}>
                    <LabelList dataKey="value" position="top" fontSize={12} />
                  </Bar>
                </>
              )}
              <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Peoplegender;
