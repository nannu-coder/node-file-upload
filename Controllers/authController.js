const { BadRequestError, notFoundError } = require("../Errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!name || !password || !email) {
    throw new BadRequestError("Please Enter All Valid Filled");
  }

  const newUser = await User.create(req.body);

  if (!newUser) {
    throw new notFoundError("user not found");
  }

  const token = await newUser.createJwtToken();

  res
    .status(StatusCodes.CREATED)
    .json({ status: "Success", data: newUser, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter email & password");
  }

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }

  const passwordCorrect = await user.comparePassword(password);

  if (!passwordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = await user.createJwtToken();

  res.status(StatusCodes.OK).json({
    status: "Success",
    name: user.name,
    email: user.email,
    token: token,
  });
};

module.exports = {
  register,
  login,
};
