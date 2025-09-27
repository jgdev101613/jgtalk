import express from "express";

// Import Controllers
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";

// Import Middlewares
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const authRoute = express.Router();

// authRoute.use(arcjetProtection);

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.put("/update-profile", protectRoute, updateProfile);
authRoute.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default authRoute;
