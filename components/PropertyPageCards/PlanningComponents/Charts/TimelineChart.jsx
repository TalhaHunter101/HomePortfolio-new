import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return { month, year };
};

const getStatusCountsByMonth = (data) => {
  const monthlyCounts = {};

  data.forEach((item) => {
    const decisionDate = item?._source?.other_fields?.decision_date;
    if (decisionDate) {
      const { month, year } = getMonthYear(decisionDate);
      const monthYear = `${month} ${year}`;

      // Initialize entry for the month if it doesn't exist
      if (!monthlyCounts[monthYear]) {
        monthlyCounts[monthYear] = {
          month,
          year,
          approved: 0,
          inProgress: 0,
          pending: 0,
          rejected: 0,
          withdrawn: 0,
        };
      }

      // Increment the correct status count based on the decision
      switch (item?._source?.other_fields?.decision) {
        case "Application Permitted":
          monthlyCounts[monthYear].inProgress++;
          break;
        case "Granted":
        case "Approved":
        case "Approve":
        case "Approve with Conditions":
          monthlyCounts[monthYear].approved++;
          break;
        case "Approval":
          monthlyCounts[monthYear].pending++;
          break;
        case "Refused":
        case "Refuse":
          monthlyCounts[monthYear].rejected++;
          break;
        case "Withdrawn":
          monthlyCounts[monthYear].withdrawn++;
          break;
        default:
          break;
      }
    }
  });

  return Object.values(monthlyCounts);
};

export const TimelineChart = ({ allData }) => {
  // Memoize the transformed data for the chart
  const chartData = useMemo(() => {
    return getStatusCountsByMonth(allData);
  }, [allData]);

  return (
    <div className="w-full h-350 p-5 bg-white rounded-lg shadow-md">
      <h3 className="mb-5 font-bold text-lg">Timeline</h3>
      <ResponsiveContainer className={'text-xs'} width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }} />
          <XAxis
            dataKey="year"
            xAxisId="year"
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
            orientation="bottom" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="approved" stroke="#4CAF50" name="Approved" dot={false} />
          <Line type="monotone" dataKey="inProgress" stroke="#2196F3" name="In progress" dot={false} />
          <Line type="monotone" dataKey="pending" stroke="#FF9800" name="Pending" dot={false} />
          <Line type="monotone" dataKey="rejected" stroke="#F44336" name="Rejected" dot={false} />
          <Line type="monotone" dataKey="withdrawn" stroke="#9E9E9E" name="Withdrawn" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
