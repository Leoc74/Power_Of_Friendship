import fetch from 'node-fetch';

async function scrapeTarget() {
    try {
        // Fetch data from the asos API endpoint
        const response = await fetch('https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=18y1l&channel=WEB&count=24&default_purchasability_filter=true&include_dmc_dmr=true&new_search=false&offset=24&page=%2Fc%2F18y1l&platform=desktop&pricing_store_id=1839&scheduled_delivery_store_id=1839&spellcheck=true&store_ids=1839%2C1232%2C1255%2C2213%2C2127&useragent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F124.0.0.0+Safari%2F537.36&visitor_id=018F632F72400201AD6D65C050ADD5DF&zip=01003');
        const data1 = await response.json();
        const data = data1.data.search;
        console.log(data.products[0].item.enrichment.images.url);
        // Initialize an array to store product data
        const products = [];
        
        // Check if products exists in the response data
        if ( data.products) {
            // Extract data for the first 10 products
            for (let i = 0; i < 10 && i <  data.products.length; i++) {
                //console.log(data.products[0].productTitle);
                const product =  data.products[i].item;

                //  product details
                const imageUrl = NULL;
                const price = data.products[i].price.current_retial; 
                const title = product.product_description.title; 
                const productURL = product.enrichment.buy_url;


                // Push product data to the 'products' array
                products.push({ imageUrl, price, title, productURL });
            }
        } else {
            throw new Error('Invalid response data format');
        }

        // Return the array of product data
        return products;
    } catch (error) {
        // Throw an error if fetching or processing data fails
        throw new Error('Error fetching product data: ' + error.message);
    }
}
scrapeTarget();
// //Example usage
// fetchProductData()
//    .then(products => {
//        //console.log(products);

//     })
//     .catch(error => {
//        console.error(error.message);
//     });
