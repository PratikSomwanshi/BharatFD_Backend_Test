const Redis = require("ioredis");

const redis = new Redis({
    port: 6379,
    host: "127.0.0.1",
    username: "default",
    // password: "my-top-secret",
    db: 0,
});

const cache = {
    get: async (key) => {
        return await redis.get(key, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                return JSON.parse(result);
            }
        });
    },
    set: async (key, value) => {
        return await redis.set(key, JSON.stringify(value));
    },
    delete: async (key) => {
        return await redis.del(key);
    },
};

module.exports = { cache };
