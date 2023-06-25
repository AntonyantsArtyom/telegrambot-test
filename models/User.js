const Mongoose = require("mongoose")
const { Schema } = require("mongoose")

const User = new Schema({
   username: { type: String, required: true, unique: true },
   fatherRef: { type: String, default: "None" },
   chat: { type: String },
   weekPromoton: { type: String, default: "None" },
   friendPromotion: {
      type: String,
      default: "None",
   },
   refs: [{ type: String, ref: "User" }],
})

module.exports = Mongoose.model("User", User, "users")
