const mongoose = require("mongoose");
const { ProductSchema } = require("./Product");

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    createDate: {
      type: Date,
    },
    lastUpdateDate: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      trim: true,
      required: "Enter the name of location.",
    },
    inventory: [ProductSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Helper methods
StoreSchema.virtual("addProduct").set(function (product) {
  this.inventory.push(product);
});
StoreSchema.virtual("totalInventory").get(function () {
  return this.inventory.length;
});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
