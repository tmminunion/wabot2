const axios = require('axios');

async function getIpAddress() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error}`);
  }
}

// Contoh penggunaan fungsi

  module.exports = {
  getIpAddress: getIpAddress,
 
};