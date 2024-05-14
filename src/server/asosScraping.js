import fetch from "node-fetch";

export async function scrapeASOS() {
  try {
    // Fetch data from the asos API endpoint
    const response = await fetch(
      "https://www.asos.com/api/product/search/v2/categories/13489?offset=72&key-search-mvtid=899035-web-new-in-product-type-mods&store=US&lang=en-US&currency=USD&rowlength=2&channel=mobile-web&country=US&keyStoreDataversion=q1av6t0-39&advertisementsPartnerId=100716&advertisementsVisitorId=97d2b7fe-07f8-44aa-8897-6519242eb4de&advertisementsOptInConsent=true&limit=72&region=NH"
    );
    const data = await response.json();

    // Initialize an array to store product data
    const products = [];

    // Check if products exists in the response data
    if (data.products) {
      // Extract data for the first 10 products
      for (let i = 0; i < 10 && i < data.products.length; i++) {
        const product = data.products[i];

        // Extract product details
        const imageUrl = "https://" + product.additionalImageUrls[0];
        const price = product.price.current.value;
        const title = product.name;
        const baseURL = "https://www.asos.com/us";
        const partialUrl = product.url;
        const productUrl = baseURL + partialUrl;
        const siteName = "ASOS";

        // Push product data to the 'products' array
        products.push({ imageUrl, price, title, productUrl, siteName });
      }
    } else {
      throw new Error("Invalid response data format");
    }

    // Return the array of product data
    return products;
  } catch (error) {
    // Throw an error if fetching or processing data fails
    throw new Error("Error fetching product data: " + error.message);
  }
}

// Example usage
// fetchProductData()
//     .then(products => {
//         // Log the products data (for testing purposes)
//        console.log(products);

//         // Perform further processing or display on website
//     })
//     .catch(error => {
//         // Log any errors that occur during the fetching process
//         console.error(error.message);
//     });
