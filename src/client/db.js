//import PouchDB from "pouchdb";

const db = new PouchDB("search-data");

export async function printData() {
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
 * @param {string} price - The price of the product
 * @param {string} content - The description of the product
 * @param {string} imagePath - The path to the image to be displayed
 * @param {string} link - The url going to the product listing
 * @returns {Promise<void>} - A promise that resolves when the product is successfully saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function saveProduct(id, title, price, content, imagePath, link) {
  if (!(await checkDocExist(id))) {
    await db.put({
      _id: id,
      title: title,
      price: price,
      content: content,
      imagePath: imagePath,
      link: link,
    });
  } else {
    //console.log("id already exists!");
  }
}

export async function getAllProducts() {
  let results = db.allDocs({ include_docs: true, attachments: true });
  return results;
}

export async function initializeDataBase() {
  saveProduct(
    "0",
    "Mens Floral Tuxedo Jacket Paisley Shawl Lapel",
    "$55.75",
    "The fashionable dinner jacket is made of high-quality durable light weight fabric, giving you unique texture and comfortable wearing experience, finished by excellent stitching.",
    "https://m.media-amazon.com/images/I/81JxtqK6IuL._AC_SY550_.jpg",
    "https://www.amazon.com/COOFANDY-Paisley-Wedding-X-Large-01-Wine/dp/B08HX2LBGS/ref=sr_1_24?crid=1VHXBZ9D0ENHM&dib=eyJ2IjoiMSJ9.W2U978cgzsCi4l3BFZ6zWo0oUlbTk5h0wifKLW0CPc8FlpL2lblK8hayLdeTk1hyNZEgBtb6MWfL3KHJzMs5AFHrxtXyVpP4hCLb2Wlcsq2B8YOUiZwgYfA9opgt3RZRgtekqxaDddmgPm2tRLKpMaLboZGdrH898bKpZnv-vXygwsF8z2kOtjIjlgLYBTFZlWXN4hufKG3so-tv3OOVsa2Tn4D1J0hyDri2MtZFy1jqoogrfO80bhWQBCZMh2a1_ZVa80qh8tpfCbVZqoTIikeI6PTmB80esWwT_9dSTPA.RocF3E0VtKDtepFDZ2beXE1Ql0xyugtBieji5zodjzA&dib_tag=se&keywords=suit&qid=1714009748&sprefix=suit%2Caps%2C228&sr=8-24"
  );
  saveProduct(
    "1",
    "Men's Suits Classic Fit 2 Piece - 2 Button Jacket",
    "$99.99",
    "P&L men's suits focus on quality for ten years, senior designers use wear resistance and wrinkle resistance shaping better quality fabrics, feel comfortable, handmade for men.",
    "https://m.media-amazon.com/images/I/516RLSxYikL._AC_SY550_.jpg",
    "https://www.amazon.com/Two-Piece-Classic-Office-Button-Pleated/dp/B00PUYE7IM/ref=sr_1_32?crid=1VHXBZ9D0ENHM&dib=eyJ2IjoiMSJ9.W2U978cgzsCi4l3BFZ6zWo0oUlbTk5h0wifKLW0CPc8FlpL2lblK8hayLdeTk1hyNZEgBtb6MWfL3KHJzMs5AFHrxtXyVpP4hCLb2Wlcsq2B8YOUiZwgYfA9opgt3RZRgtekqxaDddmgPm2tRLKpMaLboZGdrH898bKpZnv-vXygwsF8z2kOtjIjlgLYBTFZlWXN4hufKG3so-tv3OOVsa2Tn4D1J0hyDri2MtZFy1jqoogrfO80bhWQBCZMh2a1_ZVa80qh8tpfCbVZqoTIikeI6PTmB80esWwT_9dSTPA.RocF3E0VtKDtepFDZ2beXE1Ql0xyugtBieji5zodjzA&dib_tag=se&keywords=suit&qid=1714009748&sprefix=suit%2Caps%2C228&sr=8-32"
  );
  saveProduct(
    "2",
    "Men's Slim Fit Suit Separates",
    "$49.99-$376.11",
    "The advantage of the Calvin Klein Slim Fit Suit Separate is the ability to customize your jacket and pant size. ",
    "https://m.media-amazon.com/images/I/71Ebmh3i88L._AC_SX466_.jpg",
    "https://www.amazon.com/Calvin-Klein-Stretch-Separate-Blazer/dp/B01M1K5F9M/ref=sr_1_7?crid=1VHXBZ9D0ENHM&dib=eyJ2IjoiMSJ9.W2U978cgzsCi4l3BFZ6zWo0oUlbTk5h0wifKLW0CPc8FlpL2lblK8hayLdeTk1hyNZEgBtb6MWfL3KHJzMs5AFHrxtXyVpP4hCLb2Wlcsq2B8YOUiZwgYfA9opgt3RZRgtekqxaDddmgPm2tRLKpMaLboZGdrH898bKpZnv-vXygwsF8z2kOtjIjlgLYBTFZlWXN4hufKG3so-tv3OOVsa2Tn4D1J0hyDri2MtZFy1jqoogrfO80bhWQBCZMh2a1_ZVa80qh8tpfCbVZqoTIikeI6PTmB80esWwT_9dSTPA.RocF3E0VtKDtepFDZ2beXE1Ql0xyugtBieji5zodjzA&dib_tag=se&keywords=suit&qid=1714009609&sprefix=suit%2Caps%2C228&sr=8-7"
  );
  saveProduct(
    "3",
    "Men's Slim Fit 3 Piece Suit",
    "$78.55",
    "The 4-piece set gives you more options on wearing according to different weathers and occasions.",
    "https://m.media-amazon.com/images/I/71dAT-0apVL._AC_SX569_.jpg",
    "https://www.amazon.com/Champagne-Jacket-Homecoming-Wedding-Tuxedo/dp/B0CJ266GZW/ref=sxin_15_pa_sp_search_thematic_sspa?content-id=amzn1.sym.823ebfac-4684-4387-9875-1d1e555df1a6%3Aamzn1.sym.823ebfac-4684-4387-9875-1d1e555df1a6&crid=1VHXBZ9D0ENHM&cv_ct_cx=suit&dib=eyJ2IjoiMSJ9.I3xraitHzinj-291sbEj2Q6zmtGBr0-snWY4Q6JHrDEWYUJVwCb1S4QcJRm5NSiDsFt52Vgkwo1IQUW1u3IOoA.NNOFceUFDYwjiOKZhlvAJPrGn3NHIrxv6yeW2r4ZU8o&dib_tag=se&keywords=suit&pd_rd_i=B0CJ266GZW&pd_rd_r=14371339-88a3-45d2-bd22-69314c5bf824&pd_rd_w=FCvZ3&pd_rd_wg=Bjs16&pf_rd_p=823ebfac-4684-4387-9875-1d1e555df1a6&pf_rd_r=K44M9SVMW3N1WAAX2R2B&qid=1714009748&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=suit%2Caps%2C228&sr=1-3-4a82bf2c-99de-49d4-8c6e-1b9c06d4b176-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&psc=1"
  );
  saveProduct(
    "4",
    "Mens 2 Piece Suit Slim Fit Business",
    "$68.99",
    "This stylish suit set features a two-button jacket and slim fit men's suit pants.",
    "https://m.media-amazon.com/images/I/61PZrDQiKmL._AC_SX569_.jpg",
    "https://www.amazon.com/Piece-Wedding-Groomsmen-Tuxedos-Jacket/dp/B0BNB9V1TY/ref=sr_1_20_sspa?crid=1VHXBZ9D0ENHM&dib=eyJ2IjoiMSJ9.W2U978cgzsCi4l3BFZ6zWo0oUlbTk5h0wifKLW0CPc8FlpL2lblK8hayLdeTk1hyNZEgBtb6MWfL3KHJzMs5AFHrxtXyVpP4hCLb2Wlcsq2B8YOUiZwgYfA9opgt3RZRgtekqxaDddmgPm2tRLKpMaLboZGdrH898bKpZnv-vXygwsF8z2kOtjIjlgLYBTFZlWXN4hufKG3so-tv3OOVsa2Tn4D1J0hyDri2MtZFy1jqoogrfO80bhWQBCZMh2a1_ZVa80qh8tpfCbVZqoTIikeI6PTmB80esWwT_9dSTPA.RocF3E0VtKDtepFDZ2beXE1Ql0xyugtBieji5zodjzA&dib_tag=se&keywords=suit&qid=1714009748&sprefix=suit%2Caps%2C228&sr=8-20-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1"
  );
}
