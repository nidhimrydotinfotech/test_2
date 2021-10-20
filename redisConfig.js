const redis = require("redis");
// const { client } = require("../index");

const REDIS_PORT = "6379"

const client = redis.createClient(REDIS_PORT);

module.exports = client;