const fs = require("fs");
const path = require("path");

async function olehdata(data) {
  if (data != null && data.type != null) {
    const handlerPath = path.join(__dirname, `./fungsi/${data.type}.js`);
    if (fs.existsSync(handlerPath)) {
      const handler = require(handlerPath);
      await handler(data);
    } else {
      console.log(
        `Tidak ada penanganan yang ditemukan untuk jenis data '${data.type}'`
      );
    }
  } else {
    console.log("Data notif kosong atau tidak lengkap");
  }
}

module.exports = olehdata;
