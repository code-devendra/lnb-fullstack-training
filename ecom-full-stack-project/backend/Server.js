const express = require("express");
const bodyParser = require("body-parser");
const UserRouting = require("./Routes/UserRoutes");
const AdminRouting = require("./Routes/AdminRoutes");
const DB = require("./DB/DB");
const cors = require("cors");

const AddAdmin = require("./Controllers/AddAdmin");
const addDummyProducts = require("./Test-Data/Add-Dummy-Products");

const app = express();
const PORT = 8091;

app.use(cors());

app.use("/static", express.static(__dirname + "/images"));

addDummyProducts();

// app.use(function(req, res, next) {
//     let allowedOrigins = []; // list of url-s
//     let origin = req.headers.origin;
//     if (allowedOrigins.indexOf(origin) > -1) {
//      res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Expose-Headers', 'Content-Disposition');
//     next();
//    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRouting);
app.use("/admin", AdminRouting);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
