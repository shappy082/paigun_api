const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    location_id: { type: Number, required: true },
    tag: { type: Array },
    location_name: { type: String, required: true },
    location: [String]
  },
  {
    collection: "location_tb",
    versionKey: false
  }
);
const location = mongoose.model("location_tb", schema);

module.exports = location;
