const redis = require('async-redis');
const redisClient = redis.createClient();

redisClient.on('ready', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (error) => {
    console.error(`Redis client failed to connect due to: ${error}`);
});

module.exports = { redisClient };