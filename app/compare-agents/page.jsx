'use client';
import { Divider, Card, Image } from '@nextui-org/react';
import React, { useState } from 'react';

export default function CompareEstateAgents() {
    const locations = [
        { id: 1, name: 'Estate Agents in Birmingham' },
        { id: 2, name: 'Estate Agents in Leeds' },
        { id: 3, name: 'Estate Agents in London' },
        { id: 4, name: 'Estate Agents in Nottingham' },
        { id: 5, name: 'Estate Agents in Bristol' },
        { id: 6, name: 'Estate Agents in Leicester' },
        { id: 7, name: 'Estate Agents in Manchester' },
        { id: 8, name: 'Estate Agents in Scotland' },
        { id: 9, name: 'Estate Agents in Cardiff' },
        { id: 10, name: 'Estate Agents in Liverpool' },
        { id: 11, name: 'Estate Agents in Newcastle' },
        { id: 12, name: 'Estate Agents in Sheffield' },
      ];
    const stepsData = [
        {
          id: 1,
          title: 'Compare Agents',
          description:
            'We analyse millions of property sales to help you identify the top performing agents in your area.',
        },
        {
          id: 2,
          title: 'Book Valuations',
          description:
            'Decide which agents best fit your needs and book valuations in just a few clicks.',
        },
        {
          id: 3,
          title: 'Pick Your Favourite',
          description:
            'Use the valuations to get to know the agents. Choose your preferred one to sell your home!',
        },
        {
          id: 4,
          title: 'Monitor Your Listing',
          description:
            'GetAgent\'s data-driven tools let you monitor your progress and help keep your sale on track.',
        },
      ];
  const [postcode, setPostcode] = useState('');

  const handleSearch = () => {
    if (!postcode) {
      alert('Please enter a valid postcode');
      return;
    }
    console.log(`Searching for agents in: ${postcode}`);
  };
  const handleCompare = () => {
    if (!postcode) {
      alert('Please enter a valid postcode');
      return;
    }
    console.log(`Comparing agents for postcode: ${postcode}`);
  };

  return (
    <section className="max-w-[100vw] bg-blue-600 text-white py-16 mt-16">
    <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section */}
        <div className="w-full md:max-w-lg text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Compare Estate Agents</h1>
            <p className="mb-8 text-lg">See which agents will do the best job of selling your home, based on past performance.</p>

            {/* Postcode Input Section */}
            <div className="flex flex-col sm:flex-row items-center w-full mb-8">
                <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter full postcode, e.g. E15 1DY"
                    className="flex-1 py-3 px-6 mb-4 sm:mb-0 rounded-full text-black text-lg placeholder-gray-400 outline-none shadow-lg"
                />
                <button
                    onClick={handleSearch}
                    className="w-full sm:w-auto sm:ml-4 bg-green-500 text-white font-semibold rounded-full px-6 py-3 hover:bg-green-600 transition"
                >
                    Get Started
                </button>
            </div>

            {/* Benefits List */}
            <ul className="space-y-4 text-lg">
                <li className="flex items-center justify-center md:justify-start">
                    <svg className="h-6 w-6 text-green-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 15.17l9.19-9.19 1.41 1.41L10 17.99 3.64 11.64 5.05 10.22l4.95 4.95z" />
                    </svg>
                    Data-driven recommendations
                </li>
                <li className="flex items-center justify-center md:justify-start">
                    <svg className="h-6 w-6 text-green-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 15.17l9.19-9.19 1.41 1.41L10 17.99 3.64 11.64 5.05 10.22l4.95 4.95z" />
                    </svg>
                    No obligation
                </li>
                <li className="flex items-center justify-center md:justify-start">
                    <svg className="h-6 w-6 text-green-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 15.17l9.19-9.19 1.41 1.41L10 17.99 3.64 11.64 5.05 10.22l4.95 4.95z" />
                    </svg>
                    Fast & easy
                </li>
            </ul>
        </div>

        {/* Right Section with Image */}
        <div className="w-full mb-8 md:mb-0 md:max-w-md md:ml-12 flex justify-center">
            <Image
                src="https://www.getagent.co.uk/_next/image?url=%2Fimages%2Fhomepage%2Fhomepage-masthead.png&w=1080&q=75"
                alt="Agent Comparison Preview"
                className="max-w-full"
            />
        </div>
    </div>

      {/* New Section Below the Main One */}
      <div className="bg-blue-100 text-black py-12 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start">
          
          {/* Left Text Section */}
          <div className="max-w-lg mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Making your home sale easy</h2>
            <p className="mb-4">
              GetAgent.co.uk is the Estate Agent comparison site. Since 2015, we&apos;ve helped more than <strong>800,000 homeowners</strong> across the UK sell their home for the best possible price.
            </p>
            <p className="mb-4">
              We do this by analysing heaps of property data and allowing you to compare Estate Agent performance.
            </p>
            
          </div>
          <div className="h-full w-[1px] bg-gray-300 mx-4"></div>

          {/* Right Section with Testimonial */}
          <div className="flex-1 mx-8">
            <div className="bg-white rounded-lg  p-6 mb-6">
              <blockquote className="text-xl font-semibold mb-4">
                &quot;My house was on the market for a year with no success. I used GetAgent.co.uk to find a new agent and we sold in a few weeks with two offers!&quot;
              </blockquote>
              <p className="text-right">- Mr Haile</p>
            </div>

            {/* Benefits List */}
            <ul className="space-y-2 text-lg">
              <li>✅ No obligation</li>
              <li>✅ 100% free</li>
              <li>✅ Transparent & independent</li>
              <li>✅ Sell faster & for more money</li>
              <li>✅ Instant results</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">How to Pick the Best Estate Agent</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stepsData.map((step) => (
            <Card
              key={step.id}
              className="flex flex-col bg-gradient-to-b from-blue-50 to-blue-100  items-center p-6 rounded-lg border-border-gray-100"
            >
              <div className="rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center mb-4 text-lg font-bold">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-center">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-blue-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-black">Find an Estate Agent Near You</h2>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200  transition cursor-pointer"
            >
              <span className="text-lg font-medium text-blue-400">{location.name}</span>
              <svg
                className="h-6 w-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* See All Areas Link */}
        <div className="text-center mt-8">
          <a href="#" className="text-blue-600 hover:underline font-semibold">
            See all areas →
          </a>
        </div>
      </div>
    </div>
    <div className="bg-blue-600 text-white py-16 px-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Image Section */}
        <div className="mb-8">
          <Image
                  src="https://www.getagent.co.uk/_next/image?url=%2Fimages%2Fhomepage%2Fhomepage-masthead.png&w=1080&q=75"
            alt="Comparison Preview"
            className="w-full max-w-md "
          />
        </div>

        {/* Text Section */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">Compare Estate Agents</h2>
        <p className="text-lg text-center mb-8">It takes 2 minutes.</p>

        {/* Input and Button Section */}
        <div className="flex flex-col sm:flex-row items-center w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter your postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="flex-1 py-3 px-6 mb-4 sm:mb-0 rounded-full text-black text-lg placeholder-gray-400 outline-none shadow-lg"
          />
          <button
            onClick={handleCompare}
            className="ml-0 sm:ml-4 bg-green-500 text-white font-semibold rounded-full px-6 py-3 hover:bg-green-600 transition"
          >
            Compare Agents
          </button>
        </div>
      </div>
    </div>

    </section>
    
  );
}
