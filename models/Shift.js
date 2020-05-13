const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ShiftSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Shift = mongoose.model("shifts", ShiftSchema);
