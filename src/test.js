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

test('version endpoint', async () => {
  const page = await browser.newPage();
  await page.setOfflineMode(true);
  await page.goto('http://localhost:8080/version');
  const text = await page.evaluate(() => document.body.innerText);
  const min = str => str.substring(0, str.lastIndexOf(':'));
  expect(min(text)).toEqual(min(`version; static-v3 ${new Date()}`));
});

