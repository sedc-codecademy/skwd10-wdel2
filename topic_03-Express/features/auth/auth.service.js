const bcrypt = require("bcryptjs");
const User = require("./auth.model");

class AuthService {
  static async registerUser(email, password) {
    const user = await User.findOne({ email });
    if (user) {
      return Promise.reject({ message: "User already exists!" });
    }

    // Hash and salt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    try {
      // Create a new object based on the schema
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      return Promise.resolve({ email });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async loginUser(email, password) {
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return Promise.reject({ message: "User does not exist" });
      }

      // Check password validity
      const validPassword = await bcrypt.compare(password, foundUser.password);
      if (!validPassword) {
        Promise.reject({ message: "Password invalid!" });
      }

      // Object destructuring
      const { password: hashedPassword, ...userWithoutPassword } = foundUser;
      return userWithoutPassword;
    } catch (error) {
      Promise.reject(error);
    }
  }

  static async saveRefreshToken(userId, refreshToken) {
    // FindById() returns a query you need to execute
    const user = await User.findById(userId).exec();
    user.refreshTokens.push(refreshToken);
    await User.updateOne(
      { _id: userId },
      {
        $set: { refreshTokens: user.refreshTokens },
      }
    );
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async deleteRefreshToken(userId, refreshToken) {
    const user = await User.findById(userId).exec();
    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken
    );
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: { refreshTokens: user.refreshTokens },
      }
    );
  }
}

module.exports = AuthService;
