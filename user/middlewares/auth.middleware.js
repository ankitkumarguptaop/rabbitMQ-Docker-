const { UnAuthorized } = require("../libs/errors");
const { userModel } = require("../models");
const users = userModel.User;


exports.jwtTokenValidation = async (req, res, next) => {
  try {
    let token = req?.cookies?.jwt;
    if (token) {
      const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await users
      .findById(authenticatedUser._id)
      .select("-password");
    next();
      console.log("successfully authenticate");
    } else {
      throw new UnAuthorized("No Token");
    }
  } catch (error) {
     return  next(error)
  }
};