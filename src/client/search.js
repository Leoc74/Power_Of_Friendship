import * as db from "./db.js";

let sort_button = document.getElementById("sort-button");
let sort_button_direction = false;

let search_box = document.getElementById("search-box");

let results_container = document.getElementById("results-container");

window.addEventListener("load", async () => {
  await db.printData();
  await db.initializeDataBase();
  await db.printData();
});

/**
 * Event Listener for the sort_button. Should sort the outputs by price increasing/decreasing when pressed
 */
sort_button.addEventListener("click", function () {
  if (sort_button_direction) {
    this.value = "Sort by Price: ↑";
  } else {
    this.value = "Sort by Price: ↓";
  }
  sort_button_direction = !sort_button_direction;
});

/**
 * Event Listener for when a user tries to search something in the search bar
 * Currently populates the results container with the inputted number of results when
 * Enter key is pressed
 */
search_box.addEventListener("keyup", async function (event) {
  if (event.key === "Enter") {
    results_container.innerHTML = "";
    let results = await db.getAllProducts();
    console.log(results.rows);
    for (let result of results.rows) {
      let title = result.doc.title;
      let content = result.doc.content;
      let imagePath = result.doc.imagePath;
      let link = result.doc.link;
      let resultElement = document.createElement("div");
      resultElement.classList.add("result");
      resultElement.innerHTML = `
      <a href="${link}" target="_blank">
        <h3>${title}</h3>
      </a>
      <p>Price: </p>
      <p>${content}</p>
      <img src="${imagePath}" alt="Image not Found">`;
      results_container.appendChild(resultElement);
    }
  }
});
