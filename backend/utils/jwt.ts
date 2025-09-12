import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.js";
import { authConfig } from "../config/auth.js";

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn,
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, authConfig.jwtSecret) as JWTPayload;
};
