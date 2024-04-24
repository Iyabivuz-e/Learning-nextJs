import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // unique: true,
  },
  isVerifeid: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotpasswordToken: String,
  forgotpasswordTokenExpiry: Date,
  VerifyToken: String,
  VerifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User