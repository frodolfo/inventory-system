const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
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
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const LocationSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const StoresSchema = new Schema(
  {
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
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

const Product = mongoose.model("Product", ProductSchema);
const Location = mongoose.model("Location", LocationSchema);
const Stores = mongoose.model("Stores", StoresSchema);

module.exports = { Product, Location, Stores };
