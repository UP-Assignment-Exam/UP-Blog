const express = require("express");

const userOperations = require("./user.operation");

const router = express.Router();

router.get("/", userOperations.loginPage);

router.use("/", require("./blogs/blogs.route"));

module.exports = router