import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getStatusCounts = (data, appType) => {
  const statusCounts = {
    approved: 0,
    // inProgress: 0,
    pending: 0,
    rejected: 0,
    withdrawn: 0,
  };

  data.forEach((item) => {
    
    if (item?._source?.other_fields?.application_type === appType) {
      
      switch (item?._source?.other_fields?.decision) {
        // case "Application Permitted":
        //   statusCounts.inProgress++;
        //   break;
        case "Granted":
        case "Grant":
        case "Application Permitted":
        case "Approved":
        case "Approve":
        case "Approval":
        case "Approve with Conditions":
          statusCounts.approved++;
          break;
        case "Undecided":
          statusCounts.pending++;
          break;
        case "Refused":
        case "Refuse":
          statusCounts.rejected++;
          break;
        case "Withdrawn":
          statusCounts.withdrawn++;
          break;
        default:
          break;
      }
    }
  });

  return statusCounts;
};

export const EthnicGroupChart = ({ allData }) => {
  const applicationTypes = [
    "Full App (Householder Development)",
    "Full Planning Permission",
    "Householder Application",
    "Householder",
    "Listed Building Consent",
    "Full Planning Application",
    "Full",
    "Discharge of Conditions",
    "Tree Preservation Order",
    "Discharge of Condition",
  ];

  const chartData = useMemo(() => {
    return applicationTypes.map((appType) => {
      const statusCounts = getStatusCounts(allData, appType);
      return {
        name: appType,
        approved: statusCounts.approved,
        inProgress: statusCounts.inProgress,
        pending: statusCounts.pending,
        rejected: statusCounts.rejected,
        withdrawn: statusCounts.withdrawn,
      };
    });
  }, [allData]);

  return (
    <div className="w-full h-350 p-5 bg-white rounded-lg shadow-md">
      <h3 className="mb-5 font-bold text-lg">Application Type Status</h3>
      <ResponsiveContainer className={'text-xs'} width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" stackId="a" fill="#4CAF50" name="Approved" />
          <Bar dataKey="inProgress" stackId="a" fill="#2196F3" name="In progress" />
          <Bar dataKey="pending" stackId="a" fill="#FF9800" name="Pending" />
          <Bar dataKey="rejected" stackId="a" fill="#F44336" name="Rejected" />
          <Bar dataKey="withdrawn" stackId="a" fill="#9E9E9E" name="Withdrawn" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EthnicGroupChart;
