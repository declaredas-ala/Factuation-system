const mongoose = require("mongoose");
// Define a Mongoose schema for the "user" entity
const userSchema = new mongoose.Schema({
  // Specific fields for user entity
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  role: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define toJSON option to remove password field from JSON representation of object
userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.code;
  },
};

// Define pre-save hook to hash password before saving

// Create a Mongoose model named "User" based on the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model to make it accessible from other modules
module.exports = User;
