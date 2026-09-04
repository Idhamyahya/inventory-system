import express from "express";
import {
  createCategory_C,
  getCategories_C,
  getCategoryById_C,
} from "../controllers/categoryController.js";

export const router = express.Router();

router.get("/api/categories", getCategories_C);
router.post("/api/categories", createCategory_C);
router.get("/api/categories/:id", getCategoryById_C);
