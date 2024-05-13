import express from "express";
import logger from "morgan";
import * as db from "./db.js";
import { scrapeNorthFace } from "./northface.js";

const headerFields = { "Content-Type": "text/html" };

const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Tells server to look at files in client
app.use(express.static("src/client"));

const searchQuery = async (response, searchText) => {
  try {
    //go through different functions
    //This returns the search values
    const northfaceResults = scrapeNorthFace();
    //console.log(northfaceResults);
    return northfaceResults;
  } catch (error) {
    response.writeHead(404, headerFields);
    response.write(`<h1>Search of "${searchText}" failed</h1>`);
    response.end();
  }
};
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
    searchQuery(response, options.searchText);
  })
  .all(MethodNotAllowedHandler);

//starts server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});