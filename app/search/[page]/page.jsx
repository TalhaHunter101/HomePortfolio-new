"use client";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ShowDataCards from "@/components/ListingSearch/ShowDataCards";
import Beds from "@/components/SearchPage/beds";
import Baths from "@/components/SearchPage/baths";
import Price from "@/components/SearchPage/price";
import Filter from "@/components/SearchPage/filter";
import useStore from "@/store/useStore";
import useFetchZooplaData from "@/utils/Fetchfunctions/useFetchZooplaData";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import withClickOutside from "@/components/DropdownHOC";
import { debounce } from "lodash";

const SearchDropdownWithClickOutside = withClickOutside(SearchDropdown);

const SearchPage = ({ params }) => {
  const encodedPage = params.page;
  const page = decodeURIComponent(encodedPage.replace(/-/g, " "));
  const locationValue = page.split(/[\s,]+/)[0];
  const [listingData, setListingData] = useState([]);
  const [isnewDataLoading, setisnewDataLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    searchTerm,
    setSearchTerm,
    results,
    setResults,
    isDataLoading,
    setIsDataLoading,
    searchPostcode,
    selectedBeds,
    selectedBaths,
    minPrice,
    maxPrice,
  } = useStore();

  const handleChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const wordCount = term.length;

    if (wordCount > 2) {
      await searchPostcode(searchTerm);
      setIsDropdownOpen(true);
    }
  };

  // const fetchProperties = async () => {

  // };

  const fetchProperties = useCallback(async () => {
    setisnewDataLoading(true);
    const filters = {
      minPrice,
      maxPrice,
      bedrooms: selectedBeds,
      bathrooms: selectedBaths,
    };

    const response = await fetch(`/api/search/get-listing-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchValue: page,
        filters,
      }),
    });

    try {
      setisnewDataLoading(true);
      const result = await response.json();
      setListingData(result?.results || []);
      setTotalCount(result?.totalCount || 0);
      setisnewDataLoading(false);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setisnewDataLoading(false);
    }
  }, [page, minPrice, maxPrice, selectedBeds, selectedBaths]);

  useEffect(() => {
    fetchProperties();
  }, [page]);

  return (
    <main className="flex mt-16 flex-col h-screen">
      <div className="w-screen fixed flex bg-content1 z-40 justify-between items-center ">
        <div className="flex items-center p-2 w-full gap-2">
          <Input
            bordered
            type="text"
            value={searchTerm}
            contentLeftStyling={false}
            placeholder={page}
            size="lg"
            className="w-full max-w-md z-40"
            endContent={
              <Icon icon="carbon:close-filled" className="text-2xl" />
            }
            onChange={handleChange} // debounce to reduce API calls
          />
        </div>

        <div className="flex items-center gap-2">
          <Beds />
          <Baths />
          <Price />

          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2 text-white font-semibold"
            auto
            onPress={() => fetchProperties()}
            isLoading={isnewDataLoading}
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
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <ShowDataCards totalcount={totalCount} cardData={listingData} />
      )}
    </main>
  );
};

export default SearchPage;
