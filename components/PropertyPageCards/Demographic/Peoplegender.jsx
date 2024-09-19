import React, { useEffect, useState } from "react";
import { FamilyCustomBarChart } from "../Charts/FamilyPieChart";
import { Icon } from "@iconify/react";

function Peoplegender({ PeopleGenderData,city }) {
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
    <div className="" style={{ minHeight: "150px" }}>
      <div className=" text-foreground px-4 relative h-full w-full overflow-hidden flex-1">
        <div className="bg-white   w-full">
          <div className="flex items-center mb-4">
            <Icon
              icon="icons8:gender"
              width={24}
              className="text-gray-700 mr-2"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Peoplegender
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* Left section */}
          <div className="lg:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Who lives in {city}?</h3>
            <p className="text-gray-600 mb-2">
              The population of {city} is
              <span className="font-semibold">2,902</span> with{" "}
              <span className="font-semibold">48%</span> males and{" "}
              <span className="font-semibold">52%</span> females, and a median
              age of <span className="font-semibold">38</span>.
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">55%</span> of this neighborhood is
              occupied by families with{" "}
              <span className="font-semibold">27%</span> single families,{" "}
              <span className="font-semibold">22%</span> one-person household,
              and <span className="font-semibold">51%</span> couple families
              with kids. The average household size in Allandale is{" "}
              <span className="font-semibold">2.22</span>, and the average
              family size is <span className="font-semibold">3.04</span>.
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">56%</span> of residents in this
              neighborhood have a college degree.
            </p>
          </div>

          {/* Right section */}
          <div className="lg:w-1/2 flex flex-col gap-4 text-gray-700 text-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col text-center">
              <span>Total Population</span>
              <span className="font-semibold text-3xl">23k</span>
            </div>
            <div className="flex flex-col text-center">
              <span>Median Age</span>
              <span className="font-semibold text-3xl">38</span>
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-14">
            <div className="flex flex-col text-center">
              <span>Average HH Income</span>
              <span className="font-semibold text-3xl">£88,189</span>
            </div>
            <div className="flex flex-col text-center">
              <span>Single Family Household</span>
              <span className="font-semibold text-3xl">26%</span>
            </div>
            </div>
          </div>
        </div>
        </div>
        <div className="flex items-center ">
          <div className=" w-1/2 flex flex-col gap-2 text-xs sm:text-sm">
            {/* <div className="text-xs sm:text-lg font-semibold text-default-800 mb-4">
              Who lives here?
            </div> */}
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
            <FamilyCustomBarChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peoplegender;
