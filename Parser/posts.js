const inputFile = "input.txt";
const outputFile = "output.txt";
const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const MIN_DELAY = 1555;
const MAX_DELAY = 555;

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
const acceptLanguage = "en-US,en;q=0.9";
const acceptEncoding = "gzip, deflate, br";
const upgradeInsecureRequests = "1";
const referer = "https://www.bmwclub.com/forums/";
const accept =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";

puppeteer.use(StealthPlugin());

(async () => {
  let counter = 17936;

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    devtools: false,
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--user-agent=${userAgent}`,
      `--accept=${accept}`,
      `--accept-language=${acceptLanguage}`,
      `--accept-encoding=${acceptEncoding}`,
      `--upgrade-insecure-requests=${upgradeInsecureRequests}`,
      `--referer=${referer}`,
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1400,
    height: 900,
  });

  await page.goto(`https://www.bmwclub.ru/forums`);

  try {
    // Читаем содержимое входного файла с коллекцией ссылок
    const urls = fs.readFileSync(inputFile, "utf-8").split("\n");
    // Открываем выходной файл для записи ссылок, для которых checkLockedAlertExists возвращает false
    const stream = fs.createWriteStream(outputFile, { flags: "a" });
    // Перебираем ссылки и проверяем каждую с помощью checkLockdAlertExists
    for (const url of urls) {
      console.log(`Open topic - ${url}`);

      try {
        await page.goto(`${url}`);
      } catch (e) {
        console.log(`Second try - ${url}`);
        await new Promise((r) => setTimeout(r, 15000 + Math.random() * 15000));
      }

      let dY = 50 + Math.random() * 1000;
      await page.mouse.wheel({ deltaY: dY });

      try {
        await page.waitForSelector("div.titleBar");
      } catch (e) {
        console.log(e);
      }

      dY = -Math.random() * 1000;
      await page.mouse.wheel({ deltaY: dY });

      console.log(`Verify N-${counter} url:${url}`);
      // Ожидаем появления элемента на странице
      //await page.waitForSelector("dd.lockedAlert", { timeout: 2000 });
      // Ищем элемент на странице
      const lockedAlert = await page.$("dd.lockedAlert");
      // Проверяем, существует ли элемент
      const result = lockedAlert ? true : false;
      if (!result) {
        console.log(`Сохраняем пост ${url}`);
        // Если checkLockedAlertExists возвращает false, сохраняем ссылку в выходной файл
        stream.write(url + "\n");
      } else {
        console.log(`Топик закрыт ${url}`);
      }
      counter++;

      const delay = MIN_DELAY + Math.random() * MAX_DELAY;
      console.log(`Delay - ${delay}`);
      await page.waitForTimeout(delay);
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
    }
    // Закрываем выходной файл
    stream.end();
    console.log("Проверка завершена");
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
