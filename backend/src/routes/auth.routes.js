import express from "express";

const authRoute = express.Router();

authRoute.get("/signup", async (req, res) => {
  res.send("Sign up Endpoint");
});

authRoute.get("/login", async (req, res) => {
  res.send("Login Endpoint");
});

authRoute.get("/logout", async (req, res) => {
  res.send("Logout Endpoint");
});

export default authRoute;
