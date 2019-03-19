const puppeteer = require('puppeteer');

let browser = undefined;

beforeAll(() => {
  return puppeteer.launch().then(b => browser = b);
});
 
afterAll(() => {
  return browser.close();
});
 
test('title element', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
  await page.screenshot({path: 'screenshot.png'});
  const text = await page.evaluate(() => {
    return document.getElementById('title').innerHTML;
  });
  expect(text).toBe('Tittelen');
});

