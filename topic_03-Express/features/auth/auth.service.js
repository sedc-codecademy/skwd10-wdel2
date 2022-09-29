const bcrypt = require("bcryptjs");
const User = require("./auth.model");

class AuthService {
  static async registerUser(email, password) {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (user) {
      return Promise.reject({ message: "User already exists." });
    }

    // Hash and salt user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    try {
      await new User({ email, password: hashedPassword }).save();
      return Promise.resolve({ email });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async loginUser(email, password) {
    try {
      // Check if the user exists
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return Promise.reject({ message: "User does not exist." });
      }

      // Check password validity
      const validPassword = await bcrypt.compare(password, foundUser.password);
      if (!validPassword) {
        Promise.reject({ message: "Password invalid." });
      }

      // Remove password from the user object
      const { password: hashedPassword, ...userWithoutPassword } = foundUser;
      return userWithoutPassword;
    } catch (error) {
      Promise.reject(error);
    }
  }

  static async saveRefreshToken(userId, refreshToken) {
    const user = await User.findById(userId).exec();
    user.refreshTokens.push(refreshToken);
    await User.updateOne(
      { _id: userId },
      { $set: { refreshTokens: user.refreshTokens } }
    );
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async deleteRefreshToken(userId, refreshToken) {
    const user = await User.findById(userId);
    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken
    );
    await User.updateOne(
      { _id: userId },
      { $set: { refreshTokens: user.refreshTokens } }
    );
    return user;
  }
}

module.exports = AuthService;
