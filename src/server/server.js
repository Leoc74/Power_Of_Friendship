import express from "express";
import logger from "morgan";
import { scrapeNorthFace } from "./northface.js";
import { scrapeAsos } from "./asosScraping.js";
import { scrapeKohls } from "./kohlsScraping.js";
import { scrapeTarget } from "./targetScraping.js";

const headerFields = { "Content-Type": "text/html" };

const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Tells server to look at files in client
app.use(express.static("src/client"));

/**
 * Handles the search query resquested by the user. Sends a response back with the information containing all search results.
 * @param {*} response
 * @param {String} searchText
 * @param {String} filter
 */
async function searchQuery(response, searchText, filter) {
  try {
    //Go through different functions
    //This returns the search values
    const northfaceResults = await scrapeNorthFace(searchText, filter);
    const asosResults = await scrapeAsos(searchText, filter);
    const kohlsResults = await scrapeKohls(searchText, filter);
    const targetResults = await scrapeTarget(searchText, filter);

    const allResults = [
      northfaceResults,
      asosResults,
      kohlsResults,
      targetResults,
    ];
    const allJSON = JSON.stringify(allResults);

    // const northfaceJSON = JSON.stringify(northfaceResults);
    // const asosJSON = JSON.stringify(asosResults);
    // const kohlsJSON = JSON.stringify(kohlsResults);
    // const targetJSON = JSON.stringify(targetResults);

    //console.log(northfaceResults);
    response.writeHead(200, headerFields);
    response.write(allJSON);
    response.end();
  } catch (error) {
    response.writeHead(404, headerFields);
    response.write(`<h1>Search of "${searchText}" failed</h1>`);
    console.log(error);
    response.end();
  }
}
//Used to handle unknown methods
const MethodNotAllowedHandler = async (request, response) => {
  response.status(405).send("Method Not Allowed");
};

//Handles the search bar request
//This sends the search parameter to the backend to execute the search
app
  .route("/search")
  .get(async (request, response) => {
    const options = request.query;
    searchQuery(response, options.searchText, options.filter);
  })
  .all(MethodNotAllowedHandler);

app.route("*").all(async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

//starts server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
