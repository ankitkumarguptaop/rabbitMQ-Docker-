const express = require("express");
const { productControllers } = require("../controllers");
const router = express.Router();

router.get("/", productControllers.listProducts);
router.post("/", productControllers.createProducts);
module.exports = router;
