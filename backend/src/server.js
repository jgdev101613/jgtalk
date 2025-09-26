import express from "express";
import dotenv from "dotenv";

// Import Routes
import authRoute from "./routes/auth.routes.js";
import messsageRoute from "./routes/message.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoute);
app.use("/api/auth", messsageRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
