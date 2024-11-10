import client from "@/lib/elastic";

export const getPartnershipData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts002-legal-partnership",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};


export const getHouseTensorData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts054-household-tenure",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getHouseOccupationData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts063-occupation",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getEthnicData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts021-ethnic-group",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }

};


export const getPopulationData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts008-sex",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getPopulationDatabyAge = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts007a-age",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};
export const getEducationData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts067-education",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};


export const getEconmicActivityData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts066-economic-activity",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getCompositionData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts003-household-composition",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};



export const getEthnicGroupData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts021-ethnic-group",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getAccommodationData = async (postcode) => {
  try {
    const response = await client.search({
      index: "postcode-census-ts044-accomodation-type",
      body: {
        query: {
          term: {
            "Postcode.keyword": postcode,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};