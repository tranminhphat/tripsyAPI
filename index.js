const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  })
  .catch((err) => console.error(err));
