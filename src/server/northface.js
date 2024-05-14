import fetch from "node-fetch";

export async function scrapeNorthFace() {
  try {
    // Fetch data from the asos API endpoint
    const response = await fetch(
      "https://www.thenorthface.com/api/products/v1/catalog?start=24&count=24&sort=bestMatches&locale=en-us&filters=cgid=359774&fqj=%7B%22cgid%22%3A%22359774%22%7D"
    );
    const data = await response.json();
    //console.log(data.products[0]);
    // Initialize an array to store product data
    const products = [];

    // Check if products exists in the response data
    if (data.products) {
      // Extract data for the first 10 products
      for (let i = 0; i < 10 && i < data.products.length; i++) {
        //console.log(data.products[0].productTitle);
        const product = data.products[i];

        // Extract product details
        const imageUrl = product.images;
        const price = product.price.current;
        const title = product.name;
        const baseURL = "https://www.thenorthface.com";
        const partialUrl = product.slug;
        const productUrl = baseURL + partialUrl;
        const siteName = "The North Face";

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
// //Example usage
// fetchProductData()
//    .then(products => {
//        //console.log(products);

//     })
//     .catch(error => {
//        console.error(error.message);
//     });
