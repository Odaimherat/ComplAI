import { Router } from "express";
import { randomUUID } from "crypto";
import Subscription from "../models/Subscription.js";
import { isDbConnected } from "../config/db.js";
import { pricingTiers } from "../../../shared/pricing.js";

const router = Router();

/**
 * POST /api/billing/checkout
 * Body: { planId, name, email, cardNumber, expiry, cvc }
 *
 * This is a fully mocked checkout: no payment processor is contacted,
 * no money moves, and the card fields are validated for *shape* only
 * (length, Luhn checksum, not-expired) so the form behaves like a real
 * one without pretending to move real money. Only the card brand and
 * last 4 digits are ever persisted - never the full number, expiry, or
 * CVC, which mirrors how a real integration must behave (PCI DSS
 * explicitly prohibits storing full card numbers or CVCs, which is a
 * nice bit of dogfooding for a compliance company's own checkout page).
 *
 * To wire in a real processor: swap this handler's body for a call to
 * e.g. Stripe's PaymentIntents API (a free-tier-friendly, well-documented
 * option), and store the processor's subscription/customer ID here
 * instead of `mockInvoiceId`.
 */

function luhnCheck(num) {
  const digits = num.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function detectCardBrand(num) {
  const digits = num.replace(/\s+/g, "");
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "American Express";
  return "Card";
}

function isValidExpiry(expiry) {
  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(expiry || "");
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiryDate = new Date(year, month, 0); // last day of that month
  return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

router.post("/checkout", async (req, res) => {
  const { planId, name, email, cardNumber, expiry, cvc } = req.body || {};

  const plan = pricingTiers.find((t) => t.id === planId);
  if (!plan) {
    return res.status(400).json({ error: "Unknown plan." });
  }
  if (plan.price === "Custom") {
    return res.status(400).json({ error: "This plan requires talking to sales - use the contact form instead." });
  }
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }
  if (!cardNumber || !luhnCheck(cardNumber)) {
    return res.status(400).json({ error: "Card number looks invalid." });
  }
  if (!isValidExpiry(expiry)) {
    return res.status(400).json({ error: "Card expiry looks invalid or the card has expired." });
  }
  if (!cvc || !/^\d{3,4}$/.test(cvc)) {
    return res.status(400).json({ error: "CVC looks invalid." });
  }

  const digits = cardNumber.replace(/\s+/g, "");
  const mockInvoiceId = `INV-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;

  const record = {
    name,
    email,
    planId: plan.id,
    planName: plan.name,
    priceLabel: `${plan.price}${plan.period}`,
    cardBrand: detectCardBrand(digits),
    cardLast4: digits.slice(-4),
    mockInvoiceId,
  };

  let saved = null;
  if (isDbConnected()) {
    try {
      saved = await Subscription.create(record);
    } catch (err) {
      console.error("[billing] failed to save subscription:", err.message);
      return res.status(500).json({ error: "Could not complete checkout. Please try again." });
    }
  } else {
    console.log("[billing] (no DB configured) mock checkout:", record);
  }

  return res.status(201).json({
    ok: true,
    mockInvoiceId,
    plan: { id: plan.id, name: plan.name, priceLabel: record.priceLabel },
    cardBrand: record.cardBrand,
    cardLast4: record.cardLast4,
    persisted: Boolean(saved),
  });
});

export default router;
