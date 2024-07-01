const redis = require('redis');
const { REDIS_CONF } = require('../config/db');


const client = redis.createClient(REDIS_CONF);
client.connect()
    .then(() => {
        console.log("connect success")
    }).catch(err => console.log('Redis Client Error', err))

module.exports = client;
