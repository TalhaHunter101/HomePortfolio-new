import client from "../elastic.js";

export const marketComparision = async (query) => {
  try {
    const result = await client.search({
      index: "property_listings",
      size: 100,
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
    const result = await client.search({
      index: "school_new",
      body: {
        size: 10000,
        query: {
          bool: {
            must: [{ match: { Postcode: postcode } }],
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
      index: "solds_property",
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
      index: "property_listings",
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
}




const getHousHoldData = async (city) => {
  try {
    
  } catch (error) {
    
  }

}




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
      index: 'housing_prices',
      body: {
        query: {
          match_phrase_prefix: {
            full_address: query
          }
        }
      }
    });

    const addresses = result?.hits?.hits;

    return addresses;
  } catch (error) {
    console.error('Error fetching house data:', error);
    return [];
  }
};