const fs = require('fs');
const path = require('path');

// 写入日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n');
}

// 创建write stream
function createWriteStream(fileName) {
    const filePath = path.join(__dirname, '../', '../', 'logs', fileName);
    const writeStream = fs.createWriteStream(filePath, {
        // 以追加的方式进行写入
        flags: 'a'
    })
    return writeStream;
}

const accessWriteStream = createWriteStream('access.log');

function access(log) {
    writeLog(accessWriteStream, log);
}

module.exports = {
    access
}