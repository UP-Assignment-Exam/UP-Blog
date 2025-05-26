const UsersModel = require("../../models/Users.model");

const loginPage = async (req, res) => {
    res.render("web/user/login");
};

module.exports = {
    loginPage
};