const crypto = require('crypto');

// 密匙
const SECRET_KEY = 'smile_ping123#';

function md5(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

function generatePassword(password) {
    let str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}


module.exports = {
    generatePassword
}