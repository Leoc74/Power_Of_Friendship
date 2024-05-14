import fetch from 'node-fetch';   
const urlList = {women:'https://www.kohls.com/catalog/womens-clothing.jsp?CN=Gender:Womens+Department:Clothing&cc=wms-TN2.0-S-womensclothing&kls_sbp=90330586387737637469065939933071974599&PPP=48&WS=48&S=1&sks=true&spa=1&ajax=true&gNav=false',
                    men:'https://www.kohls.com/catalog/mens-clothing.jsp?CN=Gender:Mens+Department:Clothing&cc=mens-TN1.0-S-men&kls_sbp=90330586387737637469065939933071974599&PPP=48&WS=48&S=1&sks=true&spa=1&ajax=true&gNav=false',
                    plus:null,
                    kid:'https://www.kohls.com/catalog/kids-clothing.jsp?CN=AgeAppropriate:Kids+Department:Clothing&cc=kids-TN2.0-S-kidsshopall&kls_sbp=90330586387737637469065939933071974599&PPP=48&WS=48&S=1&sks=true&spa=1&ajax=true&gNav=false'}

export async function scrapeKhols(search, filter = 'all') {
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
        const response = await fetch(urlList.men);
        const data = await response.json();
        //console.log(data.products[0]);
        // Initialize an array to store product data
        
        // Check if products exist in the response data
        if (data.products) {
            // Extract data for the products
            for (const product of data.products) {
                // Check if product name contains the search string
                if (product.productTitle.toLowerCase().includes(search.toLowerCase())) {
                    // Extract product details
                    const imageUrl = product.image.url;
                    let price = null;
                    if (product.pricing.salePrice != null){
                        price = product.pricing.salePrice;}
                    else {
                        price = product.pricing.regularPrice;}
                    const title = product.productTitle; 
                    const baseURL = 'https://www.kohls.com';
                    const partialUrl = product.seoURL;
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
             


