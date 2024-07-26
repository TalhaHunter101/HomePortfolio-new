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
