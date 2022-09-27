const AuthService = require("./auth.service");
const User = require("./auth.model");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../../const/jwt.const");

class AuthController {
  static async registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const registeredUser = await AuthService.registerUser(email, password);
      res.status(200).json({ message: "User successfully created!" });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.loginUser(email, password);
      const userId = user._doc._id.toString();

      // Create access token
      const accessToken = createAccessToken(userId);
      // Create refresh token
      const refreshToken = createRefreshToken(userId);

      // Save the refresh token in the database
      const passwordlessUser = await AuthService.saveRefreshToken(
        userId,
        refreshToken
      );

      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/refresh-token",
      });

      res.status(200).json({ passwordlessUser, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: "Login failed. Try again" });
    }
  }

  static async logoutUser(req, res) {
    try {
      // req.params contains the parameters from URL
      // http://localhost:3000/api/todos/1 <- this /1 can be set up as the ID
      const userId = req.params.id;
      const refreshToken = req.body.refreshToken;

      await AuthService.deleteRefreshToken(userId, refreshToken);
      res.status(200).json({ message: "User successfully logged out!" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = AuthController;
