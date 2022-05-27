const { Roles } = require("../../middleware/auth");

const endPoint =
{
    profile: [Roles.User, Roles.Admin],
    displayMessages: Roles.User,
    deleteUser: [Roles.User, Roles.Admin],
    updateUser: Roles.User
}

module.exports = endPoint