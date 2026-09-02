import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import pool from "../src/config/database.js";
import app from "../src/app.js";

test("GET /health harus mengembalikan status 200", async () => {
  const response = await request(app).get("/health");
  assert.strictEqual(response.status, 200);
});
test("GET /health/database harus mengembalikan status 200", async () => {
  const response = await request(app).get("/health/database");
  assert.strictEqual(response.status, 200);
});
test("GET /health/database harus mengembalikan succes true", async () => {
  const response = await request(app).get("/health/database");
  assert.strictEqual(response.body.success, true);
});
test.after(async () => {
  await pool.end();
});
