const express = require("express");

const authorOperations = require("./author.operation");

const router = express.Router();

router.use("/", authorOperations.loginPage);

module.exports = router