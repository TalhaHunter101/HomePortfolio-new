import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { userNewNeighbourhoodData } from '@/store/neighbourhoodStore';

const BAR_COLOR = '#82ca9d'; // Color for the bar chart

function IncomeOverviewCard() {
  const { newNeighbourhoodData, isLoading } = userNewNeighbourhoodData();

  // Extract and prepare income distribution data
  const { perCapitaIncome, medianHouseholdIncome, householdIncomeData } = useMemo(() => {
    if (!newNeighbourhoodData) {
      return {
        perCapitaIncome: '0',
        medianHouseholdIncome: '0',
        householdIncomeData: []
      };
    }

    const data = newNeighbourhoodData;
    const totalIncome = parseFloat(data["Average Income"]); // Or another applicable field if necessary

    // Mock-up of distribution data
    const incomeData = [
      { name: 'Under £50K', value: parseInt(data['owns_outright'] || 0) }, // Example adaptation
      { name: '£50K - £100K', value: parseInt(data['own_with_mortgage'] || 0) },
      { name: '£100K - £200K', value: parseInt(data['social_rent'] || 0) },
      { name: 'Over £200K', value: parseInt(data['private_rent'] || 0) },
    ];

    return {
      perCapitaIncome: data["Per Capita Income"] || '0',
      medianHouseholdIncome: data["Median Income"] || '0',
      householdIncomeData: incomeData
    };
  }, [newNeighbourhoodData]);

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <CardHeader className="p-4">
        <h2 className="text-xl font-bold">Income Overview</h2>
      </CardHeader>
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        <div className="lg:col-span-1">
          {/* Per Capita Income */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">£{parseFloat(perCapitaIncome).toFixed(2)}</h3>
            <p className="text-lg font-semibold">Per capita income</p>
          </div>
          {/* Median Household Income */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">£{parseFloat(medianHouseholdIncome).toFixed(2)}</h3>
            <p className="text-lg font-semibold">Median household income</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Household Income Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
  <BarChart data={householdIncomeData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#33b5b5" barSize={100} /> {/* Reduced barSize for thinner bars */}
  </BarChart>
</ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default IncomeOverviewCard;
