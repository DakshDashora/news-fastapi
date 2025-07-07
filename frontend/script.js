const backendUrl = "https://news-fastapi-production.up.railway.app";
let currentMode = "";

function selectMode(mode) {
  currentMode = mode;
  document.getElementById("mode-title").style.display = "none";
  document.getElementById("input-section").classList.remove("hidden");
  document.getElementById("result-section").classList.add("hidden");

  const cards = document.querySelectorAll(".action-card");
  cards.forEach(card => {
    card.classList.remove("selected");
    if (!card.classList.contains(mode)) {
      card.style.display = "none";
    } else {
      card.classList.add("selected");
    }
  });

  const headings = {
    summarize: "Summarize your article",
    explain: "Explain your article",
    factcheck: "Fact check your article"
  };
  document.getElementById("input-heading").textContent = headings[mode];

  setTimeout(() => {
    document.getElementById("input-section").scrollIntoView({ behavior: "smooth" });
  }, 100);
}

function changeOption() {
  currentMode = "";
  document.getElementById("mode-title").style.display = "block";
  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("result-section").classList.add("hidden");

  document.querySelectorAll(".action-card").forEach(card => {
    card.style.display = "block";
    card.classList.remove("selected");
  });

  document.getElementById("article").value = "";
}

async function generate() {
  const content = document.getElementById("article").value.trim();
  if (!currentMode || !content) {
    alert("Please select an option and enter content.");
    return;
  }

  const spinner = document.getElementById("spinner");
  const result = document.getElementById("result");
  const resultSection = document.getElementById("result-section");

  result.textContent = "";
  spinner.classList.remove("hidden");
  resultSection.classList.remove("hidden");

  try {
    const res = await fetch(`${backendUrl}/${currentMode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    const data = await res.json();
    result.textContent = data.summary || data.explanation || data.claims || "✅ Done";
  } catch (err) {
    result.textContent = "❌ Error: " + err.message;
  } finally {
    spinner.classList.add("hidden");
  }
}

function copyResult() {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Copied to clipboard!");
  });
}

function exportResult(type) {
  const text = document.getElementById("result").textContent;
  if (!text) return alert("Nothing to export.");
  if (type === "txt") {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "result.txt";
    a.click();
  } else if (type === "pdf") {
    const win = window.open('', '', 'width=600,height=800');
    win.document.write(`<pre>${text}</pre>`);
    win.document.close();
    win.print();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const toggleBtn = document.getElementById("toggle-dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.innerText = "☀️ Light Mode";
  } else {
    toggleBtn.innerText = "🌙 Dark Mode";
  }
}
