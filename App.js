const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const url = require("./Routes/UrlRoute");

const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());

app.use(url);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then((result) => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Cannot connect to the database. Server not started");
  });
