const UsersModel = require("../../models/Users.model");

const loginPage = async (req, res) => {
    res.render("web/user/login", {
        layout: false
    });
};

const registerPage = async (req, res) => {
    res.render("web/user/register", {
        layout: false
    });
};

const forgotPassword = async (req, res) => {
    res.render("web/user/forgot-password", {
        layout: false
    });
};


module.exports = {
    loginPage,
    registerPage,
    forgotPassword
};