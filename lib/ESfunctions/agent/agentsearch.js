import client from "../../elastic.js";

export const searchAgentWithPostcode = async (postcode) => {
  try {
    // Normalize the postcode by removing spaces and converting it to uppercase
    const normalizedPostcode = postcode.replace(/\s+/g, "").toUpperCase();

    // Define the search query
    const response = await client.search({
      index: "agents",
      body: {
        query: {
          regexp: {
            ref_postcode: {
              value: `.*${normalizedPostcode.split("").join(".*")}.*`, // Inserts '.*' between characters for flexible matching
              case_insensitive: true,
            },
          },
        },
      },
    });

    // Use a Set to filter out duplicate postcodes
    const uniqueResults = new Set();
    const filteredHits = response.hits.hits.filter((hit) => {
      const formattedPostcode = hit._source.ref_postcode
        .replace(/\s+/g, "")
        .toUpperCase();
      if (!uniqueResults.has(formattedPostcode)) {
        uniqueResults.add(formattedPostcode);
        return true;
      }
      return false;
    });

    return filteredHits.map((hit) => hit._source); // Return unique results only
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
};

export const getSearchAgentSearch = async (postcode) => {
  try {
    // Define the search query for the exact postcode match
    const response = await client.search({
      index: "agents",
      size: 100,
      body: {
        query: {
          match: {
            ref_postcode: postcode,
          },
        },
      },
    });

    // Initialize variables to calculate the averages
    let totalAskingPrice = 0;
    let totalWeeksOnMarket = 0;
    let totalAvailableListings = 0;
    let count = 0;

    // Extract data and calculate totals for the specified fields
    const data = response.hits.hits.map((hit) => {
      const { residential } = hit._source.listingsStatistics || {};
      const forSale = residential ? residential.forSale : null;

      // Check if forSale data exists and accumulate values
      if (forSale) {
        totalAskingPrice += parseFloat(forSale.avgAskingPrice || 0);
        totalWeeksOnMarket += parseFloat(forSale.avgWeeksOnMarket || 0);
        totalAvailableListings += parseInt(forSale.availableListings || 0, 10);
        count++;
      }
      return hit._source;
    });

    // Calculate averages
    const statistics =
      count > 0
        ? {
            avgAskingPrice: totalAskingPrice / count,
            avgWeeksOnMarket: totalWeeksOnMarket / count,
            availableListings: totalAvailableListings / count,
            count, // Total count of matching records
          }
        : {
            avgAskingPrice: 0,
            avgWeeksOnMarket: 0,
            availableListings: 0,
            count: 0,
          };

    // Structure the final response
    return {
      statistics,
      data,
    };
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    throw error;
  }
};


export const getAgentDataById = async (agent_id) => {
    try {
      // Define the search query
      const response = await client.search({
        index: "agents",
        body: {
          query: {
            match: {
              agent_id: agent_id
            }
          }
        }
      });
  
      if (response.hits.hits.length === 0) {
        return { message: "No data found for this agent_id" };
      }
  
      // Extract the agent data
      const agentData = response.hits.hits[0]._source;
  
      // Initialize statistics
      const listingsByBedrooms = {};
      const listingsByPostcode = {};
      const listingsByMonth = {};
  
      // Process residential sale listings
      if (agentData.listings && agentData.listings.residentialSale.length > 0) {
        agentData.listings.residentialSale.forEach(listing => {
          // Count by number of bedrooms
          const bedrooms = listing.amenities?.bedrooms || "Unknown";
          listingsByBedrooms[bedrooms] = (listingsByBedrooms[bedrooms] || 0) + 1;
  
          // Count by postcode
          const postcode = listing.displayAddress.split(" ").slice(-1)[0];
          listingsByPostcode[postcode] = (listingsByPostcode[postcode] || 0) + 1;
  
          // Count by listing month
          const listingDate = new Date(listing.firstListedDate);
          const monthYear = listingDate.toLocaleString("default", { month: "short", year: "numeric" });
          listingsByMonth[monthYear] = (listingsByMonth[monthYear] || 0) + 1;
        });
      }
  
      // Structure the final response
      return {
        statistics: {
          listingsByBedrooms,
          listingsByPostcode,
          listingsByMonth
        },
        agentData
      };
  
    } catch (error) {
      console.error("Elasticsearch search error:", error);
      throw error;
    }
  }

// export const getAgentDataById = async (agent_id) => {
//     try {
//       // Define the search query to retrieve up to 1000 results (you may increase this as needed)
//       const response = await client.search({
//         index: "agents",
//         size: 100,
//         body: {
//           query: {
//             match: {
//               agent_id: agent_id
//             }
//           }
//         }
//       });
  
//       if (response.hits.hits.length === 0) {
//         return { message: "No data found for this agent_id" };
//       }
  
//       // Initialize statistics
//       const listingsByBedrooms = {};
//       const listingsByPostcode = {};
//       const listingsByMonth = {};
  
//       // Process all matching agents' listings
//       response.hits.hits.forEach(hit => {
//         const agentData = hit._source;
  
//         if (agentData.listings && agentData.listings.residentialSale.length > 0) {
//           agentData.listings.residentialSale.forEach(listing => {
//             // Count by number of bedrooms
//             const bedrooms = listing.amenities?.bedrooms || "Unknown";
//             listingsByBedrooms[bedrooms] = (listingsByBedrooms[bedrooms] || 0) + 1;
  
//             // Count by postcode
//             const postcode = listing.displayAddress.split(" ").slice(-1)[0];
//             listingsByPostcode[postcode] = (listingsByPostcode[postcode] || 0) + 1;
  
//             // Count by listing month
//             const listingDate = new Date(listing.firstListedDate);
//             const monthYear = listingDate.toLocaleString("default", { month: "short", year: "numeric" });
//             listingsByMonth[monthYear] = (listingsByMonth[monthYear] || 0) + 1;
//           });
//         }
//       });
  
//       // Structure the final response
//       return {
//         statistics: {
//           listingsByBedrooms,
//           listingsByPostcode,
//           listingsByMonth
//         },
//         agentsData: response.hits.hits.map(hit => hit._source) // Include all agent data
//       };
  
//     } catch (error) {
//       console.error("Elasticsearch search error:", error);
//       throw error;
//     }
//   };