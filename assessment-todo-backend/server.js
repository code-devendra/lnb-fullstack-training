const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8040;
require("./DB/taskDB");
const taskRoute = require("./Routes/taskRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/n1/tasks", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
