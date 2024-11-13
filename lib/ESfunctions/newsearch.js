import client from "../elastic.js";
import {
  getCountyPolygon,
  getPostcodeAreaPolygon,
  getPostcodeSectorPolygon,
  getPostcodeDistrictPolygon,
  getIntersectingPolygons,
} from "./geospatial";
import cityCoordinates from "../../public/dummydata/city_with_coordinates.json";

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
  pageSize = 20,
  coordinates = null
) => {
  try {
    console.log("Search params:", { searchValue, type, filters });

    // const { minPrice, maxPrice, bedrooms, bathrooms } = filters;
    const { minPrice, maxPrice, bedrooms, bathrooms, houseType, daysOnMarket } =
      filters;
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
      const validHouseTypes = ["flat", "detached", "semi_detached", "terraced"];
      const houseTypeFilters = houseType
        .filter((type) => validHouseTypes.includes(type.toLowerCase())) // Only allow specific types
        .map((type) => type.toLowerCase()); // Convert to lowercase to match data

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
          publishedOn: `${yearMonthFormatted}.*`, // Matches any date with the format "YYYY-MM"
        },
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
            ? searchField.map((field) => ({
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
          filter: mustFilters.length ? mustFilters : undefined,
        },
      },
    };

    const countQuery = {
      query: {
        bool: {
          must: [
            Array.isArray(searchField)
              ? searchField.map((field) => ({
                  wildcard: {
                    [field]: {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                }))
              : {
                  wildcard: {
                    [searchField]: {
                      value: `*${searchValue}*`,
                      case_insensitive: true,
                    },
                  },
                },
            ...mustFilters,
          ],
        },
      },
    };

    console.log("countQuery is", countQuery.query.bool.must[0]);

    // Create mapQuery with size set to total count
    const [countResponse] = await Promise.all([
      client.count({ index: "listings_new1", body: countQuery }),
    ]);

    const response = await client.search({
      index: "listings_new1",
      body: query,
    });
    let totalCount = countResponse.count;
    const results = response.hits.hits;

    // If count is 0 but results exist, set count to results length
    if (totalCount === 0 && results.length > 0) {
      totalCount = results.length;
    }

    // Create mapQuery with the total size
    let mapResults = [];
    if (totalCount > 0) {
      const mapQuery = {
        ...countQuery,
        size: totalCount / 100,
        _source: [
          "listingId",
          "branch",
          "summaryDescription",
          "address",
          "counts",
          "analyticsTaxonomy",
          "propertyImage",
          "ref_postcode",
          "totalFloorArea",
          "fullAddress",
          "location",
          "publishedOn",
        ],
      };

      // Execute mapQuery only if totalCount is greater than 0
      const mapResponse = await client.search({
        index: "listings_new1",
        body: mapQuery,
      });
      mapResults = mapResponse.hits.hits;
    }
    // const results = response.hits.hits;
    // const mapResults = mapResponse.hits.hits;

    let geom = null;
    console.log("Fetching geometry for type:", type);

    if (type === "county") {
      console.log("Fetching county polygon for:", searchValue);
      geom = await getCountyPolygon(searchValue);
    } else if (type === "town") {
      // Use provided coordinates or look up from city coordinates file
      let searchCoordinates = coordinates;
      if (!searchCoordinates) {
        const cityData = cityCoordinates.find(
          (city) => city.City.toLowerCase() === searchValue.toLowerCase()
        );
        if (cityData?.coordinates) {
          searchCoordinates = {
            lng: cityData.coordinates.lon,
            lat: cityData.coordinates.lat,
          };
        }
      }

      if (searchCoordinates) {
        console.log("Using coordinates for town search:", searchCoordinates);
        geom = await getIntersectingPolygons(
          searchCoordinates.lng,
          searchCoordinates.lat
        );
      }
    } else {
      const postcode = searchValue.toUpperCase();
      console.log("Trying to fetch polygon for postcode:", postcode);

      geom = await getPostcodeSectorPolygon(postcode);
      console.log("Sector polygon result:", geom ? "Found" : "Not found");

      if (!geom) {
        geom = await getPostcodeDistrictPolygon(postcode);
        console.log("District polygon result:", geom ? "Found" : "Not found");
      }
      if (!geom) {
        geom = await getPostcodeAreaPolygon(postcode);
        console.log("Area polygon result:", geom ? "Found" : "Not found");
      }
    }

    console.log("Final geometry:", geom);
    console.log("Results count:", results.length);
    console.log("Map results count:", mapResults.length);
    console.log("Total count:", totalCount);

    return {
      results,
      mapResults,
      totalCount,
      geom,
    };
  } catch (error) {
    console.error("Error in getSearchListingData:", error);
    throw error;
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
    // console.log("Listing by Id hits", hit);
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
