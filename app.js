const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dbURI =
  "mongodb+srv://phattran:Nguvodoi321@tripsyapi.dsnvq.mongodb.net/tripsy?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connect to MongoDB");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => console.error(err));
