import client from "../elastic.js";

export const marketComparision = async (query) => {
  try {
    const result = await client.search({
      index: "property_listings",
      body: {
        query: {
          query_string: {
            query: query,
            fields: [
              "analyticsTaxonomy.countyAreaName",
              "analyticsTaxonomy.outcode",
              "analyticsTaxonomy.location_townOrCity",
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

export const getSchoolsByUprn = async (uprn) => {
  try {
    const result = await client.search({
      index: "school_new",
      body: {
        query: {
          bool: {
            must: [{ match: { URN: uprn } }],
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
    const result = await client.search({
      index: "price_paid_new",
      body: {
        size: 1000,
        query: {
          term: {
            "town": city,
          },
        },
      },
    });
    const hits = result?.hits.hits;
    return hits;
    
  } catch (error) {
    console.log(error);
    
  }

}