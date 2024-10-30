import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { userNewNeighbourhoodData } from '@/store/neighbourhoodStore';

const BAR_COLOR = '#33b5b5'; // Updated color for consistency

function IncomeOverviewCard() {
  const { newNeighbourhoodData, isLoading } = userNewNeighbourhoodData();

  // Extract and prepare income distribution data
  const {
    perCapitaIncome,
    medianHouseholdIncome,
    householdIncomeData,
  } = useMemo(() => {
    if (!newNeighbourhoodData) {
      return {
        perCapitaIncome: '0',
        medianHouseholdIncome: '0',
        householdIncomeData: [],
      };
    }

    const data = newNeighbourhoodData;

    // Total households (adjust based on your actual data)
    const totalHouseholds =
      parseInt(data['owns_outright'] || 0) +
      parseInt(data['own_with_mortgage'] || 0) +
      parseInt(data['social_rent'] || 0) +
      parseInt(data['private_rent'] || 0);

    // Income distribution data
    const incomeData = [
      {
        name: 'Under £50K',
        value: parseInt(data['owns_outright'] || 0),
      },
      {
        name: '£50K - £100K',
        value: parseInt(data['own_with_mortgage'] || 0),
      },
      {
        name: '£100K - £200K',
        value: parseInt(data['social_rent'] || 0),
      },
      {
        name: 'Over £200K',
        value: parseInt(data['private_rent'] || 0),
      },
    ];

    // Calculate percentages
    const householdIncomeData = incomeData.map((item) => ({
      ...item,
      percentage: totalHouseholds
        ? parseFloat(((item.value / totalHouseholds) * 100).toFixed(2))
        : 0,
    }));

    return {
      perCapitaIncome: data['Per Capita Income'] || '0',
      medianHouseholdIncome: data['Median Income'] || '0',
      householdIncomeData,
    };
  }, [newNeighbourhoodData]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const percentage = payload[0].value;
      const incomeRange = label;
      return (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '8px',
            border: '1px solid #ccc',
          }}
        >
          <p>{`${incomeRange}: ${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <CardHeader className="p-4">
        <h2 className="text-xl font-bold">Income Overview</h2>
      </CardHeader>
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        <div className="lg:col-span-1">
          {/* Per Capita Income */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">
              £{parseFloat(perCapitaIncome).toLocaleString()}
            </h3>
            <p className="text-lg font-semibold">Per capita income</p>
          </div>
          {/* Median Household Income */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">
              £{parseFloat(medianHouseholdIncome).toLocaleString()}
            </h3>
            <p className="text-lg font-semibold">Median household income</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">
            Household Income Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={householdIncomeData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis className='font-bold' dataKey="name" />
              <YAxis hide /> {/* Y-axis is hidden */}
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="percentage"
                fill={BAR_COLOR}
                barSize={100}
                label={{
                  position: 'top',
                  formatter: (value) => `${value}%`,
                  fill: '#000',
                  dy: -10, // Adjust vertical position as needed
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default IncomeOverviewCard;
