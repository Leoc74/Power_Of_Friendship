import fetch from "node-fetch";
const urlList = {women:'https://www.thenorthface.com/api/products/v1/catalog?start=0&count=24&sort=&locale=en-us&filters=,cgid=women&fqj=%7B%22cgid%22%3A%22829796%22%7D',
men:'https://www.thenorthface.com/api/products/v1/catalog?start=0&count=24&sort=&locale=en-us&filters=,cgid=mens&fqj=%7B%22cgid%22%3A%22829795%22%7D',
plus:null,
kid:'https://www.thenorthface.com/api/products/v1/catalog?start=0&count=25&sort=&locale=en-us&filters=,cgid=kids&fqj=%7B%22cgid%22%3A%22829797%22%7D'}

export async function scrapeNorthFace(search, filter = 'all') {
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
      
      console.log(data.products[0]);
      // Check if products exist in the response data
      if (data.products) {
          // Extract data for the products
          for (const product of data.products) {
              // Check if product name contains the search string
              if (product.name.toLowerCase().includes(search.toLowerCase())) {
                  // Extract product details
                  const imageUrl = product.images;
                  const price = product.price.current; 
                  const title = product.name; 
                  const baseURL = 'https://www.thenorthface.com';
                  const partialUrl = product.slug;
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

//scrapeNorthFace('shirt')
// //Example usage
// fetchProductData()
//    .then(products => {
//        //console.log(products);

//     })
//     .catch(error => {
//        console.error(error.message);
//     });
