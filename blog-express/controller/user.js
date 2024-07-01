const { execSql, escape } = require("../db/mysql");
const { generatePassword } = require("../utils/crypto");

const login = (username, password) => {
    username = escape(username);
    password = generatePassword(password);
    password = escape(password);
    const sql = `
    select username,realname from users where username=${username} and password=${password};
    `;
    return execSql(sql).then(rows => {
        return rows[0] || {};
    })

}
module.exports = {
    login,
}