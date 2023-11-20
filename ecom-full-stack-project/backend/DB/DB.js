const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/JEC-2023", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Failed to Connect With MongoDB");
});

db.once("open", () => {
  console.log("Successfully Connected With MongoDB");
});

module.exports = db;
