import express from "express";
import { getCategories_C } from "../controllers/categoryController.js";

export const router = express.Router();

router.get("/", getCategories_C);
