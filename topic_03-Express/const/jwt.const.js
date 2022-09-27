const { sign, verify } = require("jsonwebtoken");

// Real secrets are very long, and unreadable

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const verifyAccessToken = (accessToken) => {
  return verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
};
const verifyRefreshToken = (refreshToken) => {
  return verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
