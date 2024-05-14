import fetch from "node-fetch";

const urlList = {
    women: 'https://www.asos.com/api/product/search/v2/categories/16661?offset=144&key-search-mvtid=899035-web-new-in-product-type-mods&store=US&lang=en-US&currency=USD&rowlength=2&channel=mobile-web&country=US&keyStoreDataversion=q1av6t0-39&advertisementsPartnerId=100716&advertisementsVisitorId=97d2b7fe-07f8-44aa-8897-6519242eb4de&advertisementsOptInConsent=true&limit=72&region=MA',
    plus: 'https://www.asos.com/api/product/search/v2/categories/9577?offset=72&key-search-mvtid=899035-web-new-in-product-type-mods&store=US&lang=en-US&currency=USD&rowlength=2&channel=mobile-web&country=US&keyStoreDataversion=q1av6t0-39&advertisementsPartnerId=100716&advertisementsVisitorId=97d2b7fe-07f8-44aa-8897-6519242eb4de&advertisementsOptInConsent=true&limit=72&region=NC',
    men: null,
    kid: null
};

export async function scrapeAsos(search, filter = 'all') {
    try {
        let urls;
        if (filter === 'all' || !urlList.hasOwnProperty(filter) || urlList[filter] === null) {
            // If filter is 'all', not found in the urlList, or null, use all links except null values
            urls = Object.values(urlList).filter(val => val !== null);
        } else {
            // If filter exists in the urlList and not null, use only that link
            urls = [urlList[filter]];
        }
      const products1 = [];
        // Loop through each URL
       for (const url of urls) {
        // Fetch data from the asos API endpoint
        const response = await fetch(url);
        const data = await response.json();

        // Initialize an array to store product data
        
        // Check if products exist in the response data
        if (data.products) {
            // Extract data for the products
            for (const product of data.products) {
                // Check if product name contains the search string
                if (product.name.toLowerCase().includes(search.toLowerCase())) {
                    // Extract product details
                    const imageUrl = product.imageUrl;
                    const price = product.price.current.value; 
                    const title = product.name; 
                    const baseURL = 'https://www.asos.com/us';
                    const partialUrl = product.url;
                    const productURL = baseURL + partialUrl;

                    // Push product data to the 'products' array
                    products1.push({ imageUrl, price, title, productURL });
                }
            }
        } else {
            return [];
        }
       }
        // Return the array of product data
        return products1;
    } catch (error) {
        // Throw an error if fetching or processing data fails
        throw new Error('Error fetching product data: ' + error.message);
    }
}

