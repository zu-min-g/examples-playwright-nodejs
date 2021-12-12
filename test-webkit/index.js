const playwright = require('playwright');
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000);

(async () => {
    for (const browserType of [playwright.chromium, playwright.firefox, playwright.webkit]) {
        const browser = await browserType.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/');
        await page.screenshot({ path: `example-${browserType.name()}.png` });
        await browser.close();
    }

    server.close()
})();
