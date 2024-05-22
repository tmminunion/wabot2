const axios = require("axios");
require("dotenv").config();
const io = require("socket.io-client");

// Inisialisasi variabel socket di luar fungsi sehingga dapat diakses secara global
let socket;

function connectSocketWithToken(token) {
  socket = io("https://bt-api.bungtemin.net", {
    auth: {
      token: token, // Menggunakan token dari response Axios
    },
  });

  socket.on("connect", () => {
    console.log("Connected to server with socket id:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log(err.message); // not authorized
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}

// Data untuk permintaan POST
const postData = {
  datauser: "logsdataPC", // Sesuaikan nilai ini
  pwd: process.env.API_KEY_WEBSOCKET, // Sesuaikan nilai ini
};

axios
  .post("https://api.bungtemin.net/websocket", postData)
  .then(function (response) {
    const token = response.data.token; // Asumsi response mengandung 'token'
    connectSocketWithToken(token);
  })
  .catch(function (error) {
    console.log("Error saat mendapatkan token:", error);
  });

// Export socket agar dapat digunakan di modul lain
module.exports = socket;
