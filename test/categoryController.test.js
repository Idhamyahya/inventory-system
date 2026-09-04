import test from "node:test";
import assert from "node:assert";

import {
  createCategory_C,
  getCategories_C,
} from "../src/controllers/categoryController.js";
import pool from "../src/config/database.js";

test("getCategoriesController harus mengembalikan status 200", async () => {
  let statusCode;
  let responseBody;

  const req = {};

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },

    json(data) {
      responseBody = data;
      return this;
    },
  };

  const next = (error) => {
    throw error;
  };

  await getCategories_C(req, res, next);

  assert.strictEqual(statusCode, 200);
});

test("getCategoriesController harus mengembalikan success true", async () => {
  let responseBody;

  const req = {};

  const res = {
    status(code) {
      return this;
    },

    json(data) {
      responseBody = data;
      return this;
    },
  };

  const next = (error) => {
    throw error;
  };

  await getCategories_C(req, res, next);

  assert.strictEqual(responseBody.success, true);
});

test("getCategoriesController harus mengembalikan data array", async () => {
  let responseBody;

  const req = {};

  const res = {
    status(code) {
      return this;
    },

    json(data) {
      responseBody = data;
      return this;
    },
  };

  const next = (error) => {
    throw error;
  };

  await getCategories_C(req, res, next);

  assert.strictEqual(Array.isArray(responseBody.data), true);
});

test("createCategoryController harus mengembalikan status 201", async () => {
  let statusCode;

  const req = {
    body: {
      name: `Controller Category ${Date.now()}`,
    },
  };

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },

    json(data) {
      return this;
    },
  };

  const next = (error) => {
    throw error;
  };

  await createCategory_C(req, res, next);

  assert.strictEqual(statusCode, 201);
});

test("createCategoryController harus meneruskan error ketika name kosong", async () => {
  let capturedError;

  const req = {
    body: {
      name: "",
    },
  };

  const res = {
    status(code) {
      return this;
    },

    json(data) {
      return this;
    },
  };

  const next = (error) => {
    capturedError = error;
  };

  await createCategory_C(req, res, next);

  assert.ok(capturedError);
  assert.strictEqual(capturedError.statusCode, 400);

  assert.strictEqual(capturedError.message, "Nama category wajib diisi");
});

test("getCategoryByIdController harus mengembalikan status 200", async () => {
  const categoryId = 1;

  let statusCode;
  let responseBody;

  const req = {
    params: {
      id: categoryId,
    },
  };

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },

    json(data) {
      responseBody = data;
      return this;
    },
  };

  const next = (error) => {
    throw error;
  };

  await getCategories_C(req, res, next);

  assert.strictEqual(statusCode, 200);
  assert.strictEqual(responseBody.success, true);
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
