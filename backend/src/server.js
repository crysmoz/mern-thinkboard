import dotenv from "dotenv";
dotenv.config(); // must be at the top!

import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js"; // make sure this import is here
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ Middleware (order matters!)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());

// ✅ Add the rate limiter **before** your routes
app.use(rateLimiter);

// ✅ Then your routes
app.use("/api/notes", notesRoutes);

// ✅ Static files for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
