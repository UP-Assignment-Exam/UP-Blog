const express = require("express");
const router = express.Router();

const authorOperations = require("./author.operation");

// Author login page
router.get("/login", authorOperations.loginPage);
router.get("/profile", authorOperations.profilePage);
router.get("/edit-profile" ,authorOperations.editProfilePage);

module.exports = router