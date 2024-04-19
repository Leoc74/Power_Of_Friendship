//import PouchDB from "pouchdb";

const db = new PouchDB("search-data");

//db.put({ _id: "2", title: "Header (1)" });

export async function printData() {
  console.log(db);
  let data = await db.get("0");
  console.log(data);
  let results = await db.allDocs({ include_docs: true, attachments: true });
  console.log(results.rows);
}
