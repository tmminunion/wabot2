const express = require("express");
const router = express.Router();
console.log("halaman voice ready");
router.get("/:id", (req, res) => {
  resultte = [];
  res.render("index", { data: resultte });
});

module.exports = router;
