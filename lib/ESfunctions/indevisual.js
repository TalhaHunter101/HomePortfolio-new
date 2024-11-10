import client from "../elastic.js";

export const marketComparision = async (query) => {
  try {
    const result = await client.search({
      index: "listings",
      size: 1000,
      body: {
        query: {
          query_string: {
            query: query,
            fields: [
              "analyticsTaxonomy.countyAreaName",
              "analyticsTaxonomy.outcode",
              "analyticsTaxonomy.postTownName",
            ],
          },
        },
      },
    });
    const hits = result?.hits.hits;
    return hits;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
  }
};

export const getSchoolsByUprn = async (postcode) => {
  try {
    // Extract the prefix before the space (e.g., "BR6" from "BR6 6LF")
    const prefix = postcode.split(" ")[0];

    const result = await client.search({
      index: "school_new",
      body: {
        size: 10000,
        query: {
          query_string: {
            default_field: "Postcode",
            query: `${prefix}*`,
          },
        },
      },
    });
    const hits = result?.hits.hits;
    return hits;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
  }
};

export const getHomedataByYears = async (uprn) => {
  try {
    const result = await client.search({
      index: "housing_prices",
      body: {
        size: 10,
        query: {
          term: {
            "uprn.keyword": uprn,
          },
        },
      },
    });


    const hits = result?.hits.hits;
    return hits;
  } catch (error) {
    console.error("Elasticsearch search error:", error);
  }
};

export const getSoldPropertyData = async (postcode) => {
  try {
    const result = await client.search({
      index: "solds_property",
      body: {
        size: 10,
        query: {
          term: {
            "post_code.keyword": postcode,
          },
        },
      },
    });
    const hits = result?.hits.hits;
    return hits;
  } catch (error) {
    console.log(error);
  }
};

export const getallCityData = async (city) => {
  try {
    const result = await client.search({
      index: "listings",
      body: {
        size: 1000,
        query: {
          term: {
            "location.townOrCity.keyword": city,
          },
        },
      },
    });
    const hits = result?.hits.hits;
    return hits;
  } catch (error) {
    console.log(error);
  }
};

export const getPricePaidData = async (city) => {
  try {
    const uppercaseCity = city.toUpperCase();

    const result = await client.search({
      index: "price_paid_new",
      body: {
        size: 1000,
        query: {
          term: {
            "town.keyword": uppercaseCity,
          },
        },
      },
    });

    const hits = result?.hits?.hits;
    return hits;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getHousHoldData = async (city) => {
  try {
  } catch (error) {}
};

export const getHouseDataByUprn = async (uprn) => {
  if (!uprn) {
    console.warn("UPRN is null or undefined, skipping search");
    return null;
  }

  try {
    const result = await client.search({
      index: "housing_prices",
      body: {
        query: {
          term: {
            "uprn.keyword": uprn,
          },
        },
      },
    });

    const hits = result?.hits?.hits;
    if (hits && hits.length > 0) {
      return hits[0]._source;
    } else {
      console.warn("No results found for the given UPRN");
      return null;
    }
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    return null;
  }
};

export const getHouseDataAddress = async (query) => {
  try {
    const result = await client.search({
      index: "housing_prices",
      body: {
        query: {
          match_phrase_prefix: {
            full_address: query,
          },
        },
      },
    });

    const addresses = result?.hits?.hits;

    return addresses;
  } catch (error) {
    console.error("Error fetching house data:", error);
    return [];
  }
};

export const getPlanningApplicationDataByUprn = async (postcode) => {
  try {
    // Extract the outcode (first part of the postcode)
    const outcode = postcode.split(" ")[0];

    const result = await client.search({
      index: "planning_applications",
      body: {
        size: 1000,
        query: {
          wildcard: {
            "postcode.keyword": `${outcode}*`, 
          },
        },
      },
    });
    const hits = result?.hits?.hits;
    return hits;
  } catch (error) {
    console.log(error);
  }
};

export const getCrimeData = async (postcode) => {
  try {
    const postcoderesult = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            "﻿Postcode.keyword": postcode,
          },
        },
      },
    });
    const lsoa21 = postcoderesult?.hits?.hits[0]?._source?.["LSOA Code"];

    const result = await client.search({
      index: "crime_new",
      body: {
        size: 1000,
        query: {
          term: {
            "LSOA code.keyword": lsoa21,
          },
        },
      },
    });

    const hits = result?.hits?.hits;

    return hits;
  } catch (error) {
    console.log(error);
  }
};

export const getWalkScoreData = async (postcode) => {
  try {
    const result = await client.search({
      index: "walkscore",
      body: {
        query: {
          term: {
            "ref_postcode.keyword": postcode,
          },
        },
      },
    });
    const hits = result?.hits?.hits;
    return hits;
  } catch (error) {
    console.log(error);
  }
};

export const getEvChargingStationsbyTowns = async (town) => {
  try {
    const result = await client.search({
      index: "ev_charge_points",
      size: 1000,
      body: {
        query: {
          term: {
            "town.keyword": town,
          },
        },
      },
    });

    const hits = result?.hits?.hits;
    const totalCount = result?.hits?.total?.value;
    return { hits, totalCount };
  } catch (error) {
    console.log(error);
  }
};

export const getEpcData = async (uprn) => {
  try {
    const result = await client.search({
      index: "epc_certificates",
      body: {
        size: 1,
        query: {
          term: {
            "UPRN.keyword": uprn,
          },
        },
      },
    });
    const epcData = result?.hits?.hits;

    const lmkkey = epcData[0]?._source?.LMK_KEY;

    const response = await client.search({
      index: "epc_recommendations",
      body: {
        query: {
          bool: {
            must: [{ match: { LMK_KEY: lmkkey } }],
          },
        },
        size: 1000,
      },
    });

    const recommendationsData = response?.hits?.hits;

    return { epcData, recommendationsData };
  } catch (error) {
    console.log(error);
  }
};

export const getNearbyListings = async (postcode) => {
  try {
    const result = await client.search({
      index: "listings",
      body: {
        size: 1000,
        query: {
          term: {
            "ref_postcode.keyword": postcode,
          },
        },
      },
    });
    const hits = result?.hits.hits;
    return hits;
  } catch (error) {
    console.log(error);
  }
};

export const getSoldHouseUsingPostcode = async (postcode) => {
  try {
    const result = await client.search({
      index: "housing_prices",
      body: {
        size: 1000,
        query: {
          term: {
            "ref_postcode.keyword": postcode,
          },
        },
      },
    });

    const hits = result?.hits.hits;
    const totalCount = result?.hits.total?.value;
    return { hits, totalCount };
  } catch (error) {
    console.error("Elasticsearch search error:", error);
  }
};

export const getPriceTrackingData = async (postcode) => {
  try {
    const result = await client.search({
      index: "price_paid_new",
      size: "1000",
      body: {
        query: {
          term: {
            "postcode.keyword": postcode,
          },
        },
      },
    });
    const hits = result?.hits;
    return hits;
  } catch (error) {
    console.log(error);
  }
};
