const express = require("express");

const Operations = require("./blogs.operation");

const router = express.Router();

router.get("/blogs", Operations.homePage);

module.exports = router