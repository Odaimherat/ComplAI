const BASE = "/api/admin";
const TOKEN_KEY = "complai-admin-token";

/**
 * Admin API client. Token is kept in sessionStorage (not localStorage)
 * on purpose: it clears when the browser tab closes, which is a
 * reasonable default for an internal tool token even in a portfolio
 * build where the "real" hardening (short-lived refresh tokens, secure
 * httpOnly cookies) is out of scope.
 */
export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminRequest(path, options = {}) {
  const token = getAdminToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearAdminToken();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Admin request failed.");
  }
  return data;
}

export async function adminLogin(password) {
  const res = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Login failed.");
  setAdminToken(data.token);
  return data;
}

export function getStats() {
  return adminRequest("/stats");
}

export function getLeads(page = 1) {
  return adminRequest(`/leads?page=${page}`);
}

export function updateLeadStatus(id, status) {
  return adminRequest(`/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
}

export function getNewsletterSignups() {
  return adminRequest("/newsletter");
}

export function getSubscriptions() {
  return adminRequest("/subscriptions");
}
