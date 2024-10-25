import client from "@/lib/elastic";

export const searchPostcodeNeighbourhood = async (query) => {
    const esQueryForPostCodeAndLocations = {
      bool: {
        should: [
          {
            match_phrase_prefix: {
              ref_postcode: {
                query: query, // For postcode prefix matches
                max_expansions: 10, // Increase max expansions for better coverage
              },
            },
          },
          {
            match: {
              ref_postcode: {
                query: query, // Fallback match query to handle exact matches
                fuzziness: "AUTO", // Enable fuzziness for more flexible matching
              },
            },
          },
          {
            wildcard: {
              ref_postcode: {
                value: `${query.toLowerCase()}*`, // Using wildcard query for flexible matches
              },
            },
          },
          {
            match_phrase_prefix: {
              "location.townOrCity": {
                query: query, // Ensure townOrCity prefix matches only
                max_expansions: 50,
              },
            },
          },
        ],
      },
    };
  
    try {
      const result = await client.search({
        index: "listings_new1",
        body: {
          query: esQueryForPostCodeAndLocations,
        },
      });
  
      // Return the hits from the search
      return result.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.error("Elasticsearch search error:", error);
      throw error;
    }
  };
