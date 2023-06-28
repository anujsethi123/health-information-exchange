import bodyParser from "body-parser";

const express = require("express");
require("dotenv").config();
const apiRoutes = require("./routes/index");

const app = express();
const port = 5000;

app.use(
  bodyParser.urlencoded({
    extended: "true",
    limit: "50mb",
  })
); // parse application/x-www-form-urlencoded

app.use(
  bodyParser.json({
    limit: "50mb",
  })
); // parse application/json

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", apiRoutes.router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
