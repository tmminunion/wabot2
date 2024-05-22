const qr = require("qr-image");
const fs = require("fs");
const { MessageMedia, client } = require("./api/whatapp");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

async function mainqrcode(from, dataToEncode) {
  const randomFilename = uuidv4(); // Generate random filename
  const filePath = `./${randomFilename}.png`; // File path with random filename

  // Membuat QR code
  QRCode.toFile(
    filePath,
    dataToEncode,
    {
      errorCorrectionLevel: "H",
      scale: 8,
    },
    async function (err) {
      if (err) throw err;
      console.log("QR code saved!");

      // Mengirim QR code
      const media = MessageMedia.fromFilePath(filePath);
      await client.sendMessage(from, media);

      // Menghapus file setelah dua menit
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Gagal menghapus file: ${filePath}`, err);
          } else {
            console.log(`File dihapus: ${filePath}`);
          }
        });
      }, 2 * 60 * 1000); // Dua menit dalam milidetik
    }
  );
}

module.exports = {
  mainqrcode: mainqrcode,
};
