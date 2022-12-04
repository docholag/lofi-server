const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

//middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to database
db.connect();

//import routes
const chillRoute = require("./routes/chill");
const jazzyRoute = require("./routes/jazzy");
const sleepRoute = require("./routes/sleep");

app.use("/api/chill/", chillRoute);
app.use("/api/jazzy/", jazzyRoute);
app.use("/api/sleep/", sleepRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("We are on home");
});

//start listening to the server
app.listen(8080);
