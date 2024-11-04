import client from "../elastic.js";
import { differenceInDays } from "date-fns";
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
                ref_postcode: {
                  query: searchValue,
                  slop: 1,
                },
              },
            },
            {
              wildcard: {
                "ref_postcode.keyword": {
                  value: `*${searchValue.replace(/\s+/g, "")}*`,
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

export const getSearchListingData = async (
  searchValue,
  type,
  filters = {},
  currentPage = 1,
  pageSize = 20
) => {
  try {
    const { minPrice, maxPrice, bedrooms, bathrooms, houseType, daysOnMarket } = filters;
    const from = (currentPage - 1) * pageSize;

    const mustFilters = [];

    // Price Filter
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

    // Bedroom Filter
    if (bedrooms !== "any") {
      mustFilters.push({
        term: {
          "analyticsTaxonomy.numBeds": bedrooms,
        },
      });
    }

    // Bathroom Filter
    if (bathrooms !== "any") {
      mustFilters.push({
        term: {
          "analyticsTaxonomy.numBaths": bathrooms,
        },
      });
    }

    // Property Type Filter
    if (houseType && houseType.length && houseType !== "any") {
      const validHouseTypes = ["flat", "detached", "semi_detached", "terraced"]; // Convert UI labels to data format
      const houseTypeFilters = houseType
        .filter(type => validHouseTypes.includes(type.toLowerCase())) // Only allow specific types
        .map(type => type.toLowerCase()); // Convert to lowercase to match data

      if (houseTypeFilters.length > 0) {
        mustFilters.push({
          terms: {
            "adTargeting.propertyType.keyword": houseTypeFilters,
          },
        });
      }
    }
    if (daysOnMarket && daysOnMarket !== "any") {
      console.log("daysOnMarket", daysOnMarket);
    
      // Calculate the date `daysOnMarket` months ago
      const dateFrom = new Date();
      dateFrom.setMonth(dateFrom.getMonth() - daysOnMarket);
    
      // Format the date to "YYYY-MM" to match the start of the month in the stored format
      const yearMonthFormatted = dateFrom.toISOString().slice(0, 7);
      console.log("yearMonthFormatted", yearMonthFormatted);
    
      // Use a regexp query to match dates starting with "YYYY-MM"
      mustFilters.push({
        regexp: {
          "publishedOn": `${yearMonthFormatted}.*` // Matches any date with the format "YYYY-MM"
        }
      });
    }
    
    
    

    // Determine the field to search based on the type
    const searchField =
      type === "town"
        ? "location.townOrCity.keyword"
        : type === "county"
        ? "analyticsTaxonomy.countyAreaName.keyword"
        : [
            "analyticsTaxonomy.outcode.keyword",
            "ref_postcode.keyword",
            "analyticsTaxonomy.incode.keyword",
            "analyticsTaxonomy.countyAreaName.keyword",
            "location.townOrCity.keyword",
          ];

    const query = {
      from,
      size: pageSize,
      query: {
        bool: {
          should: Array.isArray(searchField)
            ? searchField.map(field => ({
                wildcard: {
                  [field]: {
                    value: `*${searchValue}*`,
                    case_insensitive: true,
                  },
                },
              }))
            : [
                {
                  wildcard: {
                    [searchField]: {
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
          should: Array.isArray(searchField)
            ? searchField.map(field => ({
                wildcard: {
                  [field]: {
                    value: `*${searchValue}*`,
                    case_insensitive: true,
                  },
                },
              }))
            : [
                {
                  wildcard: {
                    [searchField]: {
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

    const response = await client.search({ index: "listings_new1", body: query });
    const countResponse = await client.count({
      index: "listings_new1",
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

export const housePriceSearch = async (searchValue, size = 10) => {
  try {
    const addressQuery = {
      size,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                "full_address.keyword": {
                  value: `*${searchValue}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
        },
      },
    };

    const [ukSearchAddressResponse] = await Promise.all([
      client.search({ index: "housing_prices", body: addressQuery }),
    ]);

    const results = {
      housPricesAddress: ukSearchAddressResponse.hits.hits,
    };

    return results;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw new Error("Failed to search data from Elasticsearch");
  }
};




export const getListingByMultipleListingIds = async (propertyIds) => {
  try {
    const result = await client.search({
      index: "listings",
      body: {
        query: {
          terms: {
            "listingId.keyword": propertyIds,
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw new Error("Failed to search data from Elasticsearch");
  }
};