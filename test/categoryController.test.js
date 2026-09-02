import test from "node:test";
import assert from "node:assert";

import { getCategories_C } from "../src/controllers/categoryController.js";
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

test.after(async () => {
  await pool.end();
});
