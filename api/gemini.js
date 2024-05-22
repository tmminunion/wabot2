const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const gem = process.env.API_KEY_GEMINI;
const genAI = new GoogleGenerativeAI(gem);
const { MessageMedia, client } = require("./whatapp");
async function gemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

async function run(chatId, prompt) {
  text = await gemini(prompt);
  client.sendMessage(chatId, text);
}

client.on("message", async (msg) => {
  if (
    msg.body.startsWith(":tanya ") ||
    msg.body.startsWith("tanya: ") ||
    msg.body.startsWith("!tanya ") ||
    msg.body.startsWith("!tanya ") ||
    msg.body.startsWith("!Tanya ") ||
    msg.body.startsWith("!TANYA ")
  ) {
    msg.react("🕵️‍♂️");
    run(msg.from, msg.body);
  }
});

module.exports = {
  gemini: gemini,
};
