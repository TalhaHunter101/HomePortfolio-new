import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AgentBarchart({ data }) {
  // Function to clean and parse date
  const parseDate = (dateStr) => {
    // Remove ordinal suffixes
    const cleanedDateStr = dateStr.replace(/\b(\d{1,2})(st|nd|rd|th)\b/, "$1");
    return new Date(cleanedDateStr);
  };

  // Process the residentialSale data to count listings by month
  const listingData = useMemo(() => {
    const listingsByMonth = {};

    // Check if data.agentData and data.agentData.listings.residentialSale exist
    if (data && data.agentData && data.agentData.listings && data.agentData.listings.residentialSale) {
      data.agentData.listings.residentialSale.forEach((listing) => {
        // Parse the firstListedDate after cleaning it
        const listingDate = parseDate(listing.firstListedDate);
        if (!isNaN(listingDate)) { // Ensure the date is valid
          const monthYear = listingDate.toLocaleString("default", { month: "short", year: "numeric" });

          // Count listings for each month
          listingsByMonth[monthYear] = (listingsByMonth[monthYear] || 0) + 1;
        }
      });
    }

    // Convert the listingsByMonth object to an array suitable for recharts
    return Object.entries(listingsByMonth).map(([month, listings]) => ({
      month,
      listings,
    }));
  }, [data]);

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Number of listings
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={listingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={40}
            dataKey="listings"
            fill="#1d4ed8"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AgentBarchart;
