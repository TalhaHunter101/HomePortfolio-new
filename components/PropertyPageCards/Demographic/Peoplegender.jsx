import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDemographicStore } from "@/store/listingStore";
import { FamilyCustomBarChart } from "../Charts/FamilyPieChart";

function Peoplegender({ PeopleGenderData, city }) {
  const [chartData, setChartData] = useState([]);
  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];

  // Destructure the setter from the store
  const setSingleFamilyHouseholds = useDemographicStore(
    (state) => state.setSingleFamilyHouseholds
  );

  console.log("PeopleGenderData is",PeopleGenderData);
  

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
          <Icon
            icon="game-icons:relationship-bounds"
            width={24}
            className="text-gray-700 mr-2"
          />
          <h2 className="text-xl font-semibold text-gray-700">
            Marital and civil partnership
          </h2>
        </div>

        <FamilyCustomBarChart data={chartData} />
      </div>
    </div>
  );
}

export default Peoplegender;
