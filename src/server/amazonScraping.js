//const puppeteer = require("puppeteer");
import puppeteer from "puppeteer";

//I think it might be failing because the content I want is too "deep" in the HTML so it takes a while to find.
async function scrapeKohls() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(
      "https://www.kohls.com/search.jsp?submit-search=web-regular&search=mens+tshirt",
      { waitUntil: "networkidle2", timeout: 60000 }
    );

    // Wait for the required element to be loaded
    await page.waitForSelector(".products_grid", { timeout: 60000 });

    // Extract text content
    const items = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll(".products_grid"));
      console.log();
      return "temp";
      return elements.map((element) => {
        return {
          textContent: element.textContent,
          href: "https://www.target.com" + element.getAttribute("href"),
        };
      });
      //return elements.map(element => element.textContent);
    });

    console.log(items);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

scrapeKohls();
