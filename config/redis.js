const redis = require('async-redis');
const redisClient = redis.createClient({
    retry_strategy: function(options) {
        if (options.error.code === "ECONNREFUSED" || options.attempt > 5 || options.total_retry_time > 1000 * 60 * 60) {
            return new Error("Stop retry");
        }
        return Math.min(options.attempt * 100, 3000); // delay between retry attempts increases with each attemp
    }
});

redisClient.on('ready', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (error) => {
    console.error(`Redis client failed to connect due to: ${error}`);
});

module.exports = { redisClient };