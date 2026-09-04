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
test("POST /api/categories harus membuat category", async () => {
  const name = `Integration Category ${Date.now()}`;

  const response = await request(app).post("/api/categories").send({
    name,
  });

  assert.strictEqual(response.status, 201);

  assert.strictEqual(response.body.success, true);

  assert.strictEqual(response.body.data.name, name);

  assert.ok(response.body.data.id);
});
test("GET /api/categories/:id harus mengembalikan category", async () => {
  const listResponse = await request(app).get("/api/categories");

  const categoryId = listResponse.body.data[0].id;

  const response = await request(app).get(`/api/categories/${categoryId}`);

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.success, true);
  assert.strictEqual(response.body.data.id, categoryId);
});
test("GET /api/categories/:id harus menghasilkan 404 jika tidak ditemukan", async () => {
  const response = await request(app).get("/api/categories/999999999");

  assert.strictEqual(response.status, 404);
});

// test("POST /api/categories harus menolak name kosong", async () => {
//   const response = await request(app).post("/api/categories").send({
//     name: "",
//   });

//   assert.strictEqual(response.status, 500);
// });

test.after(async () => {
  await pool.query(`
    DELETE FROM categories
    WHERE name LIKE 'Test Category %'
       OR name LIKE 'Service Category %'
       OR name LIKE 'Controller Category %'
       OR name LIKE 'Integration Category %'
    `);
  await pool.end();
});
