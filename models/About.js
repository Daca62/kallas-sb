const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, requited: true, unique: true },
  description: { type: String, required: true },
  number: { type: Number, required: false },
});

module.exports = mongoose.model("About", AboutSchema);
