import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch } from '@nextui-org/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from '@iconify/react';

// Dummy data for the bar chart (Means of transportation to work)
const transportationData = [
  { name: 'Drove alone', value: 62 },
  { name: 'Carpooled', value: 8 },
  { name: 'Public transit', value: 1 },
  { name: 'Bicycle', value: 1 },
  { name: 'Walked', value: 2 },
  { name: 'Other', value: 2 },
  { name: 'Worked at home', value: 25 },
];

// Table data
const transportationTableData = [
  {
    category: 'Drove alone',
    raleigh: '62.5% ±2.5%',
    raleighCary: '63.9% ±1.5%',
    northCarolina: '71.2% ±0.4%',
  },
  {
    category: 'Carpooled',
    raleigh: '7.6% ±1.4%',
    raleighCary: '6.6% ±0.7%',
    northCarolina: '8.5% ±0.3%',
  },
  {
    category: 'Public transit',
    raleigh: '1.1% ±0.5%',
    raleighCary: '0.4% ±0.2%',
    northCarolina: '0.5% ±0.1%',
  },
  {
    category: 'Bicycle',
    raleigh: '0.6% ±0.5%',
    raleighCary: '0.2% ±0.2%',
    northCarolina: '0.2% ±0%',
  },
  {
    category: 'Walked',
    raleigh: '2.1% ±0.9%',
    raleighCary: '1.4% ±0.5%',
    northCarolina: '1.6% ±0.1%',
  },
  {
    category: 'Other',
    raleigh: '1.6% ±0.6%',
    raleighCary: '1.3% ±0.3%',
    northCarolina: '1.2% ±0.1%',
  },
  {
    category: 'Worked at home',
    raleigh: '24.5% ±2.1%',
    raleighCary: '26.1% ±1.2%',
    northCarolina: '16.8% ±0.4%',
  },
];

function TransportationOverviewCard() {
  const [isTableVisible, setIsTableVisible] = useState(false); // State to toggle table visibility

  // Dynamic table headers
  const [tableHeaders] = useState({
    first: 'Raleigh',
    second: 'Raleigh-Cary, NC Metro Area',
    third: 'North Carolina',
  });

  // Function to toggle table view
  const toggleTableVisibility = () => {
    setIsTableVisible((prev) => !prev);
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Transportation to work</h2>
        <div className="flex items-center">
          <Switch
            size="md"
            color="secondary"
            isSelected={isTableVisible}
            onChange={toggleTableVisibility}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <Icon icon="mdi:eye-off" className={className} width="20" height="20" />
              ) : (
                <Icon icon="mdi:eye" className={className} width="20" height="20" />
              )
            }
          />
          <span className="ml-2 text-sm font-semibold">
            {isTableVisible ? 'Hide table' : 'View table'}
          </span>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Left Section: Travel Time to Work */}
        <div className="lg:col-span-1">
          <h3 className="text-4xl font-bold">21.9</h3>
          <p className="text-lg font-semibold">minutes</p>
          <p className="text-md text-gray-600">Mean travel time to work</p>
          <p className="text-sm text-gray-500 mt-2">
            about 80 percent of the figure in the Raleigh-Cary, NC Metro Area: 26.6
          </p>
          <p className="text-sm text-gray-500">
            about 90 percent of the figure in North Carolina: 25.1
          </p>
        </div>

        {/* Right Section: Bar Chart for Means of Transportation */}
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Means of transportation to work</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transportationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Full-Width Section: Table */}
        {isTableVisible && (
          <div className="lg:col-span-3 mt-4">
            <Table removeWrapper aria-label="Means of transportation to work">
              <TableHeader>
                <TableColumn>Column</TableColumn>
                <TableColumn>{tableHeaders.first}</TableColumn>
                <TableColumn>{tableHeaders.second}</TableColumn>
                <TableColumn>{tableHeaders.third}</TableColumn>
              </TableHeader>
              <TableBody>
                {transportationTableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.raleigh}</TableCell>
                    <TableCell>{row.raleighCary}</TableCell>
                    <TableCell>{row.northCarolina}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default TransportationOverviewCard;
