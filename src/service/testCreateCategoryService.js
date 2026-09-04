import pool from "../config/database.js";

import { createCategory_S } from "./categoryService.js";

try {
  const category = await createCategory_S(`Service Test ${Date.now()}`);

  console.log("Service create berhasil");
  console.log(category);
} catch (error) {
  console.error("Service create gagal");
  console.error(error.message);
} finally {
  await pool.end();
}
