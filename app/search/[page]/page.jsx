"use client";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { lisitngData } from "@/public/dummydata/listingData";
import ShowDataCards from "@/components/ListingSearch/ShowDataCards";
import Beds from "@/components/SearchPage/beds";
import Baths from "@/components/SearchPage/baths";
import Price from "@/components/SearchPage/price";
import HomeTypes from "@/components/SearchPage/homeTypes";
import Filter from "@/components/SearchPage/filter";
import useStore from "@/store/useStore";
import useFetchZooplaData from "@/utils/Fetchfunctions/useFetchZooplaData";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import withClickOutside from "@/components/DropdownHOC";

const SearchDropdownWithClickOutside = withClickOutside(SearchDropdown);

export default function SearchPage({ params }) {
  const encodedPage = params.page;
  const page = decodeURIComponent(encodedPage.replace(/-/g, " "));
  const locationValue = page.split(/[\s,]+/)[0];
  const [listingData, setListingData] = useState([]);
  const [isnewDataLoading, setisnewDataLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const {
    searchTerm,
    setSearchTerm,
    results,
    setResults,
    isDataLoading,
    setIsDataLoading,
    selectedBeds,
    minPrice,
    maxPrice,
  } = useStore();
  const { isDataLoading: loading, results: searchResults } =
    useFetchZooplaData(searchTerm);

  useEffect(() => {
    setIsDataLoading(loading);
    setResults(searchResults);
    setIsDropdownOpen(true);
  }, [loading, searchResults, setIsDataLoading, setResults]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchProperties = async () => {
    let url = `https://zoopla.p.rapidapi.com/properties/v2/list?locationValue=${locationValue}&locationIdentifier=${locationValue}&furnishedState=Any&sortOrder=newest_listings&page=1`;

    if (selectedBeds !== "any") {
      url += `&bedsMax=${selectedBeds}`;
    }
    if (minPrice !== "any") {
      url += `&priceMin=${minPrice}`;
    }
    if (maxPrice !== "any") {
      url += `&priceMax=${maxPrice}`;
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8",
        "x-rapidapi-host": "zoopla.p.rapidapi.com",
      },
    };

    try {
      setisnewDataLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setListingData(result?.data?.listings?.regular);
      setTotalCount(result?.data?.analyticsTaxonomy?.searchResultsCount);
      setisnewDataLoading(false);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setisnewDataLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  return (
    <main className="flex flex-col h-screen">
      <div className="w-screen fixed flex bg-content1 z-40 justify-between items-center ">
        <div className="flex items-center p-2 w-full gap-2">
          <Input
            bordered
            
            type="text"
           
            value={searchTerm}
            // contentLeft={
            //   <Icon
            //     icon="search"
            //     fill="currentColor"
            //     onClick={() => setSearchTerm("")}
            //   />
            // }
            contentLeftStyling={false}
            placeholder={page}
            size="lg"
            // label="Search"
            className="w-full max-w-md z-40"
            // label="Search"
            // labelPlacement="top"
            endContent={<Icon icon="carbon:close-filled" className="text-2xl" />}
            onChange={handleChange}
          />


        </div>

        <div className="flex items-center gap-2">
          <Beds />
          <Baths />
          <Price />
          {/* <HomeTypes /> */}

          <Filter />
          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2 text-white font-semibold"
            auto
            onPress={() => fetchProperties()}
          >
            Search
          </Button>
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
              {isDropdownOpen && results && results?.length !== 0 && (
                <SearchDropdownWithClickOutside
                  results={results}
                  onClose={() => setIsDropdownOpen(false)} // Handle closing of dropdown
                />
              )}
            </>
          )}
        </div>
      </div>

      {isnewDataLoading ? (
        <div className="w-screen flex justify-center items-center h-[85vh]">
          <Spinner  color="primary" size="lg" />
        </div>
      ) : (
        <ShowDataCards totalcount={totalCount} cardData={listingData} />
      )}
    </main>
  );
}