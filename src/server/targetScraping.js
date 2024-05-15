import fetch from "node-fetch";

const urlList ={women:'https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5xtd3&channel=WEB&count=24&default_purchasability_filter=true&include_dmc_dmr=true&new_search=false&offset=0&page=%2Fc%2F5xtd3&platform=desktop&pricing_store_id=1839&scheduled_delivery_store_id=1839&spellcheck=true&store_ids=1839%2C1232%2C1255%2C2213%2C2127&useragent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F124.0.0.0+Safari%2F537.36&visitor_id=018F632F72400201AD6D65C050ADD5DF&zip=01003',
men:'https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=18y1l&channel=WEB&count=24&default_purchasability_filter=true&include_dmc_dmr=true&new_search=false&offset=24&page=%2Fc%2F18y1l&platform=desktop&pricing_store_id=1839&scheduled_delivery_store_id=1839&spellcheck=true&store_ids=1839%2C1232%2C1255%2C2213%2C2127&useragent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F124.0.0.0+Safari%2F537.36&visitor_id=018F632F72400201AD6D65C050ADD5DF&zip=01003',
plus:'https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5ouvj&channel=WEB&count=24&default_purchasability_filter=true&include_dmc_dmr=true&new_search=false&offset=24&page=%2Fc%2F5ouvj&platform=desktop&pricing_store_id=1839&scheduled_delivery_store_id=1839&spellcheck=true&store_ids=1839%2C1232%2C1255%2C2213%2C2127&useragent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F124.0.0.0+Safari%2F537.36&visitor_id=018F632F72400201AD6D65C050ADD5DF&zip=01003',
kid:'https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=xcoz4&channel=WEB&count=24&default_purchasability_filter=true&include_dmc_dmr=true&new_search=false&offset=48&page=%2Fc%2Fxcoz4&platform=desktop&pricing_store_id=1839&scheduled_delivery_store_id=1839&spellcheck=true&store_ids=1839%2C1232%2C1255%2C2213%2C2127&useragent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F124.0.0.0+Safari%2F537.36&visitor_id=018F632F72400201AD6D65C050ADD5DF&zip=01003'}


export async function scrapeTarget(search, filter = 'all') {
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
        
            const data1 = await response.json();
             
            //console.log(data1.data.search.products[0]);
            // Initialize an array to store product data
            let data = data1.data.search
            // Check if products exist in the response data
            if (data.products) {
                // Extract data for the products
                for (const product of data.products) {
                    // Check if product name contains the search string
                    if (product.item.product_description.title.toLowerCase().includes(search.toLowerCase())) {
                        // Extract product details
                        const resultProd =  product.item;
                        
                        //  product details
                        const imageUrl = resultProd.enrichment.images.primary_image_url;
                        
                        const price = product.price.current_retail; 
                        const title = resultProd.product_description.title; 
                        const productURL = resultProd.enrichment.buy_url;
     
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
  

//scrapeTarget('shirt');
// //Example usage
// fetchProductData()
//    .then(products => {
//        //console.log(products);

//     })
//     .catch(error => {
//        console.error(error.message);
//     });
