const puppeteer = require("puppeteer");

let browser;

async function launchBrowser() {
  browser = await puppeteer.launch();
}

async function getPage() {
  if (!browser) await launchBrowser();
  const page = await browser.newPage();
  return page;
}

async function updatePDF(KP) {
  const page = await getPage();
  await page.goto(`https://bungtemin.net/pdfupdate?KP=${KP}`);
  console.log(`membuka halaman : https://bungtemin.net/pdfupdate?KP=${KP}`);
  // Membaca console.log dari halaman
  const consoleMessages = await page.evaluate(() => {
    const logs = [];
    const originalConsoleLog = console.log;
    console.log = function (message) {
      logs.push(message);
      originalConsoleLog.apply(console, arguments);
    };

    const consoleLogs = logs;
    return consoleLogs;
  });

  console.log("Console logs:", consoleMessages);
}

module.exports = { updatePDF };
