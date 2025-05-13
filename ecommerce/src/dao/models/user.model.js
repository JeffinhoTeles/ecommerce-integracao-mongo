const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // pode ser vazio no caso de GitHub login
});

module.exports = mongoose.model("User", userSchema);
