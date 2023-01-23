const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../Errors");

const authorization = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Unauthorized("Invalid authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new Unauthorized("Invalid authorization header");
  }
};

module.exports = authorization;
