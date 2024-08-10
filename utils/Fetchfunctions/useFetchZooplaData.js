import { useState, useCallback, useEffect } from 'react';

export default function useFetchZooplaData(searchTerm) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      setIsDataLoading(true);
      setResults([]);

      const postcodeResponse = await fetch(`/api/get-postcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postcode: searchTerm }),
      });
      const postcodeResult = await postcodeResponse.json();
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

  return { isDataLoading, results };
}
