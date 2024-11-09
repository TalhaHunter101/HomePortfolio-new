import React, { useState } from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function CellularInfoCard() {
  // Dummy dynamic data
  const [data, setData] = useState({
    topProvider: "AT&T Mobility",
    top4GProvider: "AT&T",
    top5GProvider: "AT&T",
    coverageRating: 75, // Dynamic coverage value (0-100)
    towerCount: 221, // Number of towers
    ranking: [
      { rank: 1, provider: "AT&T", cellsPerSqMi: 26 },
      { rank: 2, provider: "T-Mobile", cellsPerSqMi: 22 },
      { rank: 3, provider: "Verizon", cellsPerSqMi: 6 },
      { rank: 4, provider: "Sprint", cellsPerSqMi: 4 },
      { rank: 5, provider: "US Cellular", cellsPerSqMi: 3 },
    ],
  });

  // State to track the selected card
  const [selectedRank, setSelectedRank] = useState(null);

  // Determine the label based on the coverage rating
  const getCoverageLabel = (value) => {
    if (value < 35) return "Low";
    if (value < 70) return "Medium";
    return "High";
  };

  // Click handler for ranking cards
  const handleRankingClick = (rank) => {
    setSelectedRank(rank === selectedRank ? null : rank);
  };

  return (
    <Card className="m-4">
      {/* Header Section */}
      <CardHeader className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        {/* Title Section */}
        <div className="flex items-center mb-2 lg:mb-0">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon icon="ion:cellular" width={16} className="text-purple-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            Who provides the best cell coverage in Pond Springs?
          </h2>
        </div>

        {/* Additional Info in Header */}
        <div className="flex flex-row justify-between gap-8">
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-600">Best Cellular Provider</p>
            <p className="text-lg font-bold">{data.topProvider}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-600">Number of Towers</p>
            <p className="text-lg font-bold">{data.towerCount}</p>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {/* Provider Information Section */}
        <div className="flex flex-col space-y-4 mb-6">
          <p className="text-sm">
            We rank providers by cell density within the area near your home.
          </p>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:gap-4 gap-2">
            <div className="flex flex-col">
              <p className="font-semibold">Top Mobile Provider:</p>
              <p>{data.topProvider}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Top 4G LTE Provider:</p>
              <p>{data.top4GProvider}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Top 5G Provider:</p>
              <p>{data.top5GProvider}</p>
            </div>
            <div className="flex flex-col w-full lg:w-auto">
              <p className="font-semibold mb-2">Coverage Rating For Neighborhood</p>
              <Progress value={data.coverageRating} color="primary" />
              <p className="text-center text-sm font-semibold">
                {getCoverageLabel(data.coverageRating)}
              </p>
            </div>
          </div>
        </div>

        {/* Map and Rankings Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Map Container */}
          <div className="flex-1">
            <div className="h-[200px] lg:h-[300px] w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map Placeholder</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">Source: opencellid.org</p>
          </div>

          {/* Rankings Section */}
          <div className="flex-1">
            <div
              className="space-y-2 overflow-y-auto"
              style={{ maxHeight: "300px" }}
            >
              {data.ranking.map((item) => (
                <div
                  key={item.rank}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedRank === item.rank
                      ? "bg-gray-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => handleRankingClick(item.rank)}
                >
                  <p className="font-bold">
                    {item.rank}
                    {item.rank === 1 ? "st" : item.rank === 2 ? "nd" : "rd"}
                  </p>
                  <p>{item.provider}</p>
                  <p className="text-sm">{item.cellsPerSqMi} cells per sq mi</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
