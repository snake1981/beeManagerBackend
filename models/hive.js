const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiveSchema = new Schema(
  {
    name: {
      type: String,
    },
    tags: {
      type: Array,
    },
    locationId: {
      type: String,
    },
    status: {
      type: String,
    },
    queens: {
      type: Array,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Hive = mongoose.model("Hive", hiveSchema);

module.exports = Hive;
