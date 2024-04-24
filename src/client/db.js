//import PouchDB from "pouchdb";

const db = new PouchDB("search-data");

export async function printData() {
  let data = await getDocument("20");
  //console.log(data);
  let results = await db.allDocs({ include_docs: true, attachments: true });
  console.log(results.rows);
}

async function getDocument(id) {
  try {
    const doc = await db.get(id);
    console.log(doc);
  } catch (error) {
    console.error(error);
  }
}

async function checkDocExist(id) {
  try {
    await db.get(id);
    return true;
  } catch (error) {
    if (error.name === "not_found") {
      return false;
    } else {
      throw error;
    }
  }
}

/**
 * Asynchronously saves a new product object to the database with the specified parameters
 *
 *
 * @async
 * @param {string} id - The unique identifier for the counter.
 * @param {string} title - The title of the result you want displayed
 * @param {string} content - The description and price of the product
 * @param {string} imagePath - The path to the image to be displayed
 * @param {string} link - The url going to the product listing
 * @returns {Promise<void>} - A promise that resolves when the product is successfully saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function saveProduct(id, title, content, imagePath, link) {
  if (!(await checkDocExist(id))) {
    await db.put({
      _id: id,
      title: title,
      content: content,
      imagePath: imagePath,
      link: link,
    });
  } else {
    console.log("id already exists!");
  }
}

export async function getAllProducts() {
  let results = db.allDocs({ include_docs: true, attachments: true });
  return results;
}

/**
 * Asynchronously modifies an existing counter in the database. The counter
 * document must include an `_id` property that matches the counter's name in
 * the database.
 *
 * @async
 * @param {Object} doc - The counter document to be updated. Must include `_id`
 * and `count` properties.
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully modified.
 * @throws {Error} - Throws an error if the operation fails, e.g., the counter
 * does not exist or database issues.
 */
export async function modifyCounter(doc) {
  await db.put(doc);
}

/**
 * Asynchronously retrieves a counter from the database by its name.
 *
 * @async
 * @param {string} name - The name of the counter to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the counter document.
 * @throws {Error} - Throws an error if the counter cannot be found or if there
 * is a database issue.
 */
export async function loadCounter(name) {
  const counter = await db.get(name);
  return counter;
}

/**
 * Asynchronously removes a counter from the database by its name.
 *
 * @async
 * @param {string} name - The name of the counter to be removed.
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully removed.
 * @throws {Error} - Throws an error if the counter cannot be removed, e.g., it
 * does not exist or due to database issues.
 */
export async function removeCounter(name) {
  db.remove(name);
  db.destroy();
}

/**
 * Asynchronously retrieves all counters from the database.
 *
 * @async
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of
 * counter documents.
 * @throws {Error} - Throws an error if there is a problem accessing the
 * database.
 */
export async function loadAllCounters() {
  const result = await db.allDocs({ include_docs: true });
  return result.rows.map((row) => row.doc);
}
