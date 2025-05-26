const express = require("express");

const userOperations = require("./user.operation");

const router = express.Router();

router.get("/", userOperations.loginPage);

module.exports = router