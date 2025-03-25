const { productRepository } = require("../repositories");

const {
  ForBidden,
  UnAuthorized,
  BadRequest,
  NoContent,
} = require("../libs/errors");

exports.createProducts = async (payload) => {
  const { products, userId } = payload.body;
  const allProducts = products.map((product) => {
    return {
      ...product,
      user_id: userId,
    };
  });
  const response = await productRepository.createBulk(allProducts);
  return response;
};

exports.listProduct = async () => {
  const response = await productRepository.findAll({});
  return response;
};
