const express = require("express");
const request = require("request");

const app = express();
app.set("view engine", "ejs");

// app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public/`));

// API endpoint
const apiUrl = "https://type.fit/api/quotes";
let randomQuote =
  "Don't let today's disappointments cast a shadow on tomorrow's dreams.";
let size, quote;

request(apiUrl, (err, response, body) => {
  quote = JSON.parse(body);
  size = quote.length;
});

app.get("/", (req, res) => {
  res.render("index", { quote: randomQuote });
});

app.post("/", (req, res) => {
  const randomValue = Math.trunc(Math.random() * size + 1);
  randomQuote = quote[randomValue].text;
  res.redirect("/");
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
