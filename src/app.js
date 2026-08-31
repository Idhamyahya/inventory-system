import express from "express";
import cors from "cors";
import pool from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    succes: true,
    message: "Inventory API berjalan",
  });
});

app.get("/api", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    res.status(200).json({
      succes: true,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: err.message,
    });
  }
});

export default app;
