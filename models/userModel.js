const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please enter a valid Email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const matchPassword = await bcrypt.compare(password, this.password);
  return matchPassword;
};

UserSchema.methods.createJwtToken = async function () {
  return jwt.sign(
    { name: this.name, userId: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
