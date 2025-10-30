import dotenv from "dotenv";
dotenv.config(); // must be at the very top!

import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ CORS setup (for local + production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-thinkboard-opal.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle OPTIONS preflight for all routes
app.options("*", cors());

// ✅ Middleware
app.use(express.json());
// (temporarily disabled for testing)
// app.use(rateLimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

// ✅ Static frontend for production (if needed later)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Server started on PORT:", PORT);
  });
});
