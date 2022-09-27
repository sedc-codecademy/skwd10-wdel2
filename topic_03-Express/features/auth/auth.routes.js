const router = require("express").Router();
const userValidator = require("../../middleware/user-validator.middleware");
const AuthController = require("./auth.controller");

// localhost:3000/api/auth/register
router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/:id/logout", AuthController.logoutUser);

module.exports = router;
