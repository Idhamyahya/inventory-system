import test from "node:test";
import assert from "node:assert";

import pool from "../src/config/database.js";
import { getCategories } from "../src/service/categoryService.js";

const categories = await getCategories();
test("getCategories harus mengembalikan nilai array", async () => {
  assert.strictEqual(Array.isArray(categories), true);
});

test("Service harus mengembalikan category", async () => {
  assert.ok(categories.length >= 1);
});
test.after(async () => {
  await pool.end();
});
