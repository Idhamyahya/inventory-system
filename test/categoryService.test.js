import test from "node:test";
import assert from "node:assert";

import pool from "../src/config/database.js";
import {
  createCategory_S,
  getCategories,
  getCategoryById_S,
} from "../src/service/categoryService.js";

const categories = await getCategories();
test("getCategories harus mengembalikan nilai array", async () => {
  assert.strictEqual(Array.isArray(categories), true);
});

test("Service harus mengembalikan category", async () => {
  assert.ok(categories.length >= 1);
});

test("createCategoryService harus membuat category", async () => {
  const name = `Service Category ${Date.now()}`;
  const category = await createCategory_S(name);
  assert.ok(category.id);
  assert.strictEqual(category.name, name);
});

test("createCategoryService harus menolak membuat name kosong", async () => {
  await assert.rejects(
    async () => {
      await createCategory_S("");
    },
    {
      message: "Nama category wajib diisi",
      statusCode: 400,
    },
  );
});

test("getCategoryById_S harus mengembalikan category", async () => {
  const categories = await getCategories();
  const categoryId = categories[0].id;
  const category = await getCategoryById_S(categoryId);

  assert.ok(categoryId);
  assert.strictEqual(category.id, categoryId);
});
test("getCategoryById_S harus menghasilkan 404 jika category tidak ditemukan", async () => {
  await assert.rejects(
    async () => {
      await getCategoryById_S(999999999);
    },
    {
      message: "ID tidak ditemukan",
      statusCode: 404,
    },
  );
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
