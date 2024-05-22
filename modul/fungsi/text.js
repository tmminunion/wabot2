const { MessageMedia, client } = require("../../api/whatapp");
const fetchDelete = require("./delete");
async function handler(data) {
  const phoneNumber = data.target_audience;
  const chatId = "62" + phoneNumber.substring(1) + "@c.us";
  client
    .sendMessage(chatId, `${data.isi_news}`)
    .then((response) => {
      console.log("Pesan berhasil terkirim:", response);
      fetchDelete(data.id);
    })
    .catch((error) => {
      console.error("Gagal mengirim pesan:", error);
    });
}

module.exports = handler;
