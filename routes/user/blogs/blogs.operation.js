const UsersModel = require("../../../models/Users.model");

const homePage = async (req, res) => {
    res.render("web/user/blogs/list-blog");
};

module.exports = {
    homePage
};