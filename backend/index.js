const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------- helper functions (tested separately) ----------

function add(a, b) {
  return a + b;
}

function greet(name) {
  if (!name || typeof name !== "string") return "Hello, stranger!";
  return `Hello, ${name.trim()}!`;
}

// ---------- routes ----------

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀", status: "ok" });
});

app.get("/greet/:name", (req, res) => {
  const message = greet(req.params.name);
  res.json({ message });
});

app.post("/add", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Both a and b must be numbers" });
  }
  res.json({ result: add(a, b) });
});

// ---------- start server (skip when running tests) ----------

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = { app, add, greet };
