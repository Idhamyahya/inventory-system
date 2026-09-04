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

export const createCategories = async (name) => {
  const [result] = await pool.query(
    `
    INSERT INTO categories (name)
    VALUES(?)
    `,
    [name],
  );

  return { id: result.insertId, name };
};

export const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT id,name,created_at,updated_at
    FROM categories
    WHERE id = ?
    `,
    [id],
  );

  return rows[0] || null;
};
