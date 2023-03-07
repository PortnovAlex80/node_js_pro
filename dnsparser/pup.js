const fs = require("fs");
const puppeteer = require("puppeteer");

let URL = "https://www.dns-shop.ru/catalog/17a8a01d16404e77/smartfony/?p=";

(async () => {
  let flag = true;
  let res = [];
  let counter = 1;

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    devtools: false,
    executablePath: "/usr/bin/chromium",
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1400,
    height: 900,
  });

  await page.goto(`${URL}${counter}`);
  await page.waitForSelector("a.pagination-widget__page-link_next");
  //console.log(counter);

  const productElements = await page.$$(".catalog-product.ui-button-widget");
  console.log(productElements.length);
  const products = [];

  for (const el of productElements) {
    try {
      const linkElement = await el.$("a.catalog-product__name");
      const product_url = await linkElement.evaluate((link) => link.href);

      const spanText = await linkElement.evaluate((link) => {
        const spanElement = link.querySelector("span");
        return spanElement ? spanElement.textContent.trim() : "";
      });

      const priceElement = await el.$(
        ".product-buy__price, .product-buy__price_active"
      );
     
      const prevElement = await priceElement.evaluate((el) =>
        el.querySelector(".product-buy__prev")
      );
     
      const priceText = await priceElement.evaluate((price) =>
        price.querySelector(".product-buy__prev")
          ? price.querySelector(".product-buy__prev").textContent.trim()
          : price.textContent.trim()
      );
    const price = parseFloat(priceText.replace(/[^\d.-]/g, ""));

      products.push({ product_url, spanText, price });
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`products`);
  for (product of products) {
    console.log(`product - ${product.product_url}`);
    console.log(`${product.spanText}`);
    console.log(`${product.price}`);
  }
  counter++;

  await browser.close();
})();
