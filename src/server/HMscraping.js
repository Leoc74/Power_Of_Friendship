const puppeteer = require("puppeteer");

async function scrapeHM() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://www2.hm.com/en_us/men/products/view-all.html", {
      waitUntil: "domcontentloaded",
    });

    console.log("H&M Clothing");

    // Wait for the required elements to be loaded
    await page.waitForSelector(".item-heading", { timeout: 10000 });
    await page.waitForSelector(".item-price", { timeout: 10000 });
    await page.waitForSelector(".item-image img", { timeout: 10000 });

    // Extract data for each product
    const products = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll(".item-heading")).map(
        (element) => element.textContent.trim()
      );
      const prices = Array.from(document.querySelectorAll(".item-price")).map(
        (element) => element.textContent.trim()
      );
      const images = Array.from(
        document.querySelectorAll(".item-image img")
      ).map((element) => element.src);

      // Log selectors and corresponding data
      console.log("Titles:", titles);
      console.log("Prices:", prices);
      console.log("Images:", images);

      return titles.map((title, index) => ({
        title: title,
        price: prices[index],
        image: images[index],
      }));
    });

    console.log(products);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

scrapeHM();
