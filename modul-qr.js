// qrReader.js

const Jimp = require("jimp");
const qrCode = require("qrcode-reader");

// Fungsi untuk membaca kode QR dari string base64
function readQRCodeFromBase64(base64String, callback) {
  // Mengonversi string base64 ke buffer
  const buffer = Buffer.from(
    base64String.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // Parse the image using Jimp.read() method
  Jimp.read(buffer, function (err, image) {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    // Creating an instance of qrcode-reader module
    let qrcode = new qrCode();
    qrcode.callback = function (err, value) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      // Mengembalikan hasil pembacaan kode QR ke callback
      console.log(value.result);
      callback(null, value.result);
    };
    // Decoding the QR code
    qrcode.decode(image.bitmap);
  });
}

// Ekspor fungsi agar dapat digunakan di tempat lain
module.exports = {
  readQRCodeFromBase64,
};
