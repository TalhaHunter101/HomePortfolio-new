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
  const [results, setResults] = useState(null);

  const searchPostcode = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const response = await fetch(`/api/search/listing-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue: searchTerm }),
      });
      const postcodeResult = await response.json();

      if (postcodeResult && !areAllArraysEmpty(postcodeResult)) {
        setResults(postcodeResult);
      } else {
        setResults(null);
      }
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
      searchPostcode(); // Immediate search for pincode
    }
  }, [searchTerm, searchPostcode]);

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

      {results && (
        <div>
          <SearchDropdown results={results} isDataLoading={isDataLoading} />
        </div>
      )}
    </div>
  );
}
