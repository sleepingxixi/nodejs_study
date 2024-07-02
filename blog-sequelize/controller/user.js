const { escape } = require("../db/seq");
const { generatePassword } = require("../utils/crypto");
const { User } = require('../db/model/User');

const login = async (username, password) => {

    const data = await User.findOne({
        where: {
            username,
            password,
        }
    });
    if (data == null) return null;
    return data.dataValues;
}
module.exports = {
    login,
}
