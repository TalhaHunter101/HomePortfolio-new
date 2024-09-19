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
    const [
      ukSearchResponse,
      ukSearchCountyResponse,
      ukSearchAddressResponse,
      ukSearchRegionNameResponse,
    ] = await Promise.all([
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
              field: "countyAreaName.keyword",
            },
          },
        },
      },
    });

    const uniqueValues = result.aggregations.unique_values.buckets.map(
      (bucket) => bucket.key
    );

    return uniqueValues;
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error(
      "Failed to fetch unique county area names from Elasticsearch"
    );
  }
};

export const searchAndFilterListingsProperty = async (
  searchValue,
  filters = {},
  size = 10
) => {
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

export const searchListingByFullAddress = async (fullAddress) => {
  try {
    const response = await client.search({
      index: "solds_property", // Change the index to 'solds_property'
      body: {
        size: 10, // Limit the number of results to 10
        query: {
          bool: {
            should: [
              {
                match: {
                  fullAddress: {
                    query: fullAddress,
                    operator: "and",
                  },
                },
              },
              {
                fuzzy: {
                  fullAddress: {
                    value: fullAddress,
                    fuzziness: "AUTO",
                  },
                },
              },
              {
                wildcard: {
                  fullAddress: `*${fullAddress}*`,
                },
              },
              {
                prefix: {
                  fullAddress: {
                    value: fullAddress,
                  },
                },
              },
            ],
            minimum_should_match: 1,
          },
        },
        sort: [
          {
            _score: {
              order: "desc",
            },
          },
        ],
      },
    });

    // Returning the hits from the response
    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error("Error searching for full address:", error);
    throw error;
  }
};


export const searchHomePageData = async (query) => {
  try {
    // Step 1: Initial Search on 'uprn_data'
    const baseQuery = {
      bool: {
        should: [
          { wildcard: { "POST_TOWN.keyword": { value: `*${query}*`, case_insensitive: true } } },
          { wildcard: { "THOROUGHFARE.keyword": { value: `*${query}*`, case_insensitive: true } } },
          { wildcard: { "POSTCODE.keyword": { value: `*${query}*`, case_insensitive: true } } },
          { wildcard: { "SUB_BUILDING_NAME.keyword": { value: `*${query}*`, case_insensitive: true } } },
          { wildcard: { "BUILDING_NAME.keyword": { value: `*${query}*`, case_insensitive: true } } },
          { wildcard: { "BUILDING_NUMBER.keyword": { value: `*${query}*`, case_insensitive: true } } },
        ],
      },
    };

    const initialResult = await client.search({
      index: 'uprn_data',
      body: { query: baseQuery },
      size: 100, // Adjust size as needed
    });

    const groupedResults = {
      posttown: [],
      thoroughfare: [],
      postcode: [],
      address: [],
    };

    const uprnSet = new Set(); // To collect unique UPRNs

    initialResult.hits.hits.forEach(hit => {
      const source = hit._source;

      // Categorize the results based on the matched field
      if (source.POST_TOWN.toLowerCase().includes(query.toLowerCase())) {
        groupedResults.posttown.push(source);
      }
      if (source.THOROUGHFARE.toLowerCase().includes(query.toLowerCase())) {
        groupedResults.thoroughfare.push(source);
      }
      if (source.POSTCODE.toLowerCase().includes(query.toLowerCase())) {
        groupedResults.postcode.push(source);
      }
      if (
        source.SUB_BUILDING_NAME.toLowerCase().includes(query.toLowerCase()) ||
        source.BUILDING_NAME.toLowerCase().includes(query.toLowerCase()) ||
        source.BUILDING_NUMBER.toString().toLowerCase().includes(query.toLowerCase()) ||
        source.THOROUGHFARE.toLowerCase().includes(query.toLowerCase())
      ) {
        groupedResults.address.push(source);
      }

      uprnSet.add(source.UPRN);
    });

    // Limit each category to the top 5 results
    for (const key in groupedResults) {
      groupedResults[key] = groupedResults[key].slice(0, 5);
    }

    // Remove empty arrays from the response
    Object.keys(groupedResults).forEach(key => {
      if (groupedResults[key].length === 0) {
        delete groupedResults[key];
      }
    });

    // If no results, return early
    if (uprnSet.size === 0) {
      return groupedResults;
    }

    const uprnArray = Array.from(uprnSet);
    

    // Step 2: Batch Query 'listings' Index
    const listingsResponse = await client.search({
      index: 'listings',
      body: {
        query: {
          terms: { 'location.uprn': uprnArray },
        },
        _source: ['location.uprn', 'listingId'],
        size: 10000, 
      },
    });

    const uprnToListingId = {};
    listingsResponse.hits.hits.forEach(hit => {
      const source = hit._source;
      uprnToListingId[source.location.uprn] = source.listingId;
    });

    // Step 3: Batch Query 'housing_prices' Index
    const housingPricesResponse = await client.search({
      index: 'housing_prices',
      body: {
        query: {
          terms: { 'uprn': uprnArray },
        },
        _source: ['uprn'],
        size: 10000,
      },
    });

    const uprnInHousingPrices = new Set();
    housingPricesResponse.hits.hits.forEach(hit => {
      const source = hit._source;
      uprnInHousingPrices.add(source.uprn);
    });

    // Step 4: Augment the Initial Results
    const augmentResults = (groupedResults) => {
      for (const category in groupedResults) {
        groupedResults[category] = groupedResults[category].map(item => {
          const uprn = item.UPRN;
          if (uprnToListingId[uprn]) {
            return {
              ...item,
              is_listing: 'yes',
              listingId: uprnToListingId[uprn],
            };
          } else if (uprnInHousingPrices.has(uprn)) {
            return {
              ...item,
              is_listing: 'no',
            };
          } else {
            return item; 
          }
        });
      }
      return groupedResults;
    };

    const finalResults = augmentResults(groupedResults);

    return finalResults;

  } catch (error) {
    console.log("Elasticsearch search error:", error);
    throw new Error("Failed to search data from Elasticsearch");
  }
};


export const searchHomepageDataWithHouse_Prices = async (query) => {
  try {
    // Prepare queries with fuzziness, synonyms, and boosted fields
    const esQueryForAddress = {
      bool: {
        should: [
          {
            multi_match: {
              query: query,
              fields: ['full_address^3', 'street_address^2', 'city', 'postcode'],
              type: 'best_fields',
              fuzziness: 'AUTO',
              operator: 'and'
            }
          },
          {
            match_phrase_prefix: {
              full_address: {
                query: query,
                max_expansions: 10
              }
            }
          }
        ]
      }
    };

    const esQueryForPostCodeAndLocations = {
      bool: {
        should: [
          {
            multi_match: {
              query: query,
              fields: ['ref_postcode^3', 'location.townOrCity^2'],
              type: 'best_fields',
              fuzziness: 'AUTO',
              operator: 'and'
            }
          },
          {
            match_phrase_prefix: {
              'location.townOrCity': {
                query: query,
                max_expansions: 10
              }
            }
          }
        ]
      }
    };

    // Execute searches in parallel
    const [result, result2] = await Promise.all([
      client.search({
        index: 'housing_prices',
        body: {
          size: 100,
          query: esQueryForAddress,
          highlight: {
            fields: {
              'full_address': {},
              'street_address': {}
            }
          }
        }
      }),
      client.search({
        index: 'listings',
        body: {
          size: 0, // We only need aggregations
          query: esQueryForPostCodeAndLocations,
          aggs: {
            unique_postcodes: {
              terms: {
                field: 'ref_postcode.keyword',
                size: 10
              }
            },
            unique_towns: {
              terms: {
                field: 'location.townOrCity.keyword',
                size: 10
              }
            }
          }
        }
      })
    ]);

    // Extract aggregations for intelligent suggestions
    const categorizedResults = {
      postcode: result2.aggregations.unique_postcodes.buckets.map(bucket => bucket.key),
      posttown: result2.aggregations.unique_towns.buckets.map(bucket => bucket.key),
      address: []
    };

    const hits = result?.hits?.hits || [];

    // Collect UPRNs and prepare a Set for quick lookup
    const uprns = hits.map(hit => hit._source.uprn);
    let listingUprnsSet = new Set();

    if (uprns.length > 0) {
      const listingsResult = await client.search({
        index: 'property_listings',
        body: {
          size: uprns.length,
          query: {
            terms: { 'location.uprn': uprns }
          }
        }
      });

      listingUprnsSet = new Set(
        listingsResult.hits.hits.map(hit => hit._source.location.uprn)
      );
    }

    // Process hits and include highlights
    hits.forEach(hit => {
      const source = hit._source;
      source.is_listing = listingUprnsSet.has(source.uprn);
      if (hit.highlight) {
        source.highlight = hit.highlight;
      }
      categorizedResults.address.push(source);
    });

    return categorizedResults;
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error("Failed to fetch data from Elasticsearch");
  }
};



export const fetchParticularListing = async (uprn, size = 1) => {
  try {
    const result = await client.search({
      index: "property_listings",
      body: {
        size,
        query: {
          term: {
            "location.uprn.keyword": uprn,
          },
        },
      },
    });
    
    return result?.hits?.hits;
  } catch (error) {
    console.error("Elasticsearch query error:", error);
    throw new Error("Failed to fetch data from Elasticsearch");
  }
};