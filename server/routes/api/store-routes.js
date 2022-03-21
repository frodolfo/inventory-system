const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
  db.Store.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  db.Store.create({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:name", (req, res) => {
  db.Store.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

router.put("/:id", ({ body, params }, res) => {
  db.Store.findByIdAndUpdate(
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
