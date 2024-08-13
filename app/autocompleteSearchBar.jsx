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
  const [results, setResults] = useState(null); // Initialize as null

  const searchPostcode = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const response = await fetch(`/api/get-postcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });
      const postcodeResult = await response.json();

      if (postcodeResult.postcode.length > 0 || postcodeResult.address.length > 0) {
        setResults(postcodeResult);
      }


     
    } catch (error) {
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm]);

  const searchThirdPartyAPI = useCallback(async () => {
    try {
      setIsDataLoading(true);

      const url = `https://zoopla.p.rapidapi.com/v2/auto-complete?locationPrefix=${searchTerm}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8",
          "x-rapidapi-host": "zoopla.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();
      setResults(result?.data?.geoSuggestion || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
    } else if (searchTerm.length >= 2) {
      searchPostcode(); // Immediate search for pincode
    }
  }, [searchTerm, searchPostcode]);

  // useEffect(() => {
  //   if (searchTerm === "" || (results && results.length > 0)) {
  //     return;
  //   }

  //   const delayDebounceFn = setTimeout(() => {
  //     searchThirdPartyAPI(); // Debounced search for third-party API
  //   }, 1000); // Adjust debounce timing as needed

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm, searchThirdPartyAPI, results?.length]); // Use optional chaining


  
  return (
    <div className="mt-4">
      <Input
        placeholder="Search"
        variant="bordered"
        className="flex-grow radius-lg"
        value={searchTerm}
        color="primary"
        size="lg"
        onChange={(e) => setSearchTerm(e.target.value)}
        endContent={<Icon icon="akar-icons:search" />}
      />

      {/* {isDataLoading && (
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
      )} */}
      {results && (
        <SearchDropdown results={results} isDataLoading={isDataLoading} />
      )}
    </div>
  );
}
