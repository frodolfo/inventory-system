const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StoresSchema = new Schema(
  {
    locations: [
      {
        createDate: {
          type: Date,
          default: Date.now,
        },
        lastUpdateDate: {
          type: Date,
          default: Date.now,
        },
        name: {
          type: String,
          trim: true,
          required: "Enter the name of store.",
        },
        inventory: [
          {
            item: {
              type: String,
              trim: true,
              required: "Enter the product name",
            },
            price: {
              type: Number,
              required: "Enter the list price of product",
            },
            quantity: {
              type: Number,
              required: "Enter number of quantity in stock",
            },
          },
        ],
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

StoresSchema.virtual("totalNumOfStores").get(() => this.locations.length);
StoresSchema.virtual("totalInventory").get(() =>
  this.locations.reduce(
    (prevLocation, currentLocation) =>
      prevLocation.inventory.length + currentLocation.inventory.length
  )
);

const Stores = mongoose.model("Stores", StoresSchema);

module.exports = Stores;
