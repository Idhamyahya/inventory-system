import assert from "node:assert";
import test from "node:test";
import pool from "../src/config/database.js";
import { getAllCategories } from "../src/models/categoryModel.js";

const categories = await getAllCategories();

test("getAllCategories harus mengambil nilai array", async () => {
  //   const categories = await getAllCategories()
  assert.strictEqual(Array.isArray(categories), true);
});

test("getAlCategories harus mengembalikan data category", async () => {
  //   const categories = await getAllCategories();
  assert.ok(categories.length >= 1);
});

test("Setiap case harus memiliki id dan name", async () => {
  //   const categories = await getAllCategories();
  for (const category of categories) {
    assert.ok(category.id);
    assert.ok(category.name);
  }
});
test.after(async () => {
  await pool.end();
});
