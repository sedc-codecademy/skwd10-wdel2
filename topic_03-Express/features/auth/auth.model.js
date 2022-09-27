const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defines the database validation

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    // Qwerty1$ works
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  refreshTokens: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;