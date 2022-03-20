const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// TODO: uncomment out line below once db issue is resolved
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(morgan("dev"));

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
// APP.use(express.static("public"));
// TODO: uncomment out line below once db issue is resolved
// APP.use(routes);
// TODO: delete line below once db issue is resolved
require("./routes/api-routes")(APP);

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
