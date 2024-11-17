import client from "../../elastic.js";

export const getAllProperData = async (propertyId) => {
  try {
    // Initialize response object
    const response = {
      propertyDetails: null,
      demographicData: null,
      walkScoreData: null,
      schoolData: null,
      busData: null,
      evChargingData: null,
      rentValuationData: null,
      pricePaidData: null,
      epcData: null,
      planninApplicationsData: null,
      crimeData: null,
      airqualityData: null,
    };

    let propertDetails;
    try {
      const result = await client.search({
        index: "listings_new1",
        body: {
          query: {
            term: {
              "listingId.keyword": propertyId,
            },
          },
        },
      });
      propertDetails = result?.hits?.hits[0]?._source || null;
    } catch (error) {
      console.error("Error fetching property details:", error.message);
    }
    response.propertyDetails = propertDetails;

    if (!propertDetails) {
      throw new Error("Property details not found.");
    }

    const postcode = propertDetails.ref_postcode;
    const latitude = parseFloat(propertDetails.location?.coordinates?.latitude);
    const longitude = parseFloat(
      propertDetails.location?.coordinates?.longitude
    );
    const uprn = propertDetails.location?.uprn;

    const [
      demographicDataResult,
      walkScoreDataResult,
      schoolDataResult,
      busDataResult,
      evChargingDataResult,
      pricePaidDataResult,
      planningApplicationsDataResult,
      crimeDataResult,
      airQualityDataResult,
    ] = await Promise.all([
      (async () => {
        try {
          const result = await client.search({
            index: "demographics.csv",
            body: {
              query: {
                term: {
                  "Postcode.keyword": postcode,
                },
              },
            },
          });
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching demographic data:", error.message);
          return [];
        }
      })(),

      // Fetch walk score data
      (async () => {
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
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching walk score data:", error.message);
          return [];
        }
      })(),

      // Fetch school data
      (async () => {
        try {
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
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching school data:", error.message);
          return [];
        }
      })(),

      // Fetch bus data
      (async () => {
        try {
          const getBusData = await fetch(
            `https://bustimes.org/vehicles.json?ymax=${latitude + 0.2}&xmax=${
              longitude + 0.2
            }&ymin=${latitude - 0.2}&xmin=${longitude - 0.2}`
          );
          if (getBusData.ok) {
            return await getBusData.json();
          }
        } catch (error) {
          console.error("Error fetching bus data:", error.message);
        }
        return [];
      })(),

      // Fetch EV charging locations
      (async () => {
        try {
          const result = await client.search({
            index: "ev_charging_locations",
            body: {
              query: {
                term: {
                  "postal_code.keyword": postcode,
                },
              },
            },
          });
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching EV charging data:", error.message);
          return [];
        }
      })(),

      // Fetch price paid data
      (async () => {
        try {
          const result = await client.search({
            index: "price_paid",
            body: {
              query: {
                term: {
                  "postcode.keyword": postcode,
                },
              },
            },
          });
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching price paid data:", error.message);
          return [];
        }
      })(),

      // Fetch Planning applications data
      (async () => {
        try {
          const outcode = postcode.split(" ")[0];
          const result = await client.search({
            index: "planning_applications",
            size: 1000,
            body: {
              query: {
                wildcard: {
                  "postcode.keyword": `${outcode}*`,
                },
              },
            },
          });
          return result?.hits?.hits || [];
        } catch (error) {
          console.error(
            "Error fetching planning applications data:",
            error.message
          );
          return [];
        }
      })(),

      // Fetch crime data
      (async () => {
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
              query: {
                term: {
                  "LSOA code.keyword": lsoa21,
                },
              },
            },
          });
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching crime data:", error.message);
          return [];
        }
      })(),

      // Fetch air quality data
      (async () => {
        try {
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=c6edfc199a2855bf23667e94fc691e70`
          );
          const data = await response.json();
          return data?.list?.[0];
        } catch (error) {
          console.error("Error fetching air quality data:", error.message);
          return null;
        }
      })(),
    ]);

    const [RentValuationDataResult, EpcDataResult] = await Promise.all([
      (async () => {
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
          return result?.hits?.hits || [];
        } catch (error) {
          console.error("Error fetching rent valuation data:", error.message);
          return [];
        }
      })(async () => {
        try {
          const result = await client.search({
            index: "epc_certificates",
            body: {
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

          const data = [epcData, recommendationsData];

          return data || [];
        } catch (error) {
          console.error("Error fetching EPC data:", error.message);
          return [];
        }
      }),
    ]);

    response.demographicData = demographicDataResult;
    response.walkScoreData = walkScoreDataResult;
    response.schoolData = schoolDataResult;
    response.busData = busDataResult;
    response.evChargingData = evChargingDataResult;
    response.pricePaidData = pricePaidDataResult;
    response.rentValuationData = RentValuationDataResult;
    response.epcData = EpcDataResult;
    response.planninApplicationsData = planningApplicationsDataResult;
    response.crimeData = crimeDataResult;
    response.airqualityData = airQualityDataResult;

    return response;
  } catch (error) {
    console.error(`Critical error in getAllProperData: ${error.message}`);
    throw new Error("Failed to fetch complete property data.");
  }
};
