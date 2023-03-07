const inputFile = "input.txt";
const outputFile = "output.txt";
const fs = require("fs");
const puppeteer = require("puppeteer");

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

  try {
    // Читаем содержимое входного файла с коллекцией ссылок
    const urls = fs.readFileSync(inputFile, "utf-8").split("\n");
    // Открываем выходной файл для записи ссылок, для которых checkLockedAlertExists возвращает false
    const stream = fs.createWriteStream(outputFile, { flags: "a" });
    // Перебираем ссылки и проверяем каждую с помощью checkLockdAlertExists
    for (const url of urls) {
      await page.goto(`${url}`);
      await page.waitForSelector("div.titleBar");

      // Ожидаем появления элемента на странице
      //await page.waitForSelector("dd.lockedAlert", { timeout: 2000 });
      // Ищем элемент на странице
      const lockedAlert = await page.$("dd.lockedAlert");
      // Проверяем, существует ли элемент
      const result = lockedAlert ? true : false;
      if (!result) {
        console.log("Сохраняем пост");
        // Если checkLockedAlertExists возвращает false, сохраняем ссылку в выходной файл
        stream.write(url + "\n");
      } else {
        console.log("Топик закрыт");
      }
    }
    // Закрываем выходной файл
    stream.end();
    console.log("Проверка завершена");
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
