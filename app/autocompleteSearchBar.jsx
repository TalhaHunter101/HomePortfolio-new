import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import { areAllArraysEmpty } from "@/utils/Helper";
import useStore from "@/store/useStore";
import { Button, Input } from "@nextui-org/react";

export default function AutocompleteSearch({ properties }) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const { clearAllFilter } = useStore();

  const searchPostcode = useCallback(async () => {
    try {
      setIsDataLoading(true);
      clearAllFilter();

      // Fetch results from /listing-search
      const listingResponse = await fetch(`/api/get-postcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });
      const listingResult = await listingResponse.json();

      let mergedResults = {
        uk: [],
        county: [],
        address: [],
        regionName: [],
        housPricesAddress: [], // Initialize with empty array
      };

      if (listingResult && !areAllArraysEmpty(listingResult)) {
        mergedResults = { ...listingResult };
      }

      setResults(mergedResults);
    } catch (error) {
      console.error(error);
      setResults(null);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
    } else if (searchTerm.length >= 2) {
      searchPostcode();
    }
  }, [searchTerm, searchPostcode]);

  return (
    <div className="mt-4 p-4 w-full flex justify-center">
      {/* Container for input and dropdown */}
      <div className="relative flex items-center w-full max-w-3xl">
        <Input
          variant="bordered"
          radius="none"
          type="text"
          placeholder="Search for any address, city, neighbourhood or postcode"
          className="flex-grow text-md outline-none focus:outline-none transition-all duration-200 ease-in-out md:text-sm sm:text-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          radius="none"
          className="bg-blue-500 text-sm text-white px-6 py-3 hover:bg-blue-600 transition-all duration-200 ease-in-out md:px-4 md:py-2 md:text-sm sm:px-2 sm:py-1 sm:text-xs"
          onClick={searchPostcode}
          css={{ marginLeft: "-1px" }}
        >
          Search
        </Button>
        <Button
          radius="none"
          variant="bordered"
          color="gray"
          className="text-sm text-gray-500 px-6 py-3 transition-all duration-200 ease-in-out ml-2 md:px-4 md:py-2 md:text-sm sm:px-2 sm:py-1 sm:text-xs"
        >
          Book a demo
        </Button>

        {results && (
          <div className="absolute top-full left-0 w-full mt-2 z-10 bg-white rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto">
            <SearchDropdown results={results} isDataLoading={isDataLoading} />
          </div>
        )}
      </div>
    </div>
  );
}
