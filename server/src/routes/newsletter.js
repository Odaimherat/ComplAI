import { Router } from "express";
import NewsletterSignup from "../models/NewsletterSignup.js";
import { isDbConnected } from "../config/db.js";

const router = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** POST /api/newsletter - subscribe an email to the Resources newsletter. */
router.post("/", async (req, res) => {
  const { email, source } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!isDbConnected()) {
    console.log("[newsletter] (no DB configured) signup:", email);
    return res.status(201).json({ ok: true, persisted: false });
  }

  try {
    const existing = await NewsletterSignup.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }
    await NewsletterSignup.create({ email, source: source || "website" });
    return res.status(201).json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[newsletter] failed to save signup:", err.message);
    return res.status(500).json({ error: "Could not save your subscription. Please try again." });
  }
});

export default router;
