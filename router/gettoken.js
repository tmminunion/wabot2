const express = require("express");
const router = express.Router();
const { getToken } = require("../api/axios");
console.log("halaman voice ready");
router.get("/", (req, res) => {
  getToken();
  resultte = [];
  res.render("index", { data: resultte });
});

module.exports = router;
