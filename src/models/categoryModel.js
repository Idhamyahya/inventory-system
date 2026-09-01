import pool from "../config/database.js";

export const createCategory = async (name, description) => {
  const [result] = await pool.execute(
    `
    INSERT INTO categories (name,description)
    VALUES (?,?),
    
    `,
    [name, description],
  );

  return result;
};
