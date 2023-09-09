const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TODO");

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDB is not connected");
});

db.once("open", () => {
  console.log("MongoDB is connected");
});

module.exports = db;
