const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
const acceptLanguage = 'en-US,en;q=0.9';
const acceptEncoding = 'gzip, deflate, br';
const upgradeInsecureRequests = '1';
const referer = 'https://www.google.com/';

text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

const accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';

const acceptLanguage = 'en-US,en;q=0.9';
const acceptEncoding = 'gzip, deflate, br';
const upgradeInsecureRequests = '1';
const referer = 'https://www.google.com/';

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--user-agent=${userAgent}`,
      `--accept=${accept}`,
      `--accept-language=${acceptLanguage}`,
      `--accept-encoding=${acceptEncoding}`,
      `--upgrade-insecure-requests=${upgradeInsecureRequests}`,
      `--referer=${referer}`
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com/');

  // ...

  await browser.close();
})();

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--user-agent=${userAgent}`,
      `--accept=${accept}`,
      `--accept-language=${acceptLanguage}`,
      `--accept-encoding=${acceptEncoding}`,
      `--upgrade-insecure-requests=${upgradeInsecureRequests}`,
      `--referer=${referer}`
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com/');

  // ...

  await browser.close();
})();



const puppeteer = require('puppeteer');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
const acceptLanguage = 'en-US,en;q=0.9';
const acceptEncoding = 'gzip, deflate, br';
const upgradeInsecureRequests = '1';
const referer = 'https://www.google.com/';

const launchOptions = {
  headless: true,
  defaultViewport: null,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    `--user-agent=${userAgent}`,
    `--accept=${accept}`,
    `--accept-language=${acceptLanguage}`,
    `--accept-encoding=${acceptEncoding}`,
    `--upgrade-insecure-requests=${upgradeInsecureRequests}`,
    `--referer=${referer}`
  ],
};

puppeteer.launch(launchOptions)
  .then(async (browser) => {
    const page = await browser.newPage();
    // ...
  })
  .catch((error) => {
    console.error(error);
  });


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto('https://www.google.com');
  
  // здесь можно использовать другие функции и методы Puppeteer, чтобы имитировать поведение реального браузера

  await browser.close();
})();

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

