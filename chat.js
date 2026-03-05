async function askAI(message) {
  const res = await fetch("/ask", {   // ✅ fixed route
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  return data.reply;
}

document.getElementById("sendBtn").onclick = async () => {
  const inputField = document.getElementById("chatInput");
  const input = inputField.value.trim();

  if (!input) return;

  const outputDiv = document.getElementById("chatOutput");

  // Show user message
  outputDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;

  // Clear input immediately
  inputField.value = "";

  // Get AI reply
  const reply = await askAI(input);

  // Show AI reply
  outputDiv.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

  // Auto scroll
  outputDiv.scrollTop = outputDiv.scrollHeight;
};
