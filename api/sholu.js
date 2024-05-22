const axios = require('axios');

// Fungsi untuk mendapatkan jadwal sholat
const getJadwalSholat = async () => {
  try {
    const today = new Date();
    const tanggal = today.getDate();
    const bulan = today.getMonth() + 1;
    const tahun = today.getFullYear();
    const url = `https://api.myquran.com/v2/sholat/jadwal/1210/${tahun}/${bulan}/${tanggal}`;

    const response = await axios.get(url);
    console.log(response.data);
    return response.data; // Kembalikan data yang didapat dari API
  } catch (error) {
    console.error(error);
    return null; // Kembalikan null jika terjadi error
  }
};

module.exports = getJadwalSholat;