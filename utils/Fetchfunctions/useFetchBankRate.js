const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching website:', error);
      return null;
    }
}
  
export async function useFetchBankRate(url, classname) {
    const html = await scrapeWebsite(url);
    
    if (!html) {
      console.error('Failed to fetch website content');
      return null;
    }
    
    const $ = cheerio.load(html);
    
    // Find all elements with the specified classname
    const elementsWithClassname = $(`.${classname}`);
    
    // Extract content from each element
    const extractedContent = elementsWithClassname.map((index, element) => {
      return $(element).text().trim();
    }).get();
    
    return extractedContent;
}
