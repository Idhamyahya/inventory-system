import pool from "../config/database.js";

export const getAllCategories = async () => {
  const [rows] = await pool.query(
    `
    SELECT id,name,created_at,updated_at
    FROM categories
    ORDER BY id ASC
    `,
  );
  return rows;
};
