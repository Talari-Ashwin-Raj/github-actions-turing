const request = require("supertest");
const { app, add, greet } = require("./index");

// ── Unit tests ──────────────────────────────────────────────

describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });

  test("adds floating point numbers", () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("greet()", () => {
  test("greets a valid name", () => {
    expect(greet("Alice")).toBe("Hello, Alice!");
  });

  test("trims whitespace from name", () => {
    expect(greet("  Bob  ")).toBe("Hello, Bob!");
  });

  test("returns fallback for empty name", () => {
    expect(greet("")).toBe("Hello, stranger!");
  });

  test("returns fallback for null", () => {
    expect(greet(null)).toBe("Hello, stranger!");
  });
});

// ── Integration tests ────────────────────────────────────────

describe("GET /", () => {
  test("returns status ok", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /greet/:name", () => {
  test("greets the given name", async () => {
    const res = await request(app).get("/greet/Carol");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello, Carol!");
  });
});

describe("POST /add", () => {
  test("returns the sum of two numbers", async () => {
    const res = await request(app)
      .post("/add")
      .send({ a: 4, b: 6 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(10);
  });

  test("returns 400 when inputs are not numbers", async () => {
    const res = await request(app)
      .post("/add")
      .send({ a: "four", b: 6 });
    expect(res.statusCode).toBe(400);
  });
});
