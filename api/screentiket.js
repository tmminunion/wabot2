const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function takessw(iddna) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Mengunjungi halaman
  await page.goto(iddna);

  // Mendapatkan tinggi konten halaman menggunakan evaluasi di dalam halaman
  const contentHeight = await page.evaluate(() => {
    // Anda dapat mengganti ini dengan logika yang sesuai untuk mengukur tinggi konten pada halaman
    // Misalnya, jika konten yang ingin Anda ambil tingginya terletak dalam suatu elemen dengan ID tertentu:
    // return document.getElementById('content').scrollHeight;
    return document.body.scrollHeight;
  });

  // Mengatur viewport sesuai dengan tinggi konten halaman
  await page.setViewport({
    width: 375, // Anda dapat mengatur lebar sesuai kebutuhan
    height: contentHeight + 20, // Mengatur tinggi sesuai dengan tinggi konten halaman
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

module.exports = {
  takessw: takessw,
};
