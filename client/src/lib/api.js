const BASE = "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

export function submitContact(payload) {
  return request("/contact", { method: "POST", body: JSON.stringify(payload) });
}

export function subscribeNewsletter(payload) {
  return request("/newsletter", { method: "POST", body: JSON.stringify(payload) });
}

export function sendAssistantMessage(message, sessionId) {
  return request("/assistant/chat", { method: "POST", body: JSON.stringify({ message, sessionId }) });
}

export function checkout(payload) {
  return request("/billing/checkout", { method: "POST", body: JSON.stringify(payload) });
}
