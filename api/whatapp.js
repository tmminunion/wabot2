const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { waktou } = require("../service/fire");
var ip = require('ip');
const { getIpAddress } = require("./apiroute");



client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
      headless: true,
      args: [ '--no-sandbox', '--disable-gpu', ],
  },
  webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");
  waktou(client, MessageMedia);
  try {
    const data = ip.address();
    console.log(data);
    client.sendMessage("6285882620035@c.us", `ip LOKAL ubuntuROUTER --> ${data}`);

    getIpAddress()
  .then(ip => {
    console.log(`IP Anda adalah: ${ip}`);
     client.sendMessage("6285882620035@c.us", `ip PUBLIK ROUTER --> ${ip}`);
  })
  .catch(error => {
    console.error(error.message);
  });

  } catch (error) {
    console.error("Error:", error);
  }
});

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

client.initialize();

module.exports = {
  client: client,
  MessageMedia: MessageMedia,
};
