const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiveLogSchema = new Schema(
  {
    beeHiveId: {
      type: String,
    },
    tags: {
      type: Array,
    },
    annotation: {
      type: String,
    },
    date: {
      type: String,
    },
    queenSpoted: {
      type: Boolean,
    },
    steadily: {
      type: Number,
    },
    frames: {
      type: Array,
    },
    food: {
      type: Array,
    },
    meteorology: {
      type: Array,
    },
    varroa: {
      type: Array,
    },
  },
  { timestamps: true }
);

const HiveLog = mongoose.model("HiveLog", hiveLogSchema);

module.exports = HiveLog;
