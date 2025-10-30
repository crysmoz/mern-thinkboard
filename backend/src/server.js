import dotenv from "dotenv";
dotenv.config(); // must be at the top!

import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ CORS Configuration (for both local + production)
// const allowedOrigins = [
//   "http://localhost:5173",                      // local dev
//   "https://mern-thinkboard-opal.vercel.app",    // your deployed frontend
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-thinkboard-opal.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// ✅ Middleware
app.use(express.json());
// app.use(rateLimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

// ✅ Serve static frontend (for production)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//   );
// }

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Server started on PORT:", PORT);
  });
});
