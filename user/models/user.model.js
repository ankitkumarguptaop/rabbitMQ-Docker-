const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name not given"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email not given"],
    },
    password: {
      type: String,
      default: "xyz",
      required: [true, "Password not given"],
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

exports.User = mongoose.model("User", userSchema);