import assert from "node:assert";
import test from "node:test";
import pool from "../src/config/database.js";
import {
  createCategories,
  getAllCategories,
  getCategoryById,
} from "../src/models/categoryModel.js";

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
test("createCategory harus membuat category baru", async () => {
  const uniqueName = `Test Category ${Date.now()}`;
  const category = await createCategories(uniqueName);
  assert.ok(category.id);
  assert.strictEqual(category.name, uniqueName);
});

test("getCategoryById harus mengembalikan category berdasarkan id", async () => {
  const categories = await getAllCategories();
  const categoryId = categories[0].id;
  const category = await getCategoryById(categoryId);
  assert.ok(category);
  assert.strictEqual(category.id, categoryId);
});

test("getCategoryById harus mengembalikan null jika id tidak ditemukan", async () => {
  const category = await getCategoryById(9999999999);
  assert.strictEqual(category, null);
});

test.after(async () => {
  await pool.query(`
    DELETE FROM categories
    WHERE name LIKE 'Test Category %'
       OR name LIKE 'Service Category %'
       OR name LIKE 'Controller Category %'
    `);
  await pool.end();
});
