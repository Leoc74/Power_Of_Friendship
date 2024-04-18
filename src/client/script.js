//EXAMPLES!!
document.addEventListener("DOMContentLoaded", () => {
  function navigate(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";
  }

  document
    .getElementById("home")
    .addEventListener("click", () => navigate("homeView"));
  document
    .getElementById("profile")
    .addEventListener("click", () => navigate("profileView"));
  document
    .getElementById("about")
    .addEventListener("click", () => navigate("aboutView"));

  // Initialize with the home view
  navigate("homeView");

  //If we press enter in the search bar navigate to the search page (and do a search later)
  //For now we just go to profileView, will be changed once we have a searchView
  const homeSearchBar = document.getElementById("homeSearchBar");
  homeSearchBar.addEventListener("keypress", (event)=>{
    //console.log FOR DEBUGGING
    //console.log("MADE IT"); 
    if(event.key === "Enter"){
      navigate("profileView");
    }
  })

  // Assuming your images are within a container with the class
  // 'image-container'
  document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("click", function () {
      const parent = this.parentNode;
      parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
    });
  });
});
