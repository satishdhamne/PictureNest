const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://satishdhamne13012:I6864lO6Q1cSIFMC@cluster0.dkf1i.mongodb.net/");

const userSchema = mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  image: String,
  discription: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }],
  contact: Number
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
