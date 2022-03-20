let mongoose = require("mongoose");
let db = require("../models/");

mongoose.connect("mongodb://localhost/retailstores", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let storesSeed = [
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
    createDate: Date.now(),
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
    createDate: Date.now(),
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
    createDate: Date.now(),
  },
];

//
db.Store.deleteMany({})
  .then(() => db.Store.collection.insertMany(storesSeed))
  .then((data) => {
    console.log(data.result.n + " stores added to collection.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error encountered: " + err);
    process.exit(1);
  });
