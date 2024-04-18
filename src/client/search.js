let sort_button = document.getElementById("sort-button");
let sort_button_direction = false;

let search_box = document.getElementById("search-box");

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
 * Nothing implimented yet
 */
search_box.addEventListener("keyup", function (key) {
  if (key.key === "Enter") {
    console.log("Enter");
  }
});
