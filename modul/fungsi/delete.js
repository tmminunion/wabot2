const axios = require("axios");
const dodollsd = process.env.API_KEY_BT;
const headers = {
  apikey: dodollsd,
};

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

module.exports = fetchDelete;
