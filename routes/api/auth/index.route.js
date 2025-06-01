const express = require("express");
const app = express();

const Operations = require("./auth.operation");

const router = express.Router();

router.post("/login", Operations.login);
router.post("/register", Operations.register);
router.post("/logout", Operations.logout);
router.post('/forgot-password', Operations.forgotPassword);
router.get('/verify-reset-token', Operations.verifyResetToken);
router.post('/reset-password', Operations.resetPassword);

module.exports = router;