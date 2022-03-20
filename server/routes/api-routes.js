const db = require("../models");

module.exports = (app) => {
  app.get("/api/stores", (req, res) => {
    db.Store.find()
      .then((data) => {
        console.log("DIRECT GET data: ", data);
        res.json(data);
      })
      .catch((err) => res.json(err));
  });
};
