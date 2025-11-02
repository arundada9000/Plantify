import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "../env";
import { connectDB } from "./models/db";

// ---------- Routes ----------
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";
import {pomodoroRoutes} from "./routes/promodora.routes"; // <-- fixed name
import postRoutes from "./routes/postRoutes";
import plantRoutes from "./routes/plantRoutes";
import donationRoutes from "./routes/donationRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import challengeRoutes from "./routes/challengeRoutes";
import adminRoutes from "./routes/adminRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import uploadRoutes from "./routes/uploadRoutes";

// import { createAuth } from "./auth"; 

dotenv.config();

const app = express();

// ---------- DB ----------
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // ---------- Middleware ----------
  app.use(
  cors({
    origin: function (origin, callback) {
      console.debug(`Origin: ${origin}`);
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


    app.use(express.json());
    app.use(cookieParser());

    // createAuth(app);   // <-- enable when you have auth

    // ---------- Routes ----------
    app.use("/api/users", userRoutes);
    app.use("/api/files", fileRoutes);
    app.use("/api/pomodoro", pomodoroRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/plants", plantRoutes);
    app.use("/api/donations", donationRoutes);
    app.use("/api/partners", partnerRoutes);
    app.use("/api/challenges", challengeRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/sessions", sessionRoutes);
    app.use("/api/upload", uploadRoutes);

    // ---------- Listen ----------
    const PORT = env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();