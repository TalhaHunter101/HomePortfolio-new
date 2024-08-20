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
