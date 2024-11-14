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
      const validHouseTypes = ["flat", "detached", "semi_detached", "terraced"];
      const houseTypeFilters = houseType
        .filter((type) => validHouseTypes.includes(type.toLowerCase()))
        .map((type) => type.toLowerCase());

      if (houseTypeFilters.length > 0) {
        mustFilters.push({
          terms: {
            "adTargeting.propertyType.keyword": houseTypeFilters,
          },
        });
      }
    }

    if (daysOnMarket && daysOnMarket !== "any") {
      const dateFrom = new Date();
      dateFrom.setMonth(dateFrom.getMonth() - daysOnMarket);
      const yearMonthFormatted = dateFrom.toISOString().slice(0, 7);

      mustFilters.push({
        regexp: {
          publishedOn: `${yearMonthFormatted}.*`,
        },
      });
    }

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

    const [countResponse, response] = await Promise.all([
      client.count({ index: "listings_new1", body: countQuery }),
      client.search({ index: "listings_new1", body: query }),
    ]);

    let totalCount = countResponse.count;
    const results = response.hits.hits;

    if (totalCount === 0 && results.length > 0) {
      totalCount = results.length;
    }

    // Prepare mapQuery
    let mapResults = [];
    const mapQuery = {
      ...countQuery,
      size: totalCount/100,
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

    if (totalCount > 0) {
      // Execute mapQuery and handle response
      const mapResponse = await client.search({
        index: "listings_new1",
        body: mapQuery,
      });

      mapResults = mapResponse.hits.hits;

      // Fallback if mapResults is empty
      if (mapResults.length === 0 && results.length > 0) {
        console.log("Fallback to results for mapResults.");
        mapResults = results;
      }
    } else {
      // Fallback if count is 0 but results exist
      console.log("Using results directly for mapResults as fallback.");
      mapResults = results;
    }

    let geom = null;

    if (type === "county") {
      geom = await getCountyPolygon(searchValue);
    } else if (type === "town") {
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
        geom = await getIntersectingPolygons(
          searchCoordinates.lng,
          searchCoordinates.lat
        );
      }
    } else {
      const postcode = searchValue.toUpperCase();

      geom = await getPostcodeSectorPolygon(postcode);

      if (!geom) {
        geom = await getPostcodeDistrictPolygon(postcode);
      }
      if (!geom) {
        geom = await getPostcodeAreaPolygon(postcode);
      }
    }

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
