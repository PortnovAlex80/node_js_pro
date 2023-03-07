const fs = require("fs");
const puppeteer = require("puppeteer");

let link = "https://www.dns-shop.ru/catalog/17a8a01d16404e77/smartfony/?p=";

(async () => {
  let flag = true;
  let res = [];
  let counter = 1;

  try {
    let browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: false,
      executablePath: "/usr/bin/chromium",
    });
    let page = await browser.newPage();
    await page.setViewport({
      width: 1400,
      height: 900,
    });

    while (flag) {
      await page.goto(`${link}${counter}`);
      await page.waitForSelector("a.pagination-widget__page-link_next");
      console.log(counter);

      const urls = await page.$eval("a.catalog-product__name", (el) => el.href);
      const name = await page.$eval(
        "a.catalog-product__name span",
        (el) => el.textContent
      );

      //   let html = await page.evaluate(async () => {
      //     let page = [];
      //   });
      //   await res.push(html);
      //   console.log(res);
      console.log(urls);
      console.log(name);

      counter++;
    }
  } catch (e) {
    console.log(e);
    await browser.close();
  }
})();

// try {
// //   let divs = document.querySelectorAll(
// //     "div.catalog-product ui-button-widget"
// //   );
// //   divs.forEach((div) => {
// //     let a = div.querySelector(
// //       "a.catalog-product__name ui-link ui-link_black"
// //     );

// //     let obj = {
// //       title: a.innerText,
// //       link: a.href,
// //       print: div.querySelector("dev.product-buy__price"),
// //     };

// //     page.push(obj);
// //   });

//   return page; //catalog-product__name ui-link ui-link_black product-buy__price catalog-product__name ui-link ui-link_black
// } catch (e) {
//   console.log(e);
// }
