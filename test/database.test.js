import test from "node:test";
import assert from "node:assert";

import pool from "../src/config/database.js";

test("database harus dapat menjalankan query ", async () => {
  const [rows] = await pool.query("SELECT 1 AS result");
  assert.strictEqual(rows[0].result, 1);
});

test("table categories harus tersedia", async () => {
  const [rows] = await pool.query(`
    SELECT TABLE_NAME
    from information_schema.tables
    WHERE table_schema = DATABASE()
    AND table_name = "categories"
    `);
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].TABLE_NAME, "categories");
});
test.after(async () => {
  await pool.end();
});
