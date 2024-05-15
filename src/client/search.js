import * as db from "./db.js";

let sort_button = document.getElementById("sort-button");
let sort_button_increasing = true;

let search_box = document.getElementById("search-box");

let results_container = document.getElementById("results-container");

let womenFilter = document.getElementById("womenFilter");
let menFilter = document.getElementById("menFilter");
let kidFilter = document.getElementById("kidFilter");
let plusFilter = document.getElementById("plusFilter");

const URL = "http://127.0.0.1:3000"; // URL of our server

/**
 * Loads the dummy data
 * NOT Implimented anymore
 */
// window.addEventListener("load", async () => {
//   //await db.printData();
//   await db.initializeDataBase();
// });

/**
 * Event Listener for the sort_button. Should sort the outputs by price increasing/decreasing when pressed
 */
sort_button.addEventListener("click", function () {
  if (!sort_button_increasing) {
    this.value = "Sort by Price: ↑";
  } else {
    this.value = "Sort by Price: ↓";
  }
  sort_button_increasing = !sort_button_increasing;
  sortElements(sort_button_increasing);
});

/**
 * Event Listener for when a user tries to search something in the search bar
 * Currently populates the results container with the inputted number of results when
 * Enter key is pressed
 */
search_box.addEventListener("keyup", async function (event) {
  if (event.key === "Enter") {
    results_container.innerHTML = "";
    //console.log(event);
    //DUMMY DATA:
    //let results = await db.getAllProducts();
    let searchText = search_box.value;
    let filter = "";
    if (womenFilter.checked) {
      filter = "women";
    } else if (menFilter.checked) {
      filter = "men";
    } else if (kidFilter.checked) {
      filter = "kid";
    } else if (plusFilter.checked) {
      filter = "plus";
    }
    //TODO CHECK SEARCH IS NOT EMPTY
    let results = await fetch(
      `${URL}/search?searchText=${searchText}&filter=${filter}`,
      {
        method: "GET",
      }
    );
    let products = JSON.parse(await results.text());
    console.log(results);
    console.log(products);
    loadSearchResults(products, sort_button_increasing);
  }
});

/**
 * Adds the results to the DOM on the Search Page in order according to Price
 * @param {Object} results The parsed results from the web scraping
 * @param {boolean} price_increasing Specifies true for prices in acsending order, false for descending order
 */
function loadSearchResults(results, price_increasing) {
  results.sort((a, b) => {
    let x = parseFloat(a.price);
    let y = parseFloat(b.price);
    return price_increasing ? x - y : y - x;
  });
  for (let result of results) {
    // let title = result.doc.title;
    // let price = result.doc.price;
    // let content = result.doc.content;
    // let imagePath = result.doc.imagePath;
    // let link = result.doc.link;
    let title = result.title;
    let price = result.price;
    //let content = "Not implimented yet";
    let imagePath = result.imageUrl;
    let productUrl = result.productUrl;
    let siteName = result.siteName;

    let resultElement = document.createElement("div");
    resultElement.classList.add("result");
    resultElement.innerHTML = `
    <a href="${productUrl}" target="_blank">
      <h3>${title}</h3>
    </a>
    <h4>From: ${siteName}</h4>
    <p class="price">Price: $${price}</p>
    <img src="${imagePath}" alt="Image not Found">`;
    results_container.appendChild(resultElement);
  }
}

/**
 * This function re-orders search results once they have already been populated
 * @param {boolean} price_increasing Specifies the direction the prices should be sorted.
 */
function sortElements(price_increasing) {
  let results = [];
  for (let child of results_container.children) {
    results.push(child);
  }
  results.sort((a, b) => {
    let e1 = parseFloat(a.children[1].innerText.substring(8));
    let e2 = parseFloat(b.children[1].innerText.substring(8));
    return price_increasing ? e1 - e2 : e2 - e1;
  });
  results_container.innerHTML = "";
  for (let res of results) {
    results_container.appendChild(res);
  }
}
