const express = require("express");
const router = express.Router();
console.log("halaman data ready");
router.get("/", (req, res) => {
  resultte = [];
  res.render("index", { data: resultte });
});

module.exports = router;
