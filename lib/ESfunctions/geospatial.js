import client from "../elastic";

/**
 * Get polygon data for a postcode area
 * @param {string} postcodeArea - The postcode area (e.g., "SW" from "SW1A 1AA")
 * @returns {Promise<Object>} The polygon data for the postcode area
 */
export const getPostcodeAreaPolygon = async (postcodeArea) => {
  try {
    const result = await client.search({
      index: "postcode_area_polygons",
      body: {
        query: {
          query_string: {
            default_field: "name",
            query: postcodeArea.toUpperCase(),
          },
        },
      },
    });

    if (result.hits.total.value === 0) {
      return null;
    }

    return result.hits.hits[0]._source;
  } catch (error) {
    console.error("Error fetching postcode area polygon:", error);
    throw new Error("Failed to fetch postcode area polygon data");
  }
};

/**
 * Get polygon data for a postcode sector
 * @param {string} postcodeSector - The postcode sector (e.g., "SW1A 1" from "SW1A 1AA")
 * @returns {Promise<Object>} The polygon data for the postcode sector
 */
export const getPostcodeSectorPolygon = async (postcodeSector) => {
  try {
    const result = await client.search({
      index: "postcode_sector_polygons",
      body: {
        query: {
          query_string: {
            default_field: "name",
            query: postcodeSector.toUpperCase(),
          },
        },
      },
    });

    if (result.hits.total.value === 0) {
      return null;
    }

    return result.hits.hits[0]._source;
  } catch (error) {
    console.error("Error fetching postcode sector polygon:", error);
    throw new Error("Failed to fetch postcode sector polygon data");
  }
};

/**
 * Get polygon data for a postcode district
 * @param {string} postcodeDistrict - The postcode district (e.g., "SW1A" from "SW1A 1AA")
 * @returns {Promise<Object>} The polygon data for the postcode district
 */
export const getPostcodeDistrictPolygon = async (postcodeDistrict) => {
  try {
    const result = await client.search({
      index: "postcode_district_polygons",
      body: {
        query: {
          query_string: {
            default_field: "name",
            query: postcodeDistrict.toUpperCase(),
          },
        },
      },
    });

    if (result.hits.total.value === 0) {
      return null;
    }

    return result.hits.hits[0]._source;
  } catch (error) {
    console.error("Error fetching postcode district polygon:", error);
    throw new Error("Failed to fetch postcode district polygon data");
  }
};

/**
 * Get polygon data for a county
 * @param {string} countyName - The name of the county
 * @returns {Promise<Object>} The polygon data for the county
 */
export const getCountyPolygon = async (countyName) => {
  try {
    console.log("Searching for county polygon:", countyName);

    const result = await client.search({
      index: "postcode_county_polygons",
      body: {
        query: {
          query_string: {
            default_field: "name",
            query: `${countyName}`,
          },
        },
      },
    });

    console.log("County search result:", {
      total: result.hits.total.value,
      hits: result.hits.hits.map((hit) => hit._source.name),
    });

    if (result.hits.total.value === 0) {
      console.log("No county polygon found for:", countyName);
      return null;
    }

    const polygon = result.hits.hits[0]._source;
    console.log("Found county polygon for:", polygon.name);

    return polygon;
  } catch (error) {
    console.error("Error fetching county polygon:", error);
    throw new Error("Failed to fetch county polygon data");
  }
};

/**
 * Get all polygons that intersect with a given point
 * @param {number} lon - Longitude of the point
 * @param {number} lat - Latitude of the point
 * @returns {Promise<Object>} Object containing all intersecting polygons
 */
export const getIntersectingPolygons = async (lon, lat) => {
  if (!lon || !lat) {
    console.error("Invalid coordinates provided:", { lon, lat });
    return null;
  }

  try {
    const result = await client.search({
      index: "postcode_area_polygons",
      body: {
        query: {
          bool: {
            must: {
              match_all: {},
            },
            filter: {
              geo_shape: {
                polygon: {
                  shape: {
                    type: "point",
                    coordinates: [parseFloat(lon), parseFloat(lat)],
                  },
                  relation: "intersects",
                },
              },
            },
          },
        },
      },
    });

    if (result.hits.total.value === 0) {
      console.log("No intersecting polygons found for coordinates:", {
        lon,
        lat,
      });
      return null;
    }
    console.log("Found intersecting polygons:", result.hits.hits[0]._source);

    return result.hits.hits[0]._source;
  } catch (error) {
    console.error("Error fetching intersecting polygons:", error);
    return null;
  }
};
