"use client";
import {
  Button,
  Card,
  Input,
  CardHeader,
  CardBody,
  Image,
  ButtonGroup,
  Tabs,
  Tab,
  Spinner,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Footer from "@/components/common/Footer/Footer";
import { SearchMap } from "@/components/Maps/index";
import Beds from "@/components/SearchPage/beds";
import Baths from "@/components/SearchPage/baths";
import Price from "@/components/SearchPage/price";
import HomeTypes from "@/components/SearchPage/homeTypes";
import Filter from "@/components/SearchPage/filter";
import ToggleTab from "@/components/SearchPage/ToggleTab";
import SearchCard from "@/components/SearchPage/SearchCrd";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";

const defaultProps = {
  lat: Number(23.079727),
  lng: Number(77.37855),

  zoom: 13,
};
// Data for the cards
const cardData = [
  {
    title: "Frontend Radio",
    subtitle: "12 Tracks",
    description: "Daily Mix",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "Backend Beats",
    subtitle: "15 Tracks",
    description: "Weekly Highlights",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "UI/UX Essentials",
    subtitle: "10 Tracks",
    description: "Top Picks",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "JavaScript Jams",
    subtitle: "20 Tracks",
    description: "New Releases",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "React Rhythms",
    subtitle: "8 Tracks",
    description: "Best of the Week",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "CSS Classics",
    subtitle: "22 Tracks",
    description: "Trending Now",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
];

export default function SearchPage() {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(async () => {
    const url = `https://zoopla.p.rapidapi.com/v2/auto-complete?locationPrefix=${searchTerm}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8",
        "x-rapidapi-host": "zoopla.p.rapidapi.com",
      },
    };

    try {
      setIsDataLoading(true);
      setResults([]);

      const response = await fetch(url, options);
      const result = await response.json();
      setResults(result?.data?.geoSuggestion);
      setIsDataLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
      return;
    } else if (searchTerm.length >= 1) {
      setIsDataLoading(true);
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, handleSearch]);

  return (
    <main className="flex flex-col h-screen relative">
      <div className="w-screen fixed flex bg-content1 z-40 justify-between items-center px-10">
        <div className="flex items-center p-2 w-full gap-2">
          <Input
            bordered
            clearable
            type="text"
            label="Enter any location.."
            contentLeft={<Icon icon="search" fill="currentColor" />}
            contentLeftStyling={false}
            placeholder="Location"
            size="lg"
            className="w-full max-w-xs"
            endContent={<Icon icon="fluent-emoji-high-contrast:cross-mark" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Beds />
          <Baths />
          <Price />
          <HomeTypes />
          {/* <Button
            endContent={<Icon icon="ph:caret-down-fill" />}
            radius="sm"
            size="lg"
            className="w-full justify-between max-w-xs"
            auto
          >
            Open House
          </Button> */}
          <Filter />
          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2"
            auto
          >
            Save my Search
          </Button>
        </div>
      </div>
      <div className="w-[40vw] mx-3 pt-20 absolute top-2">
        {isDataLoading ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-2"
          >
            <Card className="max-h-[50vh] overflow-y-auto py-2">
              <Spinner label="Loading..." color="warning" />
            </Card>
          </motion.div>
        ) : (
          <>
            {results && results?.length !== 0 && (
              <SearchDropdown results={results} />
            )}
          </>
        )}
      </div>

      <div className="w-screen flex flex-grow pt-20">
        {/* static */}
        <div className="w-1/2 flex flex-col gap-4 p-4 mb-10 fixed ">
          {/* <Card className="h-[70vh] ">
            <SearchMap center={defaultProps} />
          </Card> */}
        </div>
        {/* scrollable */}

        <div className="w-1/2 flex flex-col p-6 overflow-y-auto ml-auto height-full">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-3xl uppercase font-bold">35000+ Properties</h3>
            <div className="flex space-x-2">
              <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
                hide map
              </Button>
              <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
                sort
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 w-full">
            {/* <ToggleTab/> */}
            <ButtonGroup
              radius="sm"
              size="lg"
              className="w-full border-default-300"
            >
              <Button className="flex-1">Homes</Button>
              <Button className="flex-1">Neighborhood</Button>
            </ButtonGroup>
          </div>

          <div className="grid p-4 grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-full">
            {cardData.map((card, index) => (
              <SearchCard key={index} property={card} />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
//working
