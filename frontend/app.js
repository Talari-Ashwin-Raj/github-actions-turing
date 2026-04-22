const API = "http://localhost:3000";

// ── Status badge ──────────────────────────────────────────
async function checkStatus() {
  const badge = document.getElementById("status-badge");
  try {
    const res = await fetch(`${API}/`);
    const data = await res.json();
    if (data.status === "ok") {
      badge.textContent = "API online ✓";
      badge.className = "badge ok";
    }
  } catch {
    badge.textContent = "API offline ✗";
    badge.className = "badge fail";
  }
}

// ── Greet ─────────────────────────────────────────────────
document.getElementById("greet-btn").addEventListener("click", async () => {
  const name = document.getElementById("greet-input").value.trim();
  const out  = document.getElementById("greet-result");
  if (!name) { setResult(out, "Please enter a name.", "fail"); return; }
  try {
    const res  = await fetch(`${API}/greet/${encodeURIComponent(name)}`);
    const data = await res.json();
    setResult(out, data.message, "ok");
  } catch {
    setResult(out, "Could not reach API. Is the server running?", "fail");
  }
});

// ── Add ───────────────────────────────────────────────────
document.getElementById("add-btn").addEventListener("click", async () => {
  const a   = parseFloat(document.getElementById("add-a").value);
  const b   = parseFloat(document.getElementById("add-b").value);
  const out = document.getElementById("add-result");
  if (isNaN(a) || isNaN(b)) { setResult(out, "Please enter two numbers.", "fail"); return; }
  try {
    const res  = await fetch(`${API}/add`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ a, b }),
    });
    const data = await res.json();
    setResult(out, `${a} + ${b} = ${data.result}`, "ok");
  } catch {
    setResult(out, "Could not reach API. Is the server running?", "fail");
  }
});

// ── Helpers ───────────────────────────────────────────────
function setResult(el, text, type) {
  el.textContent = text;
  el.className   = `result ${type}`;
}

// ── Init ──────────────────────────────────────────────────
checkStatus();
setInterval(checkStatus, 10_000);
