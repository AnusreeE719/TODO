import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js'

import { connectDB } from './config/db.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 2026;

const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", todoRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static build
  app.use(express.static(path.join(__dirname, "Frontend", "dist")));

  // Any non-API route -> serve index.html
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
  });
}

// app.get('/', (req, res) => {
//     console.log(req);
//     return res.status(234).send('Welcome to MERN stack todo project');
// })

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});