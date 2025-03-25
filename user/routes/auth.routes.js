const express = require("express");
const { authUserControllers } = require("../controllers");
const router = express.Router();

router.post("/signin", authUserControllers.signIn);
router.post("/signup", authUserControllers.signUp);
module.exports = router;
