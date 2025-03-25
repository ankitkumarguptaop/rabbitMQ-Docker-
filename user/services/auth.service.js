const { userModel } = require("../models");
const jwt = require("jsonwebtoken");
const users = userModel.User;
const {
  ForBidden,
  UnAuthorized,
  BadRequest,
} = require("../libs/errors");
const Producer = require('../workers/producer')
const producer = new Producer()

exports.signUp = async (payload) => {
  const { name, password, email ,products } = payload.body;

  const user = await users.findOne({ email });

  if (user) {
    throw new ForBidden("User already signup!");
  } else {
    const signedUser =  await users.create({name, password, email});
    producer.publishMessage("Auth", {products,userId:signedUser._id}, "createProduct")
    return signedUser;
  }
};

function generateToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
}

exports.signIn = async (payload) => {
  const { body } = payload;
  const { email, password } = body;
  if (!email || !password) {
    const error = new BadRequest("data not given");
    throw error;
  }
  const user = await users.findOne({ email: email });

  if (!user) {
    throw new ForBidden("Need to register First!");
  }
  if (await user.matchPassword(password)) {
    producer.publishMessageFanout("", user, "notification")
    return { token: generateToken(user._id), user: user };
  } else {
    throw new UnAuthorized("Unauthorised access!");
  }
};

