let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/retailstores", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let storesSeed = [
  {
    locations: [
      {
        name: "NorthEast",
        inventory: [
          {
            item: "Ketchup",
            price: 3.15,
            quantity: 10,
          },
          {
            item: "Milk",
            price: 2.6,
            quantity: 20,
          },
          {
            item: "Apple",
            price: 4.0,
            quantity: 50,
          },
        ],
      },
      {
        name: "SouthEast",
        inventory: [
          {
            item: "Apple",
            price: 4.0,
            quantity: 100,
          },
          {
            item: "Milk",
            price: 2.6,
            quantity: 40,
          },
        ],
      },
      {
        name: "SouthWest",
        inventory: [
          {
            item: "Ketchup",
            price: 3.15,
            quantity: 20,
          },
          {
            item: "Apple",
            price: 4.0,
            quantity: 20,
          },
        ],
      },
    ],
  },
];

db.Stores.deleteMany({})
  .then(() => db.Stores.collection.insertMany(storesSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
