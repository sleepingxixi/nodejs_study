const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const filePath = path.join(__dirname, '../', '../', 'logs', 'access.log');
// 创建read stream
const readStream = fs.createReadStream(filePath);

//创建readline对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0;
let sum = 0;

rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }
    sum++;
    const dataArr = lineData.split(' -- ');
    if (dataArr[2] && dataArr[2].indexOf('Chrome') > -1) {
        chromeNum++;
    }

})

rl.on('close', () => {
    console.log('chrome result:' + chromeNum)
})