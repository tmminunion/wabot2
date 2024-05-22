const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Fungsi untuk mengautentikasi dan membuat instance Google Drive API
async function getDriveInstance() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./creden.json", // Ganti dengan nama file credentials yang Anda dapatkan dari Console Pengembang Google
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive = google.drive({ version: "v3", auth });
  return drive;
}

// Fungsi untuk mengunggah file ke Google Drive
async function uploadFileToDrive(drive, folderId, filePath, fileName) {
  console.log("meng upload");
  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Ganti sesuai tipe media yang diunggah
    body: fs.createReadStream(filePath),
  };
  const res = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  console.log("selesai upload");
  console.log(res.data.id);
  return res.data.id;
}

// Fungsi untuk mengonversi file di Google Drive ke PDF
async function convertFileToPDF(drive, fileId, folderId) {
  console.log("convertpdf");
  const pdfFileMetadata = {
    name: "converted.pdf",
    parents: [folderId],
    mimeType: "application/pdf",
  };
  const res = await drive.files.copy({
    fileId: fileId,
    requestBody: pdfFileMetadata,
  });
  console.log("selesai convertpdf");
  console.log(res.data.id);
  return res.data.id;
}
// Fungsi untuk menghasilkan URL unduhan file PDF yang baru dibuat
async function generatePDFDownloadLink(drive, pdfFileId) {
  const pdfMetadata = await drive.files.get({
    fileId: pdfFileId,
    fields: "webViewLink",
  });
  const webViewLink = pdfMetadata.data.webViewLink;
  return webViewLink.replace("view", "export?format=pdf");
}

// Fungsi untuk menghasilkan base64 dari file PDF yang baru dibuat
async function generatePDFBase64(drive, pdfFileId) {
  const response = await drive.files.get(
    {
      fileId: pdfFileId,
      alt: "media",
    },
    { responseType: "arraybuffer" }
  );

  const pdfBuffer = Buffer.from(response.data, "binary");
  const pdfBase64 = pdfBuffer.toString("base64");

  return pdfBase64;
}

// Fungsi utama untuk mengunggah file dan mengonversinya ke PDF
async function uploadAndConvertToPDF(filePath) {
  try {
    const drive = await getDriveInstance();
    const folderId = "1y5ZEQiksamMkasCCQ8wr3lB23oauX5x2"; // Ganti dengan ID folder tempat Anda ingin menyimpan file di Google Drive
    const fileName = path.basename(filePath);
    const fileId = await uploadFileToDrive(drive, folderId, filePath, fileName);

    console.log("uplod berhasil");
    console.log(fileId);
    return fileId;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}
module.exports = {
  uploadAndConvertToPDF: uploadAndConvertToPDF,
};
