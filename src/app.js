import express from "express";
import pool from "./config/database.js";
import { router } from "./routes/categoryRoute.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/health/database", async (req, res) => {
  try {
    await pool.query("SELECT 1 AS result");
    res.status(200).json({
      success: true,
      message: "Database connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database not connected",
    });
  }
});

app.use("/", router);

export default app;
