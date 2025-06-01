const express = require("express");

const router = express.Router();

// router.get("/", async (req, res) => {
//     res.render("web/user/login");
// });

router.use("/", require("./user/index.route"));
router.use("/api", require("./api/index.route"))
router.use("/author", require("./author/index.route"));

module.exports = router