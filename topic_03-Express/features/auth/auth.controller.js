const AuthService = require("./auth.service");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../../const/jwt.const");
const User = require("./auth.model");

class AuthController {
  static async registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const registeredUser = await AuthService.registerUser(email, password);
      res.status(200).json({ message: "User successfully created." });
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

      // Create and send the refresh token cookie to the client
      const refreshToken = createRefreshToken(userId);

      // Save the refresh token in the database
      await AuthService.saveRefreshToken(userId, refreshToken);

      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/refresh-token",
      });
      
      res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: "Login failed. Try again." });
    }
  }

  static async logoutUser(req, res) {
    try {
      const userId = req.params.id;
      const refreshToken = req.body.refreshToken;

      await AuthService.deleteRefreshToken(userId, refreshToken);
      res.status(200).json({ message: "User successfully logged out" });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token missing." });
      }
      const { userId } = verifyRefreshToken(refreshToken);
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        return res.status(403).json({ message: "User not found!" });
      }

      if (!foundUser.refreshTokens.some((token) => token === refreshToken)) {
        return res.status(403).json({ message: "Non authentic token." });
      }

      const accessToken = createAccessToken(userId);
      const newRefreshToken = createRefreshToken(userId);

      await AuthService.deleteRefreshToken(userId, refreshToken);

      await AuthService.saveRefreshToken(userId, newRefreshToken);

      res.status(200).send({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      res.status(403).json(error);
    }
  }
}

module.exports = AuthController;
