const { productServices } = require("../services");

exports.createProducts = async (payload) => {
  const response = await productServices.createProducts({body:payload});
  return response;
};

