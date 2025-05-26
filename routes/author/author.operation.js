const AuthorsModel = require("../../models/Authors.model");

const loginPage = async (req, res) => {
    res.render("web/author/login");
};

module.exports = {
    loginPage
};