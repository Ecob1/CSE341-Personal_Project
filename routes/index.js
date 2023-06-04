const express = require("express");
const router = express.Router();
router.use("/", require("./swagger"));
router.use("/vehicle", require("./vehicles"));
router.use("/carSales", require("./carSale"));

module.exports = router;
