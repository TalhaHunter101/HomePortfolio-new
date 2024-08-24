import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Mar', year: '2022', approved: 45, inProgress: 30, pending: 20, rejected: 10, withdrawn: 5 },
  { month: 'Apr', year: '2022', approved: 50, inProgress: 35, pending: 25, rejected: 12, withdrawn: 8 },
  { month: 'May', year: '2022', approved: 55, inProgress: 38, pending: 22, rejected: 14, withdrawn: 6 },
  { month: 'Jun', year: '2022', approved: 58, inProgress: 40, pending: 30, rejected: 15, withdrawn: 7 },
  { month: 'Jul', year: '2022', approved: 60, inProgress: 42, pending: 35, rejected: 18, withdrawn: 9 },
  { month: 'Aug', year: '2022', approved: 65, inProgress: 45, pending: 40, rejected: 20, withdrawn: 10 },
  { month: 'Sep', year: '2022', approved: 70, inProgress: 48, pending: 42, rejected: 22, withdrawn: 11 },
  { month: 'Oct', year: '2022', approved: 75, inProgress: 50, pending: 45, rejected: 25, withdrawn: 13 },
  { month: 'Nov', year: '2022', approved: 78, inProgress: 52, pending: 47, rejected: 27, withdrawn: 14 },
  { month: 'Dec', year: '2022', approved: 80, inProgress: 55, pending: 50, rejected: 30, withdrawn: 15 },
  { month: 'Jan', year: '2023', approved: 85, inProgress: 58, pending: 55, rejected: 35, withdrawn: 16 },
  { month: 'Feb', year: '2023', approved: 90, inProgress: 60, pending: 60, rejected: 40, withdrawn: 18 },
];

export const TimelineChart = () => (
  
    
    <div className="w-full h-350 p-5 bg-white rounded-lg  shadow-md">
    <h3 className="mb-5 font-bold text-lg">Timeline</h3>
    <ResponsiveContainer className={'text-xs'}   width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

export default TimelineChart;
