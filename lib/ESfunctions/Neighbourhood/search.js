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

export const newNeighbourhoodSearch = async (query) => {
  const lowerQuery = query.toLowerCase(); // Normalize query to lowercase

  const esQueryForOutcodeDistrictAndName = {
    bool: {
      should: [
        {
          match_phrase_prefix: {
            outcode: {
              query: lowerQuery,
              max_expansions: 10,
            },
          },
        },
        {
          match: {
            district_code: {
              query: lowerQuery,
              fuzziness: "AUTO",
            },
          },
        },
        {
          match: {
            District_name: {
              query: lowerQuery,
              operator: "and",
            },
          },
        },
        {
          wildcard: {
            outcode: {
              value: `${lowerQuery}*`,
            },
          },
        },
        {
          wildcard: {
            District_name: {
              value: `*${lowerQuery}*`,
            },
          },
        },
      ],
      minimum_should_match: 1,
    },
  };

  try {
    const result = await client.search({
      index: "demo.csv",
      body: {
        query: esQueryForOutcodeDistrictAndName,
      },
    });

    // Categorize hits based on the specific criteria matched
    let categorizedResults = {
      outcode: [],
      district_code: [],
      District_name: [],
    };

    result.hits.hits.forEach((hit) => {
      // Lowercasing values for comparison to ensure case insensitivity
      if (
        "outcode" in hit._source &&
        hit._source.outcode.toLowerCase().includes(lowerQuery)
      ) {
        categorizedResults.outcode.push(hit._source);
      }
      if (
        "district_code" in hit._source &&
        hit._source.district_code.toLowerCase().includes(lowerQuery)
      ) {
        categorizedResults.district_code.push(hit._source);
      }
      if (
        "District_name" in hit._source &&
        hit._source.District_name.toLowerCase().includes(lowerQuery)
      ) {
        categorizedResults.District_name.push(hit._source);
      }
    });

    return categorizedResults;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
};

export const getNeighbourhoodData = async (outcode) => {
  try {
    const result = await client.search({
      index: "demo.csv",
      body: {
        query: {
          match: {
            outcode: outcode,
          },
        },
      },
    });

    return result.hits.hits;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
};

export const searchRankingData = async (query) => {
  const esQueryForPostCodeAndLocations = {
    bool: {
      should: [
        {
          match_phrase_prefix: {
            county_name: {
              query: query, // For postcode prefix matches
              max_expansions: 10, // Increase max expansions for better coverage
            },
          },
        },
        {
          match: {
            county_name: {
              query: query, // Fallback match query to handle exact matches
              fuzziness: "AUTO", // Enable fuzziness for more flexible matching
            },
          },
        },
        {
          wildcard: {
            county_name: {
              value: `${query.toLowerCase()}*`, // Using wildcard query for flexible matches
            },
          },
        },
      ],
    },
  };

  try {
    const result = await client.search({
      index: "demo.csv",
      body: {
        query: esQueryForPostCodeAndLocations,
      },
    });

    // Remove duplicates based on `county_name`
    const uniqueResults = result.hits.hits
      .map((hit) => hit._source)
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.county_name === value.county_name)
      );

    return uniqueResults;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
};


export const searchByCountyAndSortByPriceToIncomeKeyword = async (
  countyName,
  dataCount
) => {
  try {
    const result = await client.search({
      index: "demo.csv",
      body: {
        query: {
          // term:{
          //   "countyName" : countyName,
          // }
          match: {
            "county_name.keyword": countyName,
          },
        },
        sort: [
          { "Price to Income.keyword": { order: "asc" } }, // Sorting by 'Price to Income.keyword' in ascending order
        ],
        size: dataCount, 
      },
    });

    // Filter to remove duplicates by 'District_name' and limit to top 10
    const uniqueResults = result.hits.hits
      .map((hit) => hit._source)
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.District_name === value.District_name)
      )
      .slice(0, 10);

    return uniqueResults;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
};
