const openai = require("openai");
const http = require("http");
const axios = require("axios");
const fs = require("fs");
const { MessageMedia, client } = require("./whatapp");
require("dotenv").config();

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const imgna = generateString(15); //63687346378dfbvhfihjf

const apiKeynya = process.env.API_KEY_OPENAI;
console.log(imgna);
// Konfigurasi klien OpenAI
const openaix = new openai.OpenAI({ apiKey: apiKeynya });

async function main(chatId, content) {
  const completion = await openaix.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: content,
    max_tokens: 3050,
    temperature: 0,
  });

  console.log(completion.choices[0]);
  client.sendMessage(chatId, completion.choices[0].text);
}

async function maingam(nome, prompt) {
  try {
    const image = await openaix.images.generate({
      model: "dall-e-2",
      prompt: prompt,
    });
    console.log(image.data);
    // Mendownload gambar dari URL yang diberikan
    // downloadImage(image.data[0].url, imgna + ".jpg");
    const media = await MessageMedia.fromUrl(image.data[0].url);
    await client.sendMessage(nome, media);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: "arraybuffer" });

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log("Image downloaded successfully!");
  });
}
async function openaimsg(msg) {
  if (msg.body.startsWith("/tanya ") || msg.body.startsWith("/Tanya ")) {
    let text = msg.body;
    let hasil = text.substring(text.indexOf(" ") + 1);
    msg.react("🕵️‍♂️");
    main(msg.from, hasil);
  } else if (
    msg.body.startsWith("#img ") ||
    msg.body.startsWith("#IMG ") ||
    msg.body.startsWith("#Img ")
  ) {
    let text = msg.body;
    let hasil = text.substring(text.indexOf(" ") + 1);
    msg.react("🕵️‍♂️");
    maingam(msg.from, hasil);
  }
}

module.exports = {
  openaimsg: openaimsg,
};
