const express = require("express");
const router = express.Router();
router.use("/", require("./swagger"));
router.use("/vehicle", require("./vehicles"));
router.use("/carSale", require("./carSales"));

module.exports = router;
