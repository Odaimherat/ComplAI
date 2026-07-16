import { Router } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import AuditLog from "../models/AuditLog.js";
import { isDbConnected } from "../config/db.js";

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

// The global API rate limiter (120 req/15min, see server.js) is generous
// enough that it does not meaningfully protect a password-guessing
// endpoint. This one is specific to /login: 10 attempts per 15 minutes
// per IP, which is enough for a real user who mistypes a password a few
// times but not enough to make brute-forcing a short password practical.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in a few minutes." },
});

router.post("/login", loginLimiter, async (req, res) => {
  const { password } = req.body || {};
  const ip = req.ip;

  if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
    logAudit("login_failure", ip, "Failed admin login attempt.");
    return res.status(401).json({ error: "Incorrect password." });
  }

  logAudit("login_success", ip, "Admin signed in.");
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: TOKEN_TTL });
  return res.json({ token, expiresIn: TOKEN_TTL });
});

/** Best-effort audit write - never throws, never blocks the calling route. */
export async function logAudit(action, ip, detail, metadata) {
  if (!isDbConnected()) return;
  try {
    await AuditLog.create({ action, ip, detail, metadata });
  } catch (err) {
    console.error("[admin] failed to write audit log:", err.message);
  }
}

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
