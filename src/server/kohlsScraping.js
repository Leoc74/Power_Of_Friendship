import fetch from "node-fetch";

export async function scrapeKohls() {
  try {
    // Fetch data from the asos API endpoint
    const response = await fetch(
      "https://www.kohls.com/catalog/mens-clothing.jsp?CN=Gender:Mens+Department:Clothing&cc=mens-TN1.0-S-men&kls_sbp=90330586387737637469065939933071974599&PPP=48&WS=48&S=1&sks=true&spa=1&ajax=true&gNav=false"
    );
    const data = await response.json();
    console.log(data);

    // Initialize an array to store product data
    const products = [];

    // Check if products exists in the response data
    if (data.products) {
      // Extract data for the first 10 products
      for (let i = 0; i < 10 && i < data.products.length; i++) {
        //console.log(data.products[0].productTitle);
        const product = data.products[i];

        // Extract product details
        const imageUrl = product.image.url;
        const price = product.pricing.yourPriceInfo.yourPrice;
        const title = product.productTitle;
        const baseURL = "https://www.kohls.com/";
        const partialUrl = product.seoURL;
        const productUrl = baseURL + partialUrl;
        const siteName = "Kohl's";

        // Push product data to the 'products' array
        products.push({ imageUrl, price, title, productUrl, siteName });
      }
    } else {
      throw new Error("Invalid response data format");
    }

    // Return the array of product data
    console.log(products);
    return products;
  } catch (error) {
    // Throw an error if fetching or processing data fails
    throw new Error("Error fetching product data: " + error.message);
  }
}

// Example usage
//fetchProductData()
// .then(products => {
// Log the products data (for testing purposes)
//console.log(products);

// Perform further processing or display on website
//})
//.catch(error => {
// Log any errors that occur during the fetching process
// console.error(error.message);
//});
