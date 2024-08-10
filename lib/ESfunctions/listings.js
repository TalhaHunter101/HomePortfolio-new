import client from "../elastic.js";

export const fetchListingsProperty = async (size = 10) => {
  try {
    const result = await client.search({
      index: "listings_property",
      body: {
        size,
        query: {
          match_all: {},
        },
      },
    });
    return result.hits.hits;
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error("Failed to fetch data from Elasticsearch");
  }
};


export const searchListingsProperty = async (searchValue, size = 10) => {
  try {
    const ukQuery = {
      size,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "outcode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "post_code.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "incode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
        },
      },
    };

    const countyQuery = {
      size,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "countyAreaName.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
        },
      },
    };

    const addressQuery = {
      size,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "address.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
        },
      },
    };
    
    const regionNameQuery = {
      size,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "regionName.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
        },
      },
    };
    const [ukSearchResponse, ukSearchCountyResponse, ukSearchAddressResponse, ukSearchRegionNameResponse] =
      await Promise.all([
        client.search({ index: "listings_property", body: ukQuery }),
        client.search({ index: "listings_property", body: countyQuery }),
        client.search({ index: "listings_property", body: addressQuery }),
        client.search({ index: "listings_property", body: regionNameQuery }),
      ]);

    const results = {
      uk: ukSearchResponse.hits.hits,
      county: ukSearchCountyResponse.hits.hits,
      address: ukSearchAddressResponse.hits.hits,
      regionName: ukSearchRegionNameResponse.hits.hits,
    };

    return results;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw new Error("Failed to search data from Elasticsearch");
  }
};



export const fetchUniqueCountyAreaNames = async () => {
  try {
    const result = await client.search({
      index: "listings_property",
      body: {
        size: 0, 
        aggs: {
          unique_values: {
            terms: {
              field: "countyAreaName.keyword"
            }
          }
        }
      }
    });

    const uniqueValues = result.aggregations.unique_values.buckets.map(bucket => bucket.key);
    
    return uniqueValues;
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error("Failed to fetch unique county area names from Elasticsearch");
  }
};


export const searchAndFilterListingsProperty = async (searchValue, filters = {}, size = 10) => {
  try {
    const baseQuery = {
      bool: {
        must: [
          {
            bool: {
              should: [
                {
                  wildcard: {
                    "outcode.keyword": {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                },
                {
                  wildcard: {
                    "post_code.keyword": {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                },
                {
                  wildcard: {
                    "incode.keyword": {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                },
                {
                  wildcard: {
                    "countyAreaName.keyword": {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                },
                {
                  wildcard: {
                    "address.keyword": {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    if (filters.bedrooms) {
      baseQuery.bool.must.push({
        match: {
          bedrooms: filters.bedrooms,
        },
      });
    }

    if (filters.bathrooms) {
      baseQuery.bool.must.push({
        match: {
          bathrooms: filters.bathrooms,
        },
      });
    }

    if (filters.price) {
      baseQuery.bool.must.push({
        range: {
          pricing_value: {
            gte: filters.price.min,
            lte: filters.price.max,
          },
        },
      });
    }

    if (filters.propertyType) {
      baseQuery.bool.must.push({
        match: {
          propertyType: filters.propertyType,
        },
      });
    }

    // Perform the search
    const searchResponse = await client.search({
      index: "listings_property",
      body: {
        size,
        query: baseQuery,
      },
    });

    return searchResponse.hits.hits;
  } catch (error) {
    console.error("Elasticsearch search and filter error:", error);
    throw new Error("Failed to search and filter data from Elasticsearch");
  }
};




export const searchListingByPostcode = async (postcode) => {
  try {
    const response = await client.search({
      index: 'uk_postcodes', 
      body: {
        query: {
          fuzzy: {
            Postcode: {
              value: postcode,
              fuzziness: "AUTO" // Automatically determine the appropriate fuzziness
              
            }
          }
        }
      }
    });

    // Returning the hits from the response
    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error('Error searching for postcode:', error);
    throw error;
  }
};