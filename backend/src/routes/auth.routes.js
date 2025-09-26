import express from "express";

// Import Controllers
import { signup } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);

authRoute.get("/login", async (req, res) => {
  res.send("Login Endpoint");
});

authRoute.get("/logout", async (req, res) => {
  res.send("Logout Endpoint");
});

export default authRoute;
