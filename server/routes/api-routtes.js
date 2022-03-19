const Stores = require("../models/stores");

module.exports = (app) => {
  app.get("/stores", (req, res) => {
    Stores.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/stores", (req, res) => {
    Stores.create({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/stores/range", (req, res) => {
    Stores.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/stores/range", (req, res) => {
    Stores.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/stores/:id", ({ body, params }, res) => {
    Stores.findByIdAndUpdate(
      params.id,
      { $push: { inventory: body } },
      { new: true, runValidators: true }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
