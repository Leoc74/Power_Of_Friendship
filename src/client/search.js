import * as db from "./db.js";
//import { scrapeNorthFace } from "../server/northface.js";

let sort_button = document.getElementById("sort-button");
let sort_button_increasing = true;

let search_box = document.getElementById("search-box");

let results_container = document.getElementById("results-container");

const URL = "http://127.0.0.1:3000"; // URL of our server

window.addEventListener("load", async () => {
  //await db.printData();
  await db.initializeDataBase();
});

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
    console.log(event);
    //DUMMY DATA:
    //let results = await db.getAllProducts();
    let searchText = search_box.value;
    //TODO Doesn't work yet
    let results = await fetch(`${URL}/search?searchText=${searchText}`, {
      method: "GET",
    });
    //console.log(await results.json());
    loadSearchResults(results, sort_button_increasing);
  }
});

/**
 * Adds the results to the DOM on the Search Page in order according to Price
 * @param {Object} results The parsed results from the web scraping
 * @param {boolean} price_increasing Specifies true for prices in acsending order, false for descending order
 */
function loadSearchResults(results, price_increasing) {
  results.rows.sort((a, b) => {
    let x = parseFloat(a.doc.price.substring(1)); // Change to not use substring for real data
    let y = parseFloat(b.doc.price.substring(1));
    return price_increasing ? x - y : y - x;
  });
  for (let result of results.rows) {
    let title = result.doc.title;
    let price = result.doc.price;
    let content = result.doc.content;
    let imagePath = result.doc.imagePath;
    let link = result.doc.link;
    /*
    let title = result.title;
    let price = result.price;
    let content = not implimented yet;
    let imagePath = result.imageUrl;
    let link = result.productUrl;
    */
    let resultElement = document.createElement("div");
    resultElement.classList.add("result");
    resultElement.innerHTML = `
    <a href="${link}" target="_blank">
      <h3>${title}</h3>
    </a>
    <p class="price">Price: ${price}</p>
    <p>${content}</p>
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
    let e1 = parseFloat(a.children[1].innerText.substring(8)); //TODO change to 7 since $ is not in price anymore
    let e2 = parseFloat(b.children[1].innerText.substring(8));
    return price_increasing ? e1 - e2 : e2 - e1;
  });
  results_container.innerHTML = "";
  for (let res of results) {
    results_container.appendChild(res);
  }
}
