const puppeteer = require('puppeteer');
 
test('title element', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
  await page.screenshot({path: 'screenshot.png'});
  const text = await page.evaluate(() => {
    return document.getElementById('title').innerHTML;
  });
  await browser.close();
  expect(text).toBe('Tittelen');
});

