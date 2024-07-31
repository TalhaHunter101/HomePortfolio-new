import React, { useEffect, useState } from "react";
import {

  Button,
  Card,
  Input,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import { areAllArraysEmpty } from "@/utils/Helper";

export default function AutocompleteSearch({ properties }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    const response = await fetch("/api/get-listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchValue: searchTerm,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const properties = await response.json();

    setResults(properties);

    // let results = properties.filter((property) => {
    //   return property.description
    //     .toLowerCase()
    //     .includes(searchTerm.toLowerCase());
    // });

    // setResults(results);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
      return;
    } else if (searchTerm.length >= 3) {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <div className="">
      <Card className="w-full  p-4 flex flex-col lg:flex-row gap-4">
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
          <p className="p-1 flex items-start">
            Search{" "}
          </p>
        </Button>
      </Card>

      {!areAllArraysEmpty(results) && <SearchDropdown results={results} />}

    </div>
  );
}
