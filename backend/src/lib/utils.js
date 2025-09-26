import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // Prevent XSS attacks: cross-site scripting
    sameSite: "strict", // Prevent CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
