    import React from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

    const data = [
    { name: 'Violence and sexual offences', value: 23 },
    { name: 'Anti-social behaviour', value: 18 },
    { name: 'Other theft', value: 13 },
    { name: 'Shoplifting', value: 12 },
    { name: 'Public order', value: 10 },
    { name: 'Vehicle crime', value: 9 },
    { name: 'Burglary', value: 8 },
    { name: 'Theft from the person', value: 6 },
    { name: 'Criminal damage and arson', value: 5 },
    { name: 'Robbery', value: 3 },
    { name: 'Bicycle theft', value: 2 },
    { name: 'Drugs', value: 1 },
    ];

    export const CrimeTypesChart = () => (
        <div className="w-full h-350  bg-white rounded-lg ">
        <h3 className="mb-5 font-bold text-lg">Crime Types</h3>
    <ResponsiveContainer className={'text-xs'} width="100%" height={300}>
        <BarChart data={data} layout="vertical"  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value" fill="#4DD0E1" />
        </BarChart>
    </ResponsiveContainer>
    </div>
    );

    export default CrimeTypesChart;
