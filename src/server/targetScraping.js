const puppeteer = require('puppeteer');
//make sure to run npm install puppeteer if it isn't already installed.

//I think it might be failing because the content I want is too "deep" in the HTML so it takes a while to find.
async function scrapeTarget() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://www.target.com/s?searchTerm=mens+clothing', { waitUntil: 'networkidle2', timeout: 60000 });

        // Wait for the required element to be loaded
        console.log("here")
        await page.waitForSelector('.styles_truncate__lcCbH', { timeout: 60000 });

        // Extract text content
        const items = await page.evaluate(() => {
            //const elements = Array.from(document.querySelectorAll('.styles_truncate__lcCbH'));
            const elements = Array.from(document.querySelectorAll('.styles_truncate__lcCbH a'));
            return elements.map(element => {
                return {
                    textContent: element.textContent,
                    href: "https://www.target.com" + element.getAttribute('href')
                };
            });
            //return elements.map(element => element.textContent);
        });

        console.log(items);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

scrapeTarget();
