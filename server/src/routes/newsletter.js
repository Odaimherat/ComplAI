import { Router } from "express";
import { randomBytes } from "crypto";
import NewsletterSignup from "../models/NewsletterSignup.js";
import { isDbConnected } from "../config/db.js";

const router = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * POST /api/newsletter - subscribe an email to the Resources newsletter.
 *
 * Double opt-in, mocked email delivery: a signup is created as
 * `verified: false` with a random token, and instead of actually
 * emailing a confirmation link (no paid email provider is wired up -
 * see the mocking note in contact.js for the same pattern), the link is
 * returned directly in the API response as `verifyUrl`. The client
 * shows it inline as a "here's your confirmation link (demo mode)"
 * affordance rather than pretending an email was delivered somewhere
 * nobody can see it. To make this real: call a provider (Resend's free
 * tier covers this comfortably) here instead of returning `verifyUrl`.
 */
router.post("/", async (req, res) => {
  const { email, source } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!isDbConnected()) {
    console.log("[newsletter] (no DB configured) signup:", email);
    return res.status(201).json({ ok: true, persisted: false, verified: false });
  }

  try {
    const existing = await NewsletterSignup.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.verified) {
        return res.status(200).json({ ok: true, alreadySubscribed: true, verified: true });
      }
      // Already signed up but not yet verified - resend the same token
      // rather than minting a new one, so an old link keeps working.
      return res.status(200).json({
        ok: true,
        alreadySubscribed: true,
        verified: false,
        verifyUrl: `/newsletter/verify/${existing.verificationToken}`,
      });
    }

    const verificationToken = randomBytes(20).toString("hex");
    await NewsletterSignup.create({ email, source: source || "website", verificationToken, verified: false });

    return res.status(201).json({
      ok: true,
      persisted: true,
      verified: false,
      verifyUrl: `/newsletter/verify/${verificationToken}`,
    });
  } catch (err) {
    console.error("[newsletter] failed to save signup:", err.message);
    return res.status(500).json({ error: "Could not save your subscription. Please try again." });
  }
});

/** GET /api/newsletter/verify/:token - confirms a pending signup. */
router.get("/verify/:token", async (req, res) => {
  if (!isDbConnected()) {
    return res.status(503).json({ error: "No database configured." });
  }
  try {
    const signup = await NewsletterSignup.findOne({ verificationToken: req.params.token });
    if (!signup) {
      return res.status(404).json({ error: "This verification link is invalid or has expired." });
    }
    if (!signup.verified) {
      signup.verified = true;
      await signup.save();
    }
    return res.json({ ok: true, email: signup.email, verified: true });
  } catch (err) {
    console.error("[newsletter] verification failed:", err.message);
    return res.status(500).json({ error: "Could not verify this subscription." });
  }
});

export default router;
