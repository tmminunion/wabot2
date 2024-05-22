const axios = require("axios");

require("dotenv").config();
const io = require("socket.io-client");

const olehdata = require("../modul/datawa");
const dodollsd = process.env.API_KEY_BT;
const headers = {
  apikey: dodollsd,
};

async function fetchData() {
  try {
    const response = await axios.get("https://bungtemin.net/wanotif", {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error https://bungtemin.net/wanotif datake :",
      error.message
    );
    throw error;
  }
}
const postData = async (t, p, te, gam) => {
  try {
    const response = await axios.post(
      "http://api.bungtemin.net/voicemember/post",
      {
        nomer: te,
        text: t,
        proses: p,
        gambar: gam,
      },
      {
        headers: {
          // Tambahkan header jika diperlukan, misalnya content type
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error.response);
  }
};
async function fetchAPI(url) {
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

async function fetchDelete(id) {
  try {
    const response = await axios.get(
      "https://bungtemin.net/wanotif/del/" + id,
      {
        headers: headers,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
async function getPdfAsBase64(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const pdfData = Buffer.from(response.data, "binary").toString("base64");
    console.log("pdaf data: ", pdfData);
    return pdfData;
  } catch (error) {
    console.error("Error fetching PDF:", error);
    throw error;
  }
}
let isIntervalRunning = false;
let intervalId;

function startInterval() {
  if (!isIntervalRunning) {
    console.log("set interval ON");
    intervalId = setInterval(async () => {
      try {
        const data = await fetchData();
        console.log("data", data);
        olehdata(data);
      } catch (error) {
        console.error("Error interval wanotif fetching data:", error.message);
      }
    }, 60000);
    isIntervalRunning = true;
  }
}

function stopInterval() {
  console.log("pengecekan berjalan dihentikan");
  clearInterval(intervalId);
  isIntervalRunning = false;
}

// Inisialisasi variabel socket di luar fungsi sehingga dapat diakses secara global
let socket;

function connectSocketWithToken() {
  socket = io("https://bt-api.bungtemin.net", {
    auth: {
      token: process.env.API_KEY_WEBSOCKET, // Menggunakan token dari response Axios
    },
  });

  socket.on("connect", () => {
    console.log("Connected to server with socket id:", socket.id);
  });

  socket.on("lampuStatus", (status) => {
    console.log("Status lampu:", status);
    if (status == "On") {
      console.log("ada perintah ON");
      startInterval();
    } else {
      console.log("ada perintah OFF");
      stopInterval();
    }
  });

  socket.on("connect_error", (err) => {
    console.log(err.data); // { content: "Please retry later" }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}

connectSocketWithToken();

const { dbta } = require("../service/firebase");
const { getDatabase, ref, onValue } = require("firebase/database");

const starCountRef = ref(dbta, "/DATAVM/mesinVM");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log("data fiurebase", data);
});

// Ekspor fetchDelete dan fetchData sebagai properti dari objek default
module.exports = {
  fetchAPI: fetchAPI,
  getPdfAsBase64: getPdfAsBase64,
  postData: postData,
};
