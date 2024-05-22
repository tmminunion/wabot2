const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function takess(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Mengatur ukuran viewport halaman agar sesuai dengan resolusi Full HD
  await page.setViewport({
    width: 1720,
    height: 1980,
    deviceScaleFactor: 1,
  });
  await page.goto(url);

  // Scroll ke akhir halaman untuk memastikan seluruh konten dirender
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Mengambil tangkapan layar
  const screenshotBuffer = await page.screenshot();
  await browser.close();

  // Konversi buffer gambar menjadi string base64
  const base64String = screenshotBuffer.toString("base64");
  // Menyimpan gambar dalam format base64 ke dalam file dengan nama acak
  return base64String;
}
async function takessw(iddna) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Mengunjungi halaman
  await page.goto("https://api.bungtemin.net/voicemember/view/" + iddna);

  // Mendapatkan tinggi konten halaman menggunakan evaluasi di dalam halaman
  const contentHeight = await page.evaluate(() => {
    // Anda dapat mengganti ini dengan logika yang sesuai untuk mengukur tinggi konten pada halaman
    // Misalnya, jika konten yang ingin Anda ambil tingginya terletak dalam suatu elemen dengan ID tertentu:
    // return document.getElementById('content').scrollHeight;
    return document.body.scrollHeight;
  });

  // Mengatur viewport sesuai dengan tinggi konten halaman
  await page.setViewport({
    width: 1000, // Anda dapat mengatur lebar sesuai kebutuhan
    height: contentHeight, // Mengatur tinggi sesuai dengan tinggi konten halaman
    deviceScaleFactor: 1,
  });

  // Fungsi yang mengembalikan promise yang ditunda
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Menggunakan setTimeout untuk menunda eksekusi selama 2 detik
  await delay(2000);
  // Mengambil tangkapan layar
  const screenshotBuffer = await page.screenshot();
  await browser.close();

  // Konversi buffer gambar menjadi string base64
  const base64String = screenshotBuffer.toString("base64");

  // Menyimpan gambar dalam format base64 ke dalam file dengan nama acak
  return base64String;
}
async function takesslan(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Mengatur ukuran viewport halaman agar sesuai dengan resolusi Full HD
  await page.setViewport({
    width: 1720,
    height: 1980,
    deviceScaleFactor: 1,
  });
  await page.goto(url);

  // Scroll ke akhir halaman untuk memastikan seluruh konten dirender
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Mengambil tangkapan layar
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  // Menghasilkan nama file acak
  const filename = generateRandomString(17);
  // Konversi buffer gambar menjadi string base64
  const base64String = screenshotBuffer.toString("base64");
  // Menyimpan gambar dalam format base64 ke dalam file dengan nama acak
  const dodol = saveBase64Image(base64String, filename);
  return dodol;
}

function saveBase64Image(base64String, fileName) {
  console.log("menyimpan gambar");
  // Path untuk folder images di direktori root
  const imagePath = path.join(__dirname, "../images", fileName);

  // Pastikan folder images sudah ada, jika belum, buat folder tersebut
  if (!fs.existsSync(path.dirname(imagePath))) {
    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
  }

  // Tulis string base64 ke dalam file dengan nama fileName
  fs.writeFileSync(imagePath, base64String, "base64");
  console.log("selesai menyimpan gambar");
  return fileName;
}

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result + ".png";
}

module.exports = {
  takess: takess,
  takesslan: takesslan,
  takessw: takessw,
};
