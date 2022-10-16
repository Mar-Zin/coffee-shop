const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    notify: { type: String, enum: ["yes", "no"] },
    cart: { type: Array },
    favorites: { type: Array },
    roles: { type: String, ref: "Role" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
