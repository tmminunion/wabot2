const fs = require("fs");
const path = require("path");
const { fetchAPI, getPdfAsBase64 } = require("./api/axios");
const { MessageMedia, client } = require("./api/whatapp");
const { takess, takessw } = require("./api/screen");
const { uploadAndConvertToPDF } = require("./api/googleapis");
const { readQRCodeFromBase64 } = require("./api/bacaqr");
const { sendPdfMessage } = require("./modul/sendmodul");
const { staticMessage } = require("./modul/statismodul");
const { openaimsg } = require("./api/openai");
const { gemini } = require("./api/gemini");
const { mainqrcode } = require("./qrgen");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const routersDir = path.join(__dirname, "router");

const routerFiles = fs.readdirSync(routersDir);
app.use(express.static(path.join(__dirname, "public")));
// Loop melalui setiap file router dan mendaftarkan rutenya
routerFiles.forEach((file) => {
  const routerPath = path.join(routersDir, file);
  const router = require(routerPath);
  const routeName = "/" + file.split(".")[0]; // Ambil nama file tanpa ekstensi

  app.use(routeName, router);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

client.on("message", async (msg) => {
  console.log(msg.body);
  console.log(msg.from);
  staticMessage(msg);
  openaimsg(msg);
  const str = msg.body;
  if (str.toLowerCase() === "!infoss") {
    msg.react("🕵️‍♂️");
    const websiteUrl = "https://bungtemin.net/pemandatanss/dashboard/";
    takess(websiteUrl)
      .then((base64String) => {
        const media = new MessageMedia("image/png", base64String);
        msg.reply(media);
      })
      .catch((error) => console.error("Gagal mengambil screenshot:", error));
  } else if (msg.body.startsWith("!sskp ")) {
    msg.react("🕵️‍♂️");
    const stry = msg.body.split(" ")[1];
    const websiteUrl = "https://bungtemin.net/pemandatanss/dashboardkp/" + stry;

    takess(websiteUrl)
      .then((base64String) => {
        const media = new MessageMedia("image/png", base64String);
        msg.reply(media);
      })
      .catch((error) => console.error("Gagal mengambil screenshot:", error));
  } else if (msg.body.startsWith("!ssmandat ")) {
    msg.react("🕵️‍♂️");
    const stry = msg.body.split(" ")[1];
    const websiteUrl = "https://bungtemin.net/pemandatanss/dasman/" + stry;
    takess(websiteUrl)
      .then((base64String) => {
        const media = new MessageMedia("image/png", base64String);
        msg.reply(media);
      })
      .catch((error) => console.error("Gagal mengambil screenshot:", error));
  } else if (msg.body.startsWith("!ssweb ")) {
    msg.react("🕵️‍♂️");
    const websiteUrl = msg.body.split(" ")[1];
    takess(websiteUrl)
      .then((base64String) => {
        const media = new MessageMedia("image/png", base64String);
        msg.reply(media);
      })
      .catch((error) => console.error("Gagal mengambil screenshot:", error));
  } else if (msg.body.startsWith("!vmc")) {
    msg.react("🕵️‍♂️");

    const websiteUrl = msg.body.split(" ")[1];
    takessw(websiteUrl)
      .then((base64String) => {
        const media = new MessageMedia("image/png", base64String);
        msg.reply(media);
      })
      .catch((error) => console.error("Gagal mengambil screenshot:", error));
  } else if (msg.body === "!reaction") {
    msg.react("🕵️‍♂️");
  } else if (msg.body === "!send-media") {
    msg.react("🕵️‍♂️");
    try {
      const pdfUrl =
        "https://docs.google.com/spreadsheets/d/1O8lbk0VQ9YtMmc5x5wDb1Zb0m3KLx7VB4baLw6Xbtxc/export?format=pdf";
      const pdfBase64 = await getPdfAsBase64(pdfUrl);
      await sendPdfMessage(msg.from, pdfBase64);
    } catch (error) {
      console.error("Error:", error);
    }
  } else if (msg.body.startsWith("!pdfmandat ")) {
    msg.react("🕵️‍♂️");
    const stry = msg.body.split(" ")[1];
    try {
      const url = "https://bungtemin.net/wanotif/getfile/" + stry;
      const filenya = await fetchAPI(url);
      console.log("data file = .. ", filenya.id);
      const pdfUrl =
        "https://docs.google.com/spreadsheets/d/" +
        filenya.id +
        "/export?format=pdf";
      const pdfBase64 = await getPdfAsBase64(pdfUrl);
      await sendPdfMessage(msg.from, pdfBase64);
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

client.on("message", async (msg) => {
  if (msg.hasMedia && msg.body.startsWith("!pdfconvert")) {
    msg.react("🕵️‍♂️");
    msg.reply(`Mohon Tunggu akan menconvert PDF dari Docx`);
    const media = await msg.downloadMedia();
    const folder = path.join(process.cwd(), "images");
    const filePath = path.join(folder, media.filename);
    fs.writeFileSync(
      filePath,
      Buffer.from(media.data, "base64").toString("binary"),
      "binary"
    );
    try {
      const iddoc = await uploadAndConvertToPDF(filePath);
      const pdfUrl =
        "https://docs.google.com/document/d/" + iddoc + "/export?format=pdf";
      const pdfBase64 = await getPdfAsBase64(pdfUrl);
      await sendPdfMessage(msg.from, pdfBase64);
    } catch (error) {
      console.error("Error:", error);
    }
  } else if (
    (msg.hasMedia && msg.body.startsWith("!qr")) ||
    msg.body.startsWith("!Qr") ||
    msg.body.startsWith("!Qr")
  ) {
    msg.react("🕵️‍♂️");
    const media = await msg.downloadMedia();

    readQRCodeFromBase64(media.data, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      // Menampilkan hasil pembacaan kode QR
      console.log("kode = ", result);
      msg.reply(result);
    });
  } else if (
    (!msg.hasMedia && msg.body.startsWith("!qr ")) ||
    msg.body.startsWith("!Qr ") ||
    msg.body.startsWith("!Qr ")
  ) {
    msg.react("🕵️‍♂️");

    let text = msg.body;
    let hasil = text.substring(text.indexOf(" ") + 1);
    console.log(hasil);
    mainqrcode(msg.from, hasil);
  }
});

const getJadwalSholat = require("./api/sholu");

client.on("message", async (msg) => {
  if (msg.body === "!sholat") {
    msg.react("🕵️‍♂️");
    const data = await getJadwalSholat();
    if (data) {
      let message = `Jadwal Sholat untuk ${data.data.lokasi}, ${data.data.daerah} pada tanggal ${data.data.jadwal.tanggal}:\n\n`;
      Object.entries(data.data.jadwal).forEach(([key, value]) => {
        message += `${key.toUpperCase()}: ${value}\n`;
      });

      msg.reply(message);
    } else {
      msg.reply("Maaf, gagal mendapatkan data jadwal sholat.");
    }
  }
});
