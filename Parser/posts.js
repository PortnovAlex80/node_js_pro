const inputFile = "input.txt";
const outputFile = "output.txt";
const URL = "https://www.bmwclub.ru/posts/";
const fs = require("fs");
const puppeteer = require("puppeteer");

async function checkLockedAlertExists(url) {
  try {
    // Запускаем браузер
    console.log("Переходим на нужную страницу");
    const browser = await puppeteer.launch();
    // Открываем новую страницу
    const page = await browser.newPage();
    // Переходим на нужную страницу
    console.log("Переходим на нужную страницу");
    await page.goto(url);
    // Ожидаем появления элемента на странице
    await page.waitForSelector("dd.lockedAlert", { timeout: 500 });
    // Ищем элемент на странице
    const lockedAlert = await page.$("dd.lockedAlert");
    // Проверяем, существует ли элемент
    if (lockedAlert) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    // Закрываем браузер
    if (browser) {
      await browser.close();
    }
  }
}

async function checkUrlsAndSaveToFile(inputFile, outputFile) {
  try {
    // Читаем содержимое входного файла с коллекцией ссылок
    const urls = fs.readFileSync(inputFile, "utf-8").split("\n");
    // Открываем выходной файл для записи ссылок, для которых checkLockedAlertExists возвращает false
    const stream = fs.createWriteStream(outputFile, { flags: "a" });
    // Перебираем ссылки и проверяем каждую с помощью checkLockedAlertExists
    for (const url of urls) {
      const result = await checkLockedAlertExists(url);
      if (!result) {
        // Если checkLockedAlertExists возвращает false, сохраняем ссылку в выходной файл
        stream.write(url + "\n");
      }
    }
    // Закрываем выходной файл
    stream.end();
    console.log("Проверка завершена");
  } catch (error) {
    console.error(error);
  }
}

async function TESTcheckUrlsAndSaveToFile(inputFile, outputFile) {
  try {
    // Читаем содержимое входного файла с коллекцией ссылок
    const urls = fs.readFileSync(inputFile, "utf-8").split("\n");
    // Открываем выходной файл для записи ссылок, для которых checkLockedAlertExists возвращает false
    const stream = fs.createWriteStream(outputFile, { flags: "a" });
    // Перебираем ссылки и проверяем каждую с помощью checkLockdAlertExists
    for (const url of urls) {
      const result = checkLockedAlertExists(url);
      if (!result) {
        console.log("Сохраняем пост");
        // Если checkLockedAlertExists возвращает false, сохраняем ссылку в выходной файл
        stream.write(url + "\n");
      }
      console.log("Топик закрыт");
    }
    // Закрываем выходной файл
    stream.end();
    console.log("Проверка завершена");
  } catch (error) {
    console.error(error);
  }
}

console.log("Начало");
TESTcheckUrlsAndSaveToFile(inputFile, outputFile);
console.log("Завершено");
