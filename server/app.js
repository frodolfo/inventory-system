const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(routes);
APP.use(logger("dev"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/retailstores", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    APP.listen(PORT, () => {
      console.log(`Inventory Manager server is running on port ${PORT}`);
    });
  });
