import express from "express";
import cookieParse from "cookie-parser";
import path from "path";
import cors from "cors";

// Import Lib
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

// Import Routes
import authRoute from "./routes/auth.routes.js";
import messsageRoute from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParse());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messsageRoute);

// Deployment
if (ENV.NODE_ENV === "production") {
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
