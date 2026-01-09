import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js'

import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 2026;

app.use("/api/auth", authRoutes);
app.use("/api/tasks", todoRoutes);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN stack todo project');
})

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});