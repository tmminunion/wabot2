const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

const qrcode = require("qrcode-terminal");
// Inisialisasi koneksi MongoDB

// Event untuk menampilkan QR code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

// Event ketika client WhatsApp sudah siap
client.on("ready", async () => {
  console.log("Client is ready!");
});

// Event jika proses autentikasi berhasil
client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

// Event jika proses autentikasi gagal
client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

// Inisialisasi client WhatsApp
client.initialize();
