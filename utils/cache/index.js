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
        await redis
            .get(key)
            .then((data) => {
                return JSON.parse(data);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    set: async (key, value) => {
        return await redis.set(key, JSON.stringify(value), "EX", 3600);
    },
    delete: async (key) => {
        return await redis.del(key);
    },
};

module.exports = { cache };
