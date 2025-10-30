import dotenv from "dotenv";
dotenv.config(); // must be first!

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

/* ---------- CORS FIX ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-thinkboard-opal.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
/* ---------- END CORS FIX ---------- */

app.use(express.json());

// ✅ API Routes
app.use("/api/notes", notesRoutes);

// ❌ Removed frontend static serving (since handled by Vercel)

// ✅ Start backend server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on PORT: ${PORT}`);
  });
});
