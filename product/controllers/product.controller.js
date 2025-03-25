const { productServices } = require("../services");

exports.createProducts = async (req, res, next) => {
  try {
    const user = await productServices.createProducts({
      body: req.body,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("unable to create products", error);
    next(error);
  }
};

exports.listProducts = async (req, res, next) => {
  try {
    const user = await productServices.listProduct({
      body: req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("unable to list products", error);
    next(error);
  }
};
