const express = require("express");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));

let menuList = JSON.parse(fs.readFileSync("menu.json", "utf-8"));

app.get("/", (req, res) => {
  res.render("index", { menuList: menuList });
});

app.listen(5000, (req, res) => {
  console.log("server is listening at port 5000");
});
