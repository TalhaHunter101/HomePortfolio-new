'use client';
import { Tabs, Tab, Card, Button } from '@nextui-org/react';
import React from 'react';
import { Icon } from '@iconify/react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';

export default function AgentDetail() {
    const agent = {
        name: 'Duxburys Commercial, FY3',
        address: '8 Metropolitan Business Park, Preston New Road, Blackpool, FY3 9LT',
        phone: '01253 520823',
        email: 'info@duxburycommercial.com',
        overview: `Duxburys Commercial is an estate agent in Blackpool. They mainly list properties in FY1, FY3, and FY4. Over the last 6 months, they've listed 134 properties, with 53 currently on the market. Most of the properties listed have 3 bedrooms. They list properties for sale on Zoopla and Rightmove.`,
        openingHours: [
            { day: 'Monday', hours: '8:00am - 8:00pm' },
            { day: 'Tuesday', hours: '8:00am - 8:00pm' },
            { day: 'Wednesday', hours: '8:00am - 8:00pm' },
            { day: 'Thursday', hours: '8:00am - 8:00pm' },
            { day: 'Friday', hours: '8:00am - 8:00pm' },
            { day: 'Saturday', hours: '9:00am - 6:00pm' },
            { day: 'Sunday', hours: '10:00am - 4:00pm' },
        ],
        mapUrl: 'https://via.placeholder.com/600x300', // Placeholder map image URL
    };

    // Data for charts
    const bedroomData = [
        { name: '1 bed', value: 10 },
        { name: '2 bed', value: 20 },
        { name: '3 bed', value: 30 },
        { name: '4 bed', value: 25 },
        { name: '5 bed', value: 15 }
    ];

    const postcodeData = [
        { name: 'BS31', value: 35 },
        { name: 'BS14', value: 25 },
        { name: 'BS4', value: 20 },
        { name: 'BS30', value: 10 },
        { name: 'Others', value: 10 }
    ];

    const listingData = [
        { month: 'May 2024', listings: 65 },
        { month: 'Jul 2024', listings: 60 },
        { month: 'Sep 2024', listings: 75 },
        { month: 'Nov 2024', listings: 55 }
    ];

    const marketShareData = [
        { month: 'Jun 2024', BS31: 18.9, BS14: 8, BS4: 1.6, BS30: 1.1 },
        { month: 'Jul 2024', BS31: 22.5, BS14: 5.5, BS4: 2.1, BS30: 1.5 },
        { month: 'Aug 2024', BS31: 19, BS14: 7.8, BS4: 1.5, BS30: 1.2 },
        { month: 'Sep 2024', BS31: 15.5, BS14: 10.2, BS4: 3.4, BS30: 0.9 },
        { month: 'Oct 2024', BS31: 18.8, BS14: 8.2, BS4: 1.6, BS30: 1.1 },
        { month: 'Nov 2024', BS31: 21.0, BS14: 6.3, BS4: 2.8, BS30: 1.4 },
        { month: 'Dec 2024', BS31: 16.2, BS14: 9.5, BS4: 1.9, BS30: 1.0 },
    ];

    const colors = ["#93c5fd", "#60a5fa", "#2563eb", "#1d4ed8", "#1e40af"];

    return (
        <section className='bg-gradient-to-b from-blue-50 to-blue-100 mt-10'>
            <div className="container mx-auto px-8 py-12 rounded-lg">
                {/* Agent Header */}
                <div className="mb-10 border-b pb-8 border-blue-300">
                    <h1 className="text-5xl font-extrabold text-blue-900">{agent.name}</h1>
                    <p className="text-blue-700 text-lg mt-2">{agent.address}</p>
                    <div className="flex items-center mt-6 space-x-6">
                        <div className="flex items-center gap-2 text-blue-600">
                            <Icon icon="solar:phone-outline" width="20" height="20" />
                            <a href={`tel:${agent.phone}`} className="underline hover:text-blue-800">
                                {agent.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                            <Icon icon="line-md:email" width="20" height="20" />
                            <a href={`mailto:${agent.email}`} className="underline hover:text-blue-800">
                                Email agent
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tabs for Overview and Location */}
                <Tabs variant="underlined" aria-label="Agent Detail Tabs">
                    <Tab key="overview" title="Overview">
                        {/* Overview Content */}
                        <div className="mt-10 flex flex-col lg:flex-row lg:gap-12">
                            {/* Description on the Left */}
                            <div className="lg:w-2/3 text-blue-800 leading-relaxed mb-6 lg:mb-0 bg-white p-6 rounded-lg shadow-md">
                                {agent.overview}
                            </div>

                            {/* Opening Hours on the Right */}
                            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-blue-900 mb-4">Opening hours</h3>
                                <ul className="text-blue-800 text-sm space-y-2">
                                    {agent.openingHours.map((entry, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <Icon icon="ic:round-circle" color="green" width="10" height="10" className="mr-2" />
                                                <span className="font-medium">{entry.day}</span>
                                            </div>
                                            <span>{entry.hours}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Tab>

                    <Tab key="location" title="Location">
                        {/* Location Content */}
                        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                            <p className="text-blue-800 leading-relaxed mb-4">
                                View the location of <span className="font-semibold text-blue-900">{agent.name}</span> on the map below.
                            </p>
                            <div className="rounded-lg overflow-hidden shadow-lg border border-blue-300">
                                <img src={agent.mapUrl} alt="Map location" className="w-full h-72 object-cover" />
                            </div>
                        </div>
                    </Tab>
                </Tabs>

                {/* Grid for Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
                    {/* Pie Charts */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Listings by number of bedrooms</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    innerRadius={50}
                                    outerRadius={90}
                                    data={bedroomData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="60%" 
                                    cy="50%"
                                    fill="#2563eb"
                                    label
                                >
                                    {bedroomData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="left"
                                    iconSize={10}
                                    iconType="circle"
                                    wrapperStyle={{ left: -10 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Listings by postcode</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={90}
                                    data={postcodeData}
                                    dataKey="value"
                                    nameKey="name"
                                    fill="#2563eb"
                                    label
                                >
                                    {postcodeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="left"
                                    iconSize={10}
                                    iconType="circle"
                                    wrapperStyle={{ left: -10 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Number of listings</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={listingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar barSize={40} dataKey="listings" fill="#1d4ed8" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Listing market share</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={marketShareData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 24]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="BS31" stroke="#60a5fa" dot={false} />
                            <Line type="monotone" dataKey="BS14" stroke="#2563eb" dot={false} />
                            <Line type="monotone" dataKey="BS4" stroke="#1d4ed8" dot={false} />
                            <Line type="monotone" dataKey="BS30" stroke="#1e40af" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
