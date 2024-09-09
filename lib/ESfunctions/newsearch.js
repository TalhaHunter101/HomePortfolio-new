import client from "../elastic.js";

export const searchListingsProperty = async (searchValue, size = 10) => {
  try {
    const ukQuery = {
      size,
      query: {
        bool: {
          should: [
            // Improved postcode search
            {
              match_phrase_prefix: {
                "ref_postcode": {
                  query: searchValue,
                  slop: 1
                }
              }
            },
            {
              wildcard: {
                "ref_postcode.keyword": {
                  value: `*${searchValue.replace(/\s+/g, '')}*`,
                  case_insensitive: true,
                },
              },
            },
            // Existing outcode and incode searches
            {
              wildcard: {
                "analyticsTaxonomy.outcode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "analyticsTaxonomy.incode.keyword": {
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
                "analyticsTaxonomy.countyAreaName.keyword": {
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
                "analyticsTaxonomy.displayAddress.keyword": {
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
                "analyticsTaxonomy.regionName.keyword": {
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
      client.search({ index: "listings", body: ukQuery }),
      client.search({ index: "listings", body: countyQuery }),
      client.search({ index: "listings", body: addressQuery }),
      client.search({ index: "listings", body: regionNameQuery }),
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

export const getSearchListingData = async (searchValue, filters = {}, size = 50) => {
  try {
    const { minPrice, maxPrice, bedrooms, bathrooms } = filters;
    

    const mustFilters = [];

    if (minPrice !== "any" || maxPrice !== "any") {
      mustFilters.push({
        range: {
          "analyticsTaxonomy.price": {
            gte: minPrice !== "any" ? minPrice : 0, 
            lte: maxPrice !== "any" ? maxPrice : Number.MAX_SAFE_INTEGER, 
          },
        },
      });
    }

    if (bedrooms !== "any") {
      mustFilters.push({
        term: {
          "analyticsTaxonomy.numBeds": bedrooms, 
        },
      });
    }

    if (bathrooms !== "any") {
      mustFilters.push({
        term: {
          "analyticsTaxonomy.numBaths": bathrooms, 
        },
      });
    }

    const query = {
      size,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "analyticsTaxonomy.outcode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "ref_postcode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "analyticsTaxonomy.incode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "analyticsTaxonomy.countyAreaName.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
          filter: mustFilters.length ? mustFilters : undefined, // Only add filters if there are any
        },
      },
    };

    const countQuery = {
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "analyticsTaxonomy.outcode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "ref_postcode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "analyticsTaxonomy.incode.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                "analyticsTaxonomy.countyAreaName.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
          filter: mustFilters.length ? mustFilters : undefined, // Only add filters if there are any
        },
      },
    };

    const response = await client.search({ index: "listings", body: query });
    const countResponse = await client.count({
      index: "listings",
      body: countQuery,
    });

    const results = response.hits.hits;
    const totalCount = countResponse.count;

    return { results, totalCount };
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw new Error("Failed to search data from Elasticsearch");
  }
};



export const getListingByListingId = async (listingId) => {
  try {
    const result = await client.search({
      index: "listings",
      body: {
        query: {
          term: {
            "listingId.keyword": listingId,
          },
        },
      },
    });
    const hit = result.hits.hits[0];
    return hit;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw new Error("Failed to search data from Elasticsearch");
  }
};
