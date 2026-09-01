import test from "node:test";
import assert from "node:assert";
import request from "supertest";

import app from "../src/app.js";

test("GET /health harus mengembalikan status 200", async () => {
  const response = await request(app).get("/health");
  assert.strictEqual(response.status, 200);
});
