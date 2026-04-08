const API_URL = "https://your-api.onrender.com";

async function submitContact(name, email, message) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  });

  const data = await response.json();
  return data;
}
