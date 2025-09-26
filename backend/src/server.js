import express from "express";
import dotenv from "dotenv";
import path from "path";

// Import Lib
import { connectDB } from "./lib/db.js";

// Import Routes
import authRoute from "./routes/auth.routes.js";
import messsageRoute from "./routes/message.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/auth", messsageRoute);

// Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  try {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
  } catch (error) {
    console.log(error);
  }
});
