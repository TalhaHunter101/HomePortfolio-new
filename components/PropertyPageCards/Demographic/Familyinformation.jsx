import { useDemographicStore } from "@/store/listingStore";
import React, { useEffect, useState } from "react";

export function Familyinformation({
  postcode,
  city,
  totalPopulation,
  housingData,
  compositionData,
  agePopulationData,
  educationData,
}) {
  const { setPopulationData } = useDemographicStore();
  const [medianAge, setMedianAge] = useState(null);

  const calculateCollegeDegreePercentage = () => {
    if (educationData?._source) {
      const totalPopulation = parseInt(
        educationData._source[
          "Highest level of qualification: Total: All usual residents aged 16 years and over"
        ]
      );
      const level4AndAbove = parseInt(
        educationData._source[
          "Highest level of qualification: Level 4 qualifications and above"
        ]
      );

      if (totalPopulation && level4AndAbove) {
        return ((level4AndAbove / totalPopulation) * 100).toFixed(0);
      }
    }
    return "N/A";
  };

  const population =
    totalPopulation?._source?.["Sex: All persons; measures: Value"] || 0;
  const males = totalPopulation?._source?.["Sex: Male; measures: Value"] || 0;
  const females =
    totalPopulation?._source?.["Sex: Female; measures: Value"] || 0;
  const malePercentage = ((males / population) * 100).toFixed(0);
  const femalePercentage = ((females / population) * 100).toFixed(0);
  const totalHouseholds =
    housingData?._source?.["Accommodation type: Total: All households"] || 0;
  const singleFamilyPercentage = (
    ((housingData?._source?.["Accommodation type: Detached"] || 0) /
      totalHouseholds) *
    100
  ).toFixed(0);
  const onePersonHouseholdPercentage = (
    ((housingData?._source?.["Accommodation type: Semi-detached"] || 0) /
      totalHouseholds) *
    100
  ).toFixed(0);
  const coupleFamilyWithKidsPercentage = (
    ((housingData?._source?.["Accommodation type: Terraced"] || 0) /
      totalHouseholds) *
    100
  ).toFixed(0);

  const averageHouseholdSize = 2.22;
  const averageFamilySize = 3.04;

  // Function to calculate the median age
  const calculateMedianAge = (ageData) => {
    const ageRanges = [
      { range: "0-4", count: parseInt(ageData["Age: Aged 4 years and under"]) },
      { range: "5-9", count: parseInt(ageData["Age: Aged 5 to 9 years"]) },
      { range: "10-14", count: parseInt(ageData["Age: Aged 10 to 14 years"]) },
      { range: "15-19", count: parseInt(ageData["Age: Aged 15 to 19 years"]) },
      { range: "20-24", count: parseInt(ageData["Age: Aged 20 to 24 years"]) },
      { range: "25-29", count: parseInt(ageData["Age: Aged 25 to 29 years"]) },
      { range: "30-34", count: parseInt(ageData["Age: Aged 30 to 34 years"]) },
      { range: "35-39", count: parseInt(ageData["Age: Aged 35 to 39 years"]) },
      { range: "40-44", count: parseInt(ageData["Age: Aged 40 to 44 years"]) },
      { range: "45-49", count: parseInt(ageData["Age: Aged 45 to 49 years"]) },
      { range: "50-54", count: parseInt(ageData["Age: Aged 50 to 54 years"]) },
      { range: "55-59", count: parseInt(ageData["Age: Aged 55 to 59 years"]) },
      { range: "60-64", count: parseInt(ageData["Age: Aged 60 to 64 years"]) },
      { range: "65-69", count: parseInt(ageData["Age: Aged 65 to 69 years"]) },
      { range: "70-74", count: parseInt(ageData["Age: Aged 70 to 74 years"]) },
      { range: "75-79", count: parseInt(ageData["Age: Aged 75 to 79 years"]) },
      { range: "80-84", count: parseInt(ageData["Age: Aged 80 to 84 years"]) },
      { range: "85+", count: parseInt(ageData["Age: Aged 85 years and over"]) },
    ];

    const totalPopulation = ageRanges.reduce(
      (acc, ageRange) => acc + ageRange.count,
      0
    );
    const middlePopulation = totalPopulation / 2;

    let cumulativePopulation = 0;
    for (let i = 0; i < ageRanges.length; i++) {
      cumulativePopulation += ageRanges[i].count;
      if (cumulativePopulation >= middlePopulation) {
        const [lowerBound, upperBound] = ageRanges[i].range
          .split("-")
          .map(Number);
        return upperBound ? (lowerBound + upperBound) / 2 : lowerBound;
      }
    }
    return "N/A"; // In case median can't be calculated.
  };

  useEffect(() => {
    setPopulationData(population);
    if (agePopulationData?._source) {
      const calculatedMedianAge = calculateMedianAge(agePopulationData._source);
      setMedianAge(calculatedMedianAge);
    }
  }, [population, setPopulationData, agePopulationData]);

  return (
    <div>
      <p className="text-gray-600 mb-2">
        The population of {postcode} is{" "}
        <span className="font-semibold">{population}</span> with{" "}
        <span className="font-semibold">{malePercentage}%</span> males and{" "}
        <span className="font-semibold">{femalePercentage}%</span> females, and
        a median age of <span className="font-semibold">{medianAge}</span>.
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">
          {
            compositionData?._source?.[
              "Household composition: One person household; measures: Value"
            ]
          }
        </span>{" "}
        of this neighborhood is occupied by families with{" "}
        <span className="font-semibold">{singleFamilyPercentage}%</span> single
        families,{" "}
        <span className="font-semibold">{onePersonHouseholdPercentage}%</span>{" "}
        one-person households, and{" "}
        <span className="font-semibold">{coupleFamilyWithKidsPercentage}%</span>{" "}
        couple families with kids. The average household size in {city} is{" "}
        <span className="font-semibold">{averageHouseholdSize}</span>, and the
        average family size is{" "}
        <span className="font-semibold">{averageFamilySize}</span>.
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">
          {calculateCollegeDegreePercentage()}%
        </span>{" "}
        of residents in this neighborhood have a college degree.
      </p>
    </div>
  );
}
