import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import pool from "../src/config/database.js";
import app from "../src/app.js";

test("GET /api/categories harus mengembalikan status 200", async () => {
  const response = await request(app).get("/api/categories");

  assert.strictEqual(response.status, 200);
});

test("GET /api/categories harus mengembalikan success true", async () => {
  const response = await request(app).get("/api/categories");

  assert.strictEqual(response.body.success, true);
});

test("GET /api/categories harus mengembalikan data array", async () => {
  const response = await request(app).get("/api/categories");

  assert.strictEqual(Array.isArray(response.body.data), true);
});

test("GET /api/categories harus mengembalikan category Elektronik", async () => {
  const response = await request(app).get("/api/categories");

  const category = response.body.data.find(
    (item) => item.name === "Elektronik",
  );

  assert.ok(category);
});

test.after(async () => {
  await pool.end();
});
