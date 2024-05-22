const { MessageMedia, client } = require("../api/whatapp");
const { fetchAPI, postData } = require("../api/axios");
const { takessw } = require("../api/screen");

async function sendPdfMessage(from, base64Data) {
  try {
    const media = new MessageMedia("application/pdf", base64Data, "file.pdf");
    await client.sendMessage(from, media);
    console.log("PDF sent successfully.");
  } catch (error) {
    console.error("Error sending PDF message:", error);
    throw error;
  }
}

async function getData(url, chatId) {
  response = await fetchAPI(url);
  client.sendMessage(chatId, `${response.msg}`);
}
client.on("message", async (msg) => {
  const str = msg.body;
  if (str.toLowerCase() === "!info") {
    msg.react("🕵️‍♂️");
    const url = "https://bungtemin.net/nlog/progressmandat";
    getData(url, msg.from);
  } else if (str.toLowerCase() === "!update") {
    msg.react("🕵️‍♂️");
    const url = "https://bungtemin.net/wanotif/progressmandat";
    getData(url, msg.from);
  } else if (
    msg.body === "#1" ||
    str.toLowerCase() === "!vote" ||
    str.toLowerCase() === "!mandat" ||
    str.toLowerCase() === "!pemandatan" ||
    str.toLowerCase() === "!progress" ||
    str.toLowerCase() === "!persen" ||
    str.toLowerCase() === "!persentasi" ||
    str.toLowerCase() === "!%"
  ) {
    msg.react("🕵️‍♂️");
    const url = "https://bungtemin.net/nlog/progressmandat";
    getData(url, msg.from);
  } else if (
    msg.body === "!KP" ||
    str.toLowerCase() === "!mandatkp" ||
    str.toLowerCase() === "!kp"
  ) {
    msg.react("🕵️‍♂️");
    const url = "https://bungtemin.net/nlog/progressmandatkp";
    getData(url, msg.from);
  } else if (msg.body.startsWith("!mandatno ")) {
    msg.react("🕵️‍♂️");
    const stry = msg.body.split(" ")[1];
    const url = "https://bungtemin.net/nlog/mandatmano/" + stry;
    getData(url, msg.from);
  } else if (msg.body.startsWith("!votekp ")) {
    msg.react("🕵️‍♂️");
    const stry = msg.body.split(" ")[1];
    const url = "https://bungtemin.net/nlog/mandatkp/" + stry;
    getData(url, msg.from);
  } else if (msg.body.startsWith("!cari ")) {
    msg.react("🕵️‍♂️");
    const stry = msg.body.split(" ")[1];
    const url = "https://bungtemin.net/nlog/mandatcari/" + stry;
    getData(url, msg.from);
  } else if (msg.body.startsWith("!vm ") || msg.body.startsWith("!VM ")) {
    msg.react("🕵️‍♂️");
    let tebp = msg.body;
    const text = tebp.substring(tebp.indexOf(" ") + 1);
    const textnya = text.split(":")[1];
    const proses = text.split(":")[0];
    if (msg.hasMedia) {
      const media = await msg.downloadMedia();
      gam = media.data; // Menggunakan variabel global yang telah dideklarasikan sebelumnya
    } else {
      gam = "0"; // Menggunakan variabel global yang telah dideklarasikan sebelumnya
    }

    var input = msg.from;
    if (input.includes("@g.us")) {
      telpna = phoneNumber(msg.author);
      console.log("Ini adalah nomor telepon grup");
    } else {
      telpna = phoneNumber(msg.from);
    }
    console.log("telp setelah --> ", telpna);

    const kd = await postData(textnya, proses, telpna, gam);
    console.log("kr ke---> ", kd.kode);
    takessw(kd.kode).then((bas64) => {
      const medi = new MessageMedia("image/png", bas64);
      msg.reply(medi);
    });
  }
});

function phoneNumber(input) {
  // Mengekstrak hanya bagian angka dari string
  const numbers = input.match(/\d+/g);
  if (numbers) {
    // Menggabungkan semua grup angka yang ditemukan
    let phoneNumber = numbers.join("");

    // Mengganti awalan "62" dengan "0"
    if (phoneNumber.startsWith("62")) {
      phoneNumber = "0" + phoneNumber.substring(2);
    }

    return phoneNumber;
  } else {
    return null;
  }
}

module.exports = {
  getData: getData,
  sendPdfMessage: sendPdfMessage,
};
