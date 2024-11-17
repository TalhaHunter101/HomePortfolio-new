import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AgentLinechart({ data }) {
  // Process the data to get market share by month and postcode
  const marketShareData = useMemo(() => {
    const marketShareByMonth = {};

    if (data && data.agentData && data.agentData.listings.residentialSale) {
      data.agentData.listings.residentialSale.forEach((listing) => {
        // Parse date to "MMM YYYY" format
        const listingDate = new Date(listing.firstListedDate.replace(/\b(\d{1,2})(st|nd|rd|th)\b/, "$1"));
        const monthYear = listingDate.toLocaleString("default", { month: "short", year: "numeric" });

        // Extract postcode
        const postcode = listing.displayAddress.split(" ").slice(-1)[0];

        // Initialize the month entry if it doesn't exist
        if (!marketShareByMonth[monthYear]) {
          marketShareByMonth[monthYear] = { month: monthYear };
        }

        // Increment the count for this postcode in the specific month
        marketShareByMonth[monthYear][postcode] = (marketShareByMonth[monthYear][postcode] || 0) + 1;
      });
    }

    // Convert the object to an array suitable for recharts
    return Object.values(marketShareByMonth);
  }, [data]);

  // Get unique postcodes from the data to dynamically render lines
  const uniquePostcodes = useMemo(() => {
    const postcodes = new Set();
    marketShareData.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== "month") {
          postcodes.add(key);
        }
      });
    });
    return Array.from(postcodes);
  }, [marketShareData]);

  // Define colors for each postcode line
  const colors = ["#60a5fa", "#2563eb", "#1d4ed8", "#1e40af", "#3b82f6", "#93c5fd"];

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Listing market share
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={marketShareData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {uniquePostcodes.map((postcode, index) => (
            <Line
              key={postcode}
              type="monotone"
              dataKey={postcode}
              stroke={colors[index % colors.length]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AgentLinechart;
