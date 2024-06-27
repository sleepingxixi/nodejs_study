const redis = require('redis');
const { REDIS_CONF } = require('../config/db');


const client = redis.createClient(REDIS_CONF);

client.on('error', err => console.log('Redis Client Error', err));

(async function () {
    await client.connect();
    console.log(`Redis startup completed`);
    console.log(`Redis enabled status: ${client.isOpen}`)
})();


async function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    await client.set(key, value);
}

async function get(key) {
    const value = await client.get(key);
    if (value === null) {
        return value;
    }
    try {
        return JSON.parse(value)
    } catch (e) {
        return value;
    }
}
module.exports = {
    set,
    get
}
