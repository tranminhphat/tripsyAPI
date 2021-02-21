const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");
require("./models/Role");
require("./models/User");
const routes = require("./routes");

const whitelist = config.CORS_WHITELIST;
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

//Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", routes);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connect to MongoDB");
    app.listen(2004, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  })
  .catch((err) => console.error(err));
