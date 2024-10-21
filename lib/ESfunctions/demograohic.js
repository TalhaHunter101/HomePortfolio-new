import client from "../elastic.js";

export const getPeopleGenderData = async (postcode) => {
  try {
    // First, query the 'england_postcodes' index to get the 'LSOA Code'
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }
    let averageIncome = response1.hits.hits[0]._source["Average Income"];

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts002-legal-partnership",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    let data = {
      averageIncome,
      ...response2.hits.hits[0],
    }


    return {
      averageIncome,
      ...response2.hits.hits[0],
    }
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getHouseTypeData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts044-accommodation-type",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getHouseTensorData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts054-tenure",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getHouseOccupationData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts063-occupation",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getTotalPoultationData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "postcode-census-ts008-sex",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getPopulationDatabyAge = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts007a-age",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getEducationData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts067-level-of-qualification",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};



export const getEconmicActivityData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts066-economic-activity",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};

export const getCompositionData = async (postcode) => {
  try {
    const postcodeField = "\uFEFFPostcode.keyword";
    const response1 = await client.search({
      index: "england_postcodes",
      body: {
        query: {
          term: {
            [postcodeField]: postcode,
          },
        },
      },
    });

    if (response1.hits.total.value === 0) {
      throw new Error(`No data found for postcode: ${postcode}`);
    }

    const lsoaCode = response1.hits.hits[0]._source["Census output area"];

    const response2 = await client.search({
      index: "census-ts003-household-composition",
      body: {
        query: {
          term: {
            "geography code.keyword": lsoaCode,
          },
        },
      },
    });

    return response2.hits.hits[0];
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
};


