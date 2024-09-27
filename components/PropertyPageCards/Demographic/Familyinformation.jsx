import { useDemographicStore } from "@/store/listingStore";
import React, { useEffect } from "react";

export function Familyinformation({
  postcode,
  city,
  totalPopulation,
  housingData,
}) {
  const { setPopulationData } = useDemographicStore();
  const population =
    totalPopulation?._source?.["Sex: All persons; measures: Value"] || 0;
  const males = totalPopulation?._source?.["Sex: Male; measures: Value"] || 0;
  const females =
    totalPopulation?._source?.["Sex: Female; measures: Value"] || 0;
  const malePercentage = ((males / population) * 100).toFixed(2);
  const femalePercentage = ((females / population) * 100).toFixed(2);
  const totalHouseholds =
    housingData?._source?.["Accommodation type: Total: All households"] || 0;
  const singleFamilyPercentage = (
    ((housingData?._source?.["Accommodation type: Detached"] || 0) /
      totalHouseholds) *
    100
  ).toFixed(2);
  const onePersonHouseholdPercentage = (
    ((housingData?._source?.["Accommodation type: Semi-detached"] || 0) /
      totalHouseholds) *
    100
  ).toFixed(2);
  const coupleFamilyWithKidsPercentage = (
    ((housingData?._source?.["Accommodation type: Terraced"] || 0) /
      totalHouseholds) *
    100
  ).toFixed(2);

  // Static values for median age, average household size, and average family size
  const medianAge = 38; // Replace with dynamic data if available
  const averageHouseholdSize = 2.22; // Replace with dynamic data if available
  const averageFamilySize = 3.04; // Replace with dynamic data if available

  useEffect(() => {
    setPopulationData(population);
  }, [population, setPopulationData]);

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
        <span className="font-semibold">55%</span> of this neighborhood is
        occupied by families with{" "}
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
        <span className="font-semibold">56%</span> of residents in this
        neighborhood have a college degree.
      </p>
    </div>
  );
}
