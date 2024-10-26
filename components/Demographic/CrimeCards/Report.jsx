import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export const CrimeReportCard = () => {
  // Dummy data for testing
  const dummyReportData = [
    { _source: { "Crime type": "Burglary", Month: "2023-09" } },
    { _source: { "Crime type": "Theft", Month: "2023-09" } },
    { _source: { "Crime type": "Theft", Month: "2023-09" } },
    { _source: { "Crime type": "Assault", Month: "2023-09" } },
    { _source: { "Crime type": "Burglary", Month: "2023-08" } },
    { _source: { "Crime type": "Vandalism", Month: "2023-08" } },
    { _source: { "Crime type": "Theft", Month: "2023-08" } },
    { _source: { "Crime type": "Assault", Month: "2023-08" } },
    { _source: { "Crime type": "Burglary", Month: "2023-07" } },
    { _source: { "Crime type": "Assault", Month: "2023-07" } },
    { _source: { "Crime type": "Theft", Month: "2023-06" } },
  ];

  // Calculate the crime data dynamically
  const crimeDataMap = dummyReportData.reduce((acc, report) => {
    const crimeType = report._source["Crime type"];
    if (!acc[crimeType]) {
      acc[crimeType] = { count: 0, trend: "stable" };
    }
    acc[crimeType].count += 1;
    return acc;
  }, {});

  const crimeData = Object.keys(crimeDataMap).map((crimeType) => ({
    type: crimeType,
    count: crimeDataMap[crimeType].count,
    trend: crimeDataMap[crimeType].trend,
  }));

  // Find the latest month in the data
  const latestMonth = dummyReportData.reduce((latest, report) => {
    const currentMonth = report._source.Month;
    return new Date(currentMonth) > new Date(latest) ? currentMonth : latest;
  }, dummyReportData[0]?._source?.Month);

  // Format the latest month as "MMM YYYY"
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [year, month] = latestMonth.split("-");
  const formattedLatestMonth = `${monthNames[parseInt(month) - 1]} ${year}`;

  return (
    <Card className="m-4 p-4  h-full max-h-[500px]"> {/* Set a maximum height for the card */}
      <CardBody className="h-full">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
          <h1 className="text-lg font-semibold text-gray-800 mb-1">Top Reported Crimes</h1>
          <h2 className="text-sm text-gray-500">
            Crime for latest month ({formattedLatestMonth})
          </h2>
        </div>

        {/* Scrollable crimes list */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {crimeData.map((crime, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div className="flex items-center">
                <h3 className="text-base font-medium text-gray-700">
                  {crime.type}
                </h3>
              </div>
              <div className="flex items-center">
                <span className="text-base font-semibold text-gray-800">
                  {crime.count}
                </span>
                {crime.trend === "up" ? (
                  <Icon icon="mdi:arrow-up-bold" color="red" className="ml-2" />
                ) : crime.trend === "down" ? (
                  <Icon icon="mdi:arrow-down-bold" color="green" className="ml-2" />
                ) : (
                  <Icon icon="mdi:minus" color="grey" className="ml-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default CrimeReportCard;
