import { useState, useCallback, useEffect } from 'react';

export default function useFetchZooplaData(searchTerm) {
  const [isDataLoading, setIsDataLoading] = useState(false);
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
