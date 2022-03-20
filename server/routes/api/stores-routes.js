const router = require("express").Router();
const { Stores } = require("../../models/Stores");

router.get("/", (req, res) => {
  console.log("Retrieving list of stores...");
  console.log("Stores: ", Stores);
  Stores.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  Stores.create({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/range", (req, res) => {
  Stores.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/range", (req, res) => {
  Stores.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", ({ body, params }, res) => {
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

module.exports = router;
