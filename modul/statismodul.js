async function staticMessage(msg) {
  const str = msg.body;
  if (msg.body === "!link" || msg.body === "!Link") {
    msg.react("🕵️‍♂️");
    msg.reply(
      `https://bungtemin.net/musnik

Berikut kami kirimkan Link Pemandatan MUSNIK XII, sebelum pengisian mohon pastikan :
1. Sudah melakukan koordinasi/musyawarah dengan Pleno dan KP nya;
2. Pengisian Link sesuai JUKNIS Pemandatan;
3. Pengisian Link sebelum batas waktu yang ditentukan ( tanggal 21 Februari 2024 Pukul 23:59 WIB)

Terima Kasih`
    );
  } else if (msg.body === "!Help" || msg.body === "!help") {
    msg.react("🕵️‍♂️");
    msg.reply(
      `*List Chatbot*:

1. *!info* -- untuk info progress mandat secara total
2. *!mandatkp* -- untuk info list all kp
3. *!votekp [no kp]* --- untuk info mandat per KP
4. *!mandatno [no mandat]* -- untuk info berdasarkan nomor mandat
5. *!cari [nama/noreg]* -- untuk data anggota sudah vote atau belum
6. *!tanya [pertanyaan]* -- untuk beranya pada chatbot ai
7. *!infoss* -- SS All 
8. *!sskp [no kp]* -- SS per KP
9. *!ssmandat [no mandat]* -- Ss Mandat
10. *!help* -- informasi list

Terimakasih atas Langganan informasi pemandatan.
https://bungtemin.net/musnik`
    );
  }
}
module.exports = {
  staticMessage: staticMessage,
};
