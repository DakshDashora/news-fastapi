const backendUrl = "https://news-fastapi-production.up.railway.app"; // replace this with your actual backend URL

async function sendRequest(type) {
  const content = document.getElementById("article").value.trim();
  if (!content) return alert("Please enter some content first!");

  const endpoint = `${backendUrl}/${type}`;
  const responseBox = document.getElementById("result");
  responseBox.textContent = "Processing...";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    });

    if (!res.ok) throw new Error("Server returned " + res.status);

    const data = await res.json();
    responseBox.textContent =
      data.summary || data.explanation || data.claims || " Done (no output)";
  } catch (err) {
    responseBox.textContent = " Error: " + err.message;
  }
}
