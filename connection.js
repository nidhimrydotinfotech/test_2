const mongoose = require("mongoose");

const dbConnection = mongoose.connect("mongodb://localhost:27017/test");

module.exports = dbConnection;