import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * Admin auth, deliberately minimal.
 *
 * This is a single shared admin password (ADMIN_PASSWORD in .env),
 * not a real user-management system - there is exactly one admin
 * "account." That is an intentional scope decision for a portfolio
 * build: real multi-user auth (per-admin accounts, password hashing,
 * roles) is a substantial feature in its own right and out of scope
 * here. What *is* real: the login route issues a genuine signed JWT
 * (via the `jsonwebtoken` package) with a 12-hour expiry, and
 * `requireAdmin` below actually verifies that signature on every
 * protected request rather than trusting a client-side flag.
 *
 * To harden this for a real deployment: replace the single
 * ADMIN_PASSWORD check with a real user lookup + bcrypt password hash
 * comparison, and store JWT_SECRET somewhere more robust than a .env
 * file (e.g. a secrets manager).
 */
const JWT_SECRET = process.env.JWT_SECRET || "complai-dev-secret-change-me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "complai-admin";
const TOKEN_TTL = "12h";

router.post("/login", (req, res) => {
  const { password } = req.body || {};

  if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: TOKEN_TTL });
  return res.json({ token, expiresIn: TOKEN_TTL });
});

/** Express middleware: verifies the Bearer token on protected admin routes. */
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing admin token." });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired admin token." });
  }
}

export default router;
