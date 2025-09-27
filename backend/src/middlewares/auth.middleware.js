import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const { JWT_SECRET } = ENV;

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Please login first" });

    if (!JWT_SECRET) {
      console.log("JWT_SECRET is not configured!");
      return res
        .status(500)
        .json({ success: false, message: "Server misconfiguration" });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      const msg =
        error.name === "TokenExpiredError"
          ? "Unauthorized - Token Expired"
          : "Unauthorized - Invalid Token";
      return res.status(401).json({ success: false, message: msg });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
