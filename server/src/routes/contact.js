import { Router } from "express";
import ContactSubmission from "../models/ContactSubmission.js";
import { isDbConnected } from "../config/db.js";

const router = Router();

const DEMO_SLOTS = [
  "Tomorrow, 10:00 AM (your local time)",
  "Tomorrow, 2:00 PM (your local time)",
  "Thursday, 11:30 AM (your local time)",
  "Friday, 9:00 AM (your local time)",
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * POST /api/contact
 * Accepts a contact-form / demo-request submission.
 *
 * Persistence: stored in MongoDB when a database is configured. In place of
 * a paid transactional email provider, we return a mocked confirmation
 * (`emailSent: true`) instead of actually sending mail. To wire in a real
 * provider later: install the provider's SDK (e.g. Resend's free tier
 * supports 3,000 emails/month), call it here with the submission details,
 * and set `emailSent` based on the real API response.
 */
router.post("/", async (req, res) => {
  const { name, email, company, companySize, frameworksOfInterest, message, requestedDemo } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const demoSlot = requestedDemo
    ? DEMO_SLOTS[Math.floor(Math.random() * DEMO_SLOTS.length)]
    : undefined;

  let saved = null;
  if (isDbConnected()) {
    try {
      saved = await ContactSubmission.create({
        name,
        email,
        company,
        companySize,
        frameworksOfInterest: Array.isArray(frameworksOfInterest) ? frameworksOfInterest : [],
        message,
        requestedDemo: Boolean(requestedDemo),
        demoSlot,
      });
    } catch (err) {
      console.error("[contact] failed to save submission:", err.message);
      return res.status(500).json({ error: "Could not save your submission. Please try again." });
    }
  } else {
    console.log("[contact] (no DB configured) received submission:", { name, email, company });
  }

  // Mocked email confirmation - see doc comment above for how to make this real.
  return res.status(201).json({
    ok: true,
    emailSent: true,
    persisted: Boolean(saved),
    demoSlot: demoSlot || null,
    id: saved?._id || null,
  });
});

export default router;
