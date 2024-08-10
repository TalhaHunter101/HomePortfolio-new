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
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [bathrooms, setBathrooms] = useState("all");
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
    <div className="mt-4">
      {/* <Card className="w-full  p-4 flex flex-col items-center lg:flex-row gap-4"> */}
        <Input
          placeholder="Search"
          variant="bordered"
          className="flex-grow radius-lg "
          value={searchTerm}
          color="primary"
          size="lg"
          onChange={(e) => setSearchTerm(e.target.value)}
          endContent={
            <
            >
              <Icon icon="akar-icons:search" />
            </>
          }
        />

      {/* </Card> */}

      {/* {!areAllArraysEmpty(results) && <SearchDropdown results={results} />} */}
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
