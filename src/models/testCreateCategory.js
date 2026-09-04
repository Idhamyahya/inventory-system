import pool from "../config/database.js";
import { createCategories } from "./categoryModel.js";

try {
  const categories = await createCategories("Makanan");
  console.log("Category berhasl dibuat");
  console.log(categories);
} catch (error) {
  console.error("Category gagal di buat");
  console.log(error.code);
  console.log(error.message);
} finally {
  await pool.end();
}
