import client from "../elastic.js";

export const getHouseDataByUprn = async (uprn) => {
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
      const hit = result.hits.hits[0];
      return hit;
    } catch (error) {
      console.error("Elasticsearch search error:", error);
      throw new Error("Failed to search data from Elasticsearch");
    }
  };