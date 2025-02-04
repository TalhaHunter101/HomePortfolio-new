'use client';
import { Breadcrumbs, Card, Button, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

export default function EstateAgentPage() {
  // Sample data for the cards
  const cardData = [
    {
      title: 'Average Asking Price',
      value: '£433,325',
      color: 'text-blue-700'
    },
    {
      title: 'Average Sale Time',
      value: '11 weeks',
      color: 'text-blue-700'
    },
    {
      title: 'Asking Price Change',
      value: '-1.7%',
      color: 'text-blue-700'
    },
    {
      title: 'Average Estate Agent Fee',
      value: '1.2%',
      color: 'text-blue-700'
    }
  ];

  // Estate agent data
  const estateAgents = [
    {
      name: 'Duxburys Commercial',
      address: '8 Metropolitan Business Park, Preston New Road, Blackpool, FY3 9LT',
      featured: true,
      image: 'https://via.placeholder.com/50', // Placeholder image URL
    },
    {
      name: 'Entwistle Green - Blackpool Sales',
      address: '32 - 36 Topping Street, Blackpool, FY1 3AQ',
      featured: true,
      avgListingTime: '23 weeks',
      avgAskingPrice: '£152,580',
      propertiesForSale: 152,
      image: 'https://via.placeholder.com/50', // Placeholder image URL
    },
    {
      name: 'Entwistle Green - Thornton-Cleveleys Sales',
      address: '140 Victoria Road West, Cleveleys, FY5 3LG',
      featured: true,
      avgListingTime: '19 weeks',
      image: 'https://via.placeholder.com/50', // Placeholder image URL
    },
    {
      name: 'Hunters - Blackpool',
      address: '25-27 Highfield Road, Blackpool, FY4 2JD',
      featured: true,
      avgListingTime: '25 weeks',
      image: 'https://via.placeholder.com/50', // Placeholder image URL
    }
  ];

  // State to toggle the map visibility
  const [showMap, setShowMap] = useState(true);

  return (
    <section className="max-w-[100vw] bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 py-16 px-4 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <Breadcrumbs size="lg" className="mb-8">
          <BreadcrumbItem href="/" className="text-blue-700">Home</BreadcrumbItem>
          <BreadcrumbItem href="/estate-agents" className="text-blue-700">Estate Agents</BreadcrumbItem>
          <BreadcrumbItem href="/estate-agents/bristol" className="text-blue-900 font-semibold">Estate Agents in Bristol</BreadcrumbItem>
        </Breadcrumbs>

        {/* Title Section */}
        <h1 className="text-5xl font-bold mt-4 mb-6 text-blue-900">429 Estate Agents in Bristol</h1>
        <p className="text-lg mb-6 text-blue-800 leading-relaxed">
          Compare the performance of top local estate agents.
        </p>
        <p className="mb-10 text-blue-800 leading-relaxed">
          In the last 6 months, 10,387 properties were listed for sale by 429 agents in Bristol. The average asking price is
          £433,325, and properties take about 11 weeks to go under offer. Estate agents in Bristol typically charge around 1.2%, amounting
          to an average fee of £5,059.
        </p>

        {/* Market Summary Section */}
        <div className="rounded-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">Bristol Property Market Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => (
              <Card key={index} className="flex flex-col p-6 rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-blue-900">{card.title}</h3>
                <p className={`text-3xl font-semibold ${card.color}`}>{card.value}</p>
              </Card>
            ))}
          </div>
        
          {/* Valuation CTA Section */}
          <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-8 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between mt-10">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-blue-900">Find Out How Much Your Property Is Worth</h3>
              <p className="text-lg text-blue-800">Get an instant online valuation in just a few seconds!</p>
            </div>
            <Button
              color="primary"
              className="text-lg px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
              onClick={() => alert('Redirecting to valuation tool...')}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Map Placeholder Section */}
        {showMap && (
          <div className="bg-blue-50 rounded-lg mb-6 h-[300px] flex items-center justify-center text-blue-700 text-xl font-semibold shadow-inner">
            Map placeholder
          </div>
        )}
        <div className="flex justify-end mb-10">
          <Switch
            size="lg"
            color="primary"
            defaultSelected={showMap}
            startContent={<Icon icon="ri:eye-off-fill" />}
            endContent={<Icon icon="ri:eye-fill" />}
            onChange={() => setShowMap(!showMap)}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </Switch>
        </div>

        {/* Sorting and Results Section */}
        <div className="flex justify-end items-center mb-10">
          <p className="text-blue-800 text-lg pr-2">10 results</p>
          <Dropdown>
            <DropdownTrigger>
              <Button radius='sm' variant="solid" className="shadow hover:shadow-md transition-shadow bg-blue-600 text-white hover:bg-blue-700">
                Sort
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort options"
              onAction={(key) => alert(`Selected: ${key}`)}
            >
              <DropdownItem key="az">Default (A-Z)</DropdownItem>
              <DropdownItem key="price">Price</DropdownItem>
              <DropdownItem key="time">Listing Time</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Estate Agent Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {estateAgents.map((agent, index) => (
            <Card key={index} className="p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-md flex flex-col transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {/* Agent Logo */}
                  <Image
                    src={agent.image}
                    alt={`${agent.name} logo`}
                    className="w-14 h-14 mr-4 rounded-lg shadow"
                  />
                </div>
                {/* Featured Tag */}
                {agent.featured && (
                  <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-lg shadow">
                    ★ Featured
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-blue-900 mb-2">{agent.name}</h2>
              <p className="text-blue-800 mb-4">{agent.address}</p>
              <div className="text-blue-800 text-sm mb-4">
                {agent.avgListingTime && (
                  <p>Avg. listing time: <strong>{agent.avgListingTime}</strong></p>
                )}
                {agent.avgAskingPrice && (
                  <p>Avg. asking price: <strong>{agent.avgAskingPrice}</strong></p>
                )}
                {agent.propertiesForSale && (
                  <p>Currently for sale: <strong>{agent.propertiesForSale}</strong></p>
                )}
              </div>
              <Button
                variant='ghost'
                className="mt-auto text-blue-600 hover:text-blue-800 transition-colors duration-200"
                onClick={() => alert('Redirecting to valuation tool...')}
              >
                Get a free valuation
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
