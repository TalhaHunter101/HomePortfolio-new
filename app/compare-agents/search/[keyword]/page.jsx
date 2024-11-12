"use client";
import {
  Breadcrumbs,
  Card,
  Button,
  BreadcrumbItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
  Image,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { formatCurrency } from "@/utils/Helper";
import { AgentSearchMapStatic } from "@/components/Maps";
import Link from "next/link";

const estateAgents = [
  {
    name: "Duxburys Commercial",
    address:
      "8 Metropolitan Business Park, Preston New Road, Blackpool, FY3 9LT",
    featured: true,
    image: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    name: "Entwistle Green - Blackpool Sales",
    address: "32 - 36 Topping Street, Blackpool, FY1 3AQ",
    featured: true,
    avgListingTime: "23 weeks",
    avgAskingPrice: "£152,580",
    propertiesForSale: 152,
    image: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    name: "Entwistle Green - Thornton-Cleveleys Sales",
    address: "140 Victoria Road West, Cleveleys, FY5 3LG",
    featured: true,
    avgListingTime: "19 weeks",
    image: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    name: "Hunters - Blackpool",
    address: "25-27 Highfield Road, Blackpool, FY4 2JD",
    featured: true,
    avgListingTime: "25 weeks",
    image: "https://via.placeholder.com/50", // Placeholder image URL
  },
];

export default function EstateAgentPage({ params }) {
  const keyword = params.keyword.split("-").join(" ").toUpperCase();
  const [showMap, setShowMap] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [data, setData] = useState({});
  const [avgAskingPrice, setAvgAskingPrice] = useState(0);
  const [avgWeeksOnMarket, setAvgWeeksOnMarket] = useState(0);
  const [availableListings, setAvailableListings] = useState(0);
  const [agentMapCordinate, setAgentMapCordinate] = useState([]);

  const cardData = [
    {
      title: "Average Asking Price",
      value: formatCurrency(avgAskingPrice),
      color: "text-blue-700",
    },
    {
      title: "Average Sale Time",
      value: `${avgWeeksOnMarket} weeks`,
      color: "text-blue-700",
    },
    {
      title: "Asking Price Change",
      value: "-1.7%",
      color: "text-blue-700",
    },
    {
      title: "Average Estate Agent Fee",
      value: "£1,000",
      color: "text-blue-700",
    },
  ];

  useEffect(() => {
    const getSearchResultsData = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch("/api/agents/get-search-agent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode: keyword }),
        });

        const data = await response.json();
        setData(data);

        // Format and update the values
        setAvgAskingPrice(
          data.statistics?.avgAskingPrice?.toFixed(0).toLocaleString() || "0"
        );
        setAvgWeeksOnMarket(
          data.statistics?.avgWeeksOnMarket?.toFixed(0) || "0"
        );
        setAvailableListings(
          data.statistics?.availableListings?.toFixed(0) || "0"
        );

        const agentMapData = data.data.map((agent) => ({
          lat: parseFloat(agent.location.lat),
          lng: parseFloat(agent.location.lng),
        }));

        setAgentMapCordinate(agentMapData);

        setIsDataLoading(false);
      } catch (error) {
        console.log("error is", error);
        setIsDataLoading(false);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (keyword) {
      getSearchResultsData();
    }
  }, [keyword]);

  return (
    <section className="max-w-[100vw] bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 py-16 px-4 mt-10">
      {isDataLoading ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs size="lg" className="mb-8">
            <BreadcrumbItem href="/" className="text-blue-700">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/estate-agents" className="text-blue-700">
              Estate Agents
            </BreadcrumbItem>
            <BreadcrumbItem
              href="/estate-agents/bristol"
              className="text-blue-900 font-semibold"
            >
              Estate Agents in Bristol
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* Title Section */}
          <h1 className="text-5xl font-bold mt-4 mb-6 text-blue-900">
            £{formatCurrency(avgAskingPrice)} Estate Agents in Bristol
          </h1>
          <p className="text-lg mb-6 text-blue-800 leading-relaxed">
            Compare the performance of top local estate agents.
          </p>
          <p className="mb-10 text-blue-800 leading-relaxed">
            In the last {avgWeeksOnMarket} months,{" "}
            {formatCurrency(availableListings)} properties were listed for sale
            by {data?.statistics?.count} agents in Bristol. The average asking
            price is £{formatCurrency(avgAskingPrice)}, and properties take
            about 11 weeks to go under offer. Estate agents in Bristol typically
            charge around 1.2%, amounting to an average fee of £5,059.
          </p>

          {/* Market Summary Section */}
          <div className="rounded-lg mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-900">
              Bristol Property Market Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  className="flex flex-col p-6 rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2 text-blue-900">
                    {card.title}
                  </h3>
                  <p className={`text-3xl font-semibold ${card.color}`}>
                    {card.value}
                  </p>
                </Card>
              ))}
            </div>

            {/* Valuation CTA Section */}
            <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-8 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between mt-10">
              <div className="flex-1 mb-6 sm:mb-0">
                <h3 className="text-2xl font-bold mb-2 text-blue-900">
                  Find Out How Much Your Property Is Worth
                </h3>
                <p className="text-lg text-blue-800">
                  Get an instant online valuation in just a few seconds!
                </p>
              </div>
              <Button
                color="primary"
                className="text-lg px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                onClick={() => alert("Redirecting to valuation tool...")}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Map Placeholder Section */}
          {showMap && (
            <div className="bg-blue-50 rounded-lg h-[300px] flex items-center justify-center text-blue-700 text-xl font-semibold shadow-inner">
              <div style={{ height: "200px", width: "100%" }}>
                <AgentSearchMapStatic
                  center={agentMapCordinate}
                  height="300px"
                />
              </div>
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
              {showMap ? "Hide Map" : "Show Map"}
            </Switch>
          </div>

          {/* Sorting and Results Section */}
          <div className="flex justify-end items-center mb-10">
            <p className="text-blue-800 text-lg pr-2">10 results</p>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  radius="sm"
                  variant="solid"
                  className="shadow hover:shadow-md transition-shadow bg-blue-600 text-white hover:bg-blue-700"
                >
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

          {data?.data && data.data.length === 0 && (
            <p className="text-blue-800 text-lg font-semibold">
              No agents found for this search.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {data.data.map((agent, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-md flex flex-col transition-transform duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    {/* Agent Logo */}
                    <Image
                      src={agent.logo.uri}
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
                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                  {agent.agent_name}
                </h2>
                <p className="text-blue-800 mb-4">{agent.displayAddress}</p>
                <div className="text-blue-800 text-sm mb-4">
                  {agent?.listingsStatistics?.residential?.forSale
                    ?.avgWeeksOnMarket && (
                    <p>
                      Avg. listing time:{" "}
                      <strong>
                        {
                          agent.listingsStatistics.residential.forSale
                            .avgWeeksOnMarket
                        }
                      </strong>
                    </p>
                  )}
                  {agent?.listingsStatistics?.residential?.forSale
                    ?.avgAskingPrice && (
                    <p>
                      Avg. asking price:{" "}
                      <strong>
                        {formatCurrency(
                          agent.listingsStatistics.residential.forSale
                            .avgAskingPrice
                        )}
                      </strong>
                    </p>
                  )}
                  {agent?.listingsStatistics?.residential?.forSale
                    ?.availableListings && (
                    <p>
                      Currently for sale:{" "}
                      <strong>
                        {
                          agent.listingsStatistics.residential.forSale
                            .availableListings
                        }
                      </strong>
                    </p>
                  )}
                </div>
                <Link
                  variant="ghost"
                  className="mt-auto bg-blue-200 hover:text-blue-800 transition-colors duration-200 text-center  py-1 rounded-lg"
                  href={`/compare-agents/agents/${agent.uriName}`}
                >
                  Get a free valuation
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
