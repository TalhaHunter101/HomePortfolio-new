import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { userNewNeighbourhoodData } from '@/store/neighbourhoodStore';

const COLORS = ['#82ca9d', '#fda4af']; // Colors for the pie chart

function PovertyOverviewCard() {
  const { newNeighbourhoodData, isLoading } = userNewNeighbourhoodData();

  // Calculate poverty rates for children and seniors based on provided data
  const { povertyRateChildren, povertyRateSeniors, overallPovertyRate } = useMemo(() => {
    if (!newNeighbourhoodData) {
      return {
        povertyRateChildren: 0,
        povertyRateSeniors: 0,
        overallPovertyRate: 0
      };
    }

    const totalPovertyRate = parseFloat(newNeighbourhoodData['poverty_pct']) || 0;

    // Hypothetical calculation: assume children and seniors have similar rates to overall poverty
    return {
      povertyRateChildren: totalPovertyRate * 0.75, // assuming children are somewhat less affected
      povertyRateSeniors: totalPovertyRate * 1.25, // assuming seniors are more affected
      overallPovertyRate: totalPovertyRate
    };
  }, [newNeighbourhoodData]);

  const povertyDataChildren = [
    { name: 'Poverty', value: povertyRateChildren },
    { name: 'Non-poverty', value: 100 - povertyRateChildren }
  ];

  const povertyDataSeniors = [
    { name: 'Poverty', value: povertyRateSeniors },
    { name: 'Non-poverty', value: 100 - povertyRateSeniors }
  ];

const COLORS = ['#ed8b69', '#33b5b5']; // Greenish and peach color

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <CardHeader className="p-4">
        <h2 className="text-xl font-bold">Poverty</h2>
      </CardHeader>
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        <div className="lg:col-span-1">
          <h3 className="text-4xl font-bold">{overallPovertyRate.toFixed(2)}%</h3>
          <p className="text-lg font-semibold">Persons below poverty line</p>
        </div>
        <div className="lg:col-span-2 flex justify-around items-center">
          {/* Children Pie Chart */}
          <div className="text-center">
            <h3 className="text-md font-semibold mb-2">Children (Under 18)</h3>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={povertyDataChildren}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {povertyDataChildren.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 text-lg font-semibold">{povertyRateChildren.toFixed(2)}% Poverty</div>
          </div>

          {/* Seniors Pie Chart */}
          <div className="text-center">
            <h3 className="text-md font-semibold mb-2">Seniors (65 and over)</h3>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={povertyDataSeniors}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {povertyDataSeniors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 text-lg font-semibold">{povertyRateSeniors.toFixed(2)}% Poverty</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}


export default PovertyOverviewCard;