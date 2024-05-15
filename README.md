# Power_Of_Friendship
# Price Comparison Website

## Milestone 3 (Final)
src/client contains all the html, specifically in client/index.html. The other html files were to test code and provide mock ups within other files. All pages can be navigated to using the nav bar. 

It also contains the javascript files which interact with the frontend directly. 
  - script.js
  - login.js
  - search.js

handle the javascript needs of the home, login, and search pages respectively. They will make fetch requests to the backend server, which routes these requests, and returns the expected data.

src/server contains the backend javascript files. This is the server in index.js, the different files for scraping the web, and the files for login and authentication.
Note: The file server.js was for testing purposes only. It is no longer used, but was for testing the searching independently from the login functionality.

The scraping files
  - asosScraping.js
  - kohlsScraping.js
  - northface.js
  - targetScraping.js
all export functions which are used in index.js to pull search data from those websites. index.js communicates these results to the frontend search.js and they get displayed.

To run:
  - npm install
    - Installs packages and dependencies
  - npm run start
    - Launches the server
  - Navigate to localhost:3000


## Milestone 2

in /client/
  every page has its own html file for easier coding, and prevents merge conflicts.
  all pages are accessible from one another, but index.html is the default home page when users navigate to Prix.
  index.html is the home page of the website
  login.html is the login page of the website
  search.html is the search results page of the website

  Navigate to these different pages by using the Nav bar from the Home Page.

  Description of files:
- db.js: Handles the data mocking
- index.html: Handles the html for all pages. The other files were placeholder versions. All the up to date html resides in this file
- script.js: Handles the interactivity with the home page and nav bar
- styles.css: Handles the styling of the home page and nav bar

- login.css: Handles the styling of the login page
- login.js: Handles the interactivity with the login page

- search.js: Handles the interactivity with the search page
- search.css: Handles the styling of the search page

- about.js: Handles the interactivity with the about page
- about.css: Handles the styling of the about page

to run page:
npm run milestone-02


