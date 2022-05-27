const { Roles } = require("../../middleware/auth");

const endPoint =
{
    deleteMessages: Roles.User
}

module.exports = endPoint