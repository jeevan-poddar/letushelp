export const authConfig = {
  jwtSecret:
    process.env.JWT_SECRET ||
    "your-super-secret-jwt-key-change-this-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
};
