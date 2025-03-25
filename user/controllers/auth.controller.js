const { authUserServices } = require("../services");

exports.signUp = async (req, res, next) => {
  try {
    const user = await authUserServices.signUp({
      body: req.body,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("unable to signup", error);
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { token, user } = await authUserServices.signIn({ body: req.body });
    const cookieOptions = {
      secure: true,
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.log("unable to signin", error);
    next(error);
  }
};
