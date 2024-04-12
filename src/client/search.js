let sort_button = document.getElementById("sort-button");
let sort_button_direction = false;

sort_button.addEventListener("click", function () {
  if (sort_button_direction) {
    this.value = "Sort by Price: ↑";
  } else {
    this.value = "Sort by Price: ↓";
  }
  sort_button_direction = !sort_button_direction;
});
