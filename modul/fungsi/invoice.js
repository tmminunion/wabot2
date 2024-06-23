const fetchDelete = require("./delete");
const { MessageMedia, client } = require("../../api/whatapp");

async function handler(data) {
  const phoneNumber = data.target_audience;
  const chatId = "62" + phoneNumber.substring(1) + "@c.us";
  const media = await MessageMedia.fromUrl(data.lampiran);

  // Mengirim pesan media ke nomor yang dituju
  await client
    .sendMessage(chatId, media, { caption: `${data.isi_news}` })
    .then((response) => {
      console.log("Pesan berhasil terkirim:", response);
      fetchDelete(data.id);
    })
    .catch((error) => {
      console.error("Gagal mengirim pesan:", error);
    });

  // Hapus data setelah berhasil dikirim
}

module.exports = handler;