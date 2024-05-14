import { getCurrentView, updateCurrentView } from "./db.js";

document.addEventListener("DOMContentLoaded", async () => {
  async function navigate(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";
    //Updating the PouchDB to store last viewed page
    let currView = await getCurrentView();
    currView.view = viewId;
    updateCurrentView(currView);
  }

  //Filters for filter dropdown on search screen.
  const womenFilter = document.getElementById("womenFilter");
  const menFilter = document.getElementById("menFilter");
  const kidFilter = document.getElementById("kidFilter");
  const plusFilter = document.getElementById("plusFilter");
  const filters = [womenFilter, menFilter, kidFilter, plusFilter];
  document
    .getElementById("home")
    .addEventListener("click", () => navigate("homeView"));
  document
    .getElementById("profile")
    .addEventListener("click", () => navigate("profileView"));
  document
    .getElementById("about")
    .addEventListener("click", () => navigate("aboutView"));
  document.getElementById("shop").addEventListener("click", () => {
    //resets the filters to empty/unselected
    for (let f of filters) {
      f.checked = false;
    }
    navigate("search-view");
  });

  let classNames = ["woman", "man", "kid", "plus"];
  for (let c of classNames) {
    sendToSearchPage(c);
  }

  // Initialize with the previous view the user was on
  let currView = await getCurrentView();
  if (currView.view === "") {
    navigate("homeView");
  } else {
    navigate(currView.view);
  }

  function sendToSearchPage(className) {
    let classCollection = document.getElementsByClassName(className);
    for (let c of classCollection) {
      c.addEventListener("click", function () {
        //closure so className is specific
        for (let f of filters) {
          f.checked = false;
        }
        if (className === "woman") {
          womenFilter.checked = true;
        } else if (className === "man") {
          menFilter.checked = true;
        } else if (className === "kid") {
          kidFilter.checked = true;
        } else if (className === "plus") {
          plusFilter.checked = true;
        }
        navigate("search-view");
      });
    }
  }

  //For Image Carousel: Currently not implimented

  // Assuming your images are within a container with the class
  // 'image-container'
  /*
  document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("click", function () {
      const parent = this.parentNode;
      parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
    });
  });
});

//JavaScript for home page image carousel
const carouselSlide = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
const prevArrow = document.querySelector(".prevArrow");
const nextArrow = document.querySelector(".nextArrow");

let counter = 0;
const size = images[0].clientWidth;

carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

nextArrow.addEventListener("click", () => {
  console.log(counter);
  if (counter >= images.length - 1) {
    counter = 0;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    carouselSlide.style.transform = "translateX(" + size * counter + "px)";
  } else {
    counter++;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

prevArrow.addEventListener("click", () => {
  if (counter <= 0) {
    counter = images.length - 1;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  } else {
    counter--;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }*/
});
