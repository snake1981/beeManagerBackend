const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queenSchema = new Schema(
  {
    hiveId: {
      type: String,
    },
    tags: {
      type: Array,
    },
    number: {
      type: Number,
    },
    status: {
      type: String,
    },
    hatchYear: {
      type: Number,
    },
    pedigree: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Queen = mongoose.model("Queen", queenSchema);

module.exports = Queen;
