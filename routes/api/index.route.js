const express = require('express');
const path = require('path');

const router = express.Router();

router.use("/auth", require("./auth/index.route"))

module.exports = router