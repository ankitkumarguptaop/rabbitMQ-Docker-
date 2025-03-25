const products = require("../models/product");
const BaseRepository = require("./base.repository");

class ProductRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new ProductRepository({ model: products });
