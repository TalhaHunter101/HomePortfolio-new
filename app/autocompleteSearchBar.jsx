import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import { areAllArraysEmpty } from "@/utils/Helper";

export default function AutocompleteSearch({ properties }) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      setIsDataLoading(true);
      setResults([]);

      // First, call your internal API to search by postcode
      const postcodeResponse = await fetch(`/api/get-postcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postcode: searchTerm }),
      });
      const postcodeResult = await postcodeResponse.json();
      console.log("postcodeResult", postcodeResult);
      setResults(postcodeResult);
      

      if (postcodeResult.length > 0) {
        setResults(postcodeResult);
      } else {
        const url = `https://zoopla.p.rapidapi.com/v2/auto-complete?locationPrefix=${searchTerm}`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8",
            "x-rapidapi-host": "zoopla.p.rapidapi.com",
          },
        };

        const zooplaResponse = await fetch(url, options);
        const zooplaResult = await zooplaResponse.json();
        setResults(zooplaResult?.data?.geoSuggestion || []);
      }

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
    <div className="">
      <Card className="w-full  p-4 flex flex-col items-center lg:flex-row gap-4">
        <Input
          placeholder="Search"
          variant="bordered"
          className="flex-grow radius-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          color="secondary"
          radius="lg"
          className="w-full lg:w-auto text-white font-semibold"
        >
          <p className="p-1 flex items-start">Search </p>
        </Button>
      </Card>

      {isDataLoading && (
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
      )}
      {results && results?.length !== 0 && <SearchDropdown results={results} />}
    </div>
  );
}
