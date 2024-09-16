import React, { useEffect, useState } from "react";
import { FamilyCustomPieChart } from "../Charts/FamilyPieChart";

function Peoplegender({ PeopleGenderData }) {

  const [chartData, setChartData] = useState([]);
  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];

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
      } catch (error) {
        console.error(error);
      }
    };

    if (Peoplegender) {
      getChartData();
    }
  }, [PeopleGenderData]);

  return (
    <div className="m-4" style={{ minHeight: "150px" }}>
      <div className="py-4 sm:py-6 text-foreground px-4 relative h-full w-full overflow-hidden flex-1">
        <div className="mb-6 bg-default-white border border-subtle-border shadow-sm text-xs sm:text-sm p-4 rounded-lg text-default-800">
          This is more than the city average&nbsp;of{" "}
          <span className="font-semibold text-blue-800">65%</span>.
        </div>
        <div className="flex items-center ">
          <div className=" w-1/2 flex flex-col gap-2 text-xs sm:text-sm">
            <div className="text-xs sm:text-lg font-semibold text-default-800 mb-4">
              Who lives here?
            </div>
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 items-center">
                <div
                  className="w-2 h-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <div>
                  {item.name} ({item.value})
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 h-64 ml-2">
            <FamilyCustomPieChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peoplegender;
