const express = require("express");
const router = express.Router();
router.use("/", require("./swagger"));
router.use("/vehicle", require("./vehicles"));
module.exports = router;