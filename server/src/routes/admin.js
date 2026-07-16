import { Router } from "express";
import { requireAdmin, logAudit } from "./adminAuth.js";
import ContactSubmission from "../models/ContactSubmission.js";
import NewsletterSignup from "../models/NewsletterSignup.js";
import AssistantConversation from "../models/AssistantConversation.js";
import Subscription from "../models/Subscription.js";
import AuditLog from "../models/AuditLog.js";
import { isDbConnected } from "../config/db.js";

const router = Router();

// Every route below requires a valid admin token.
router.use(requireAdmin);

const NO_DB_RESPONSE = {
  connected: false,
  message: "No database configured (MONGODB_URI unset). Connect MongoDB to see real data here.",
};

/**
 * GET /api/admin/stats
 * Aggregated counts + small time series for the dashboard's charts.
 * All aggregation happens in Mongo (not pulled into memory and reduced
 * in JS), since these are the kinds of queries that need to scale with
 * real lead volume.
 */
router.get("/stats", async (req, res) => {
  if (!isDbConnected()) {
    return res.json({ ...NO_DB_RESPONSE });
  }

  try {
    const [leadCount, newsletterCount, subscriptionCount, statusBreakdown, leadsByDay, intentBreakdown, recentLeads] =
      await Promise.all([
        ContactSubmission.countDocuments(),
        NewsletterSignup.countDocuments(),
        Subscription.countDocuments({ status: "active" }),
        ContactSubmission.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
        ContactSubmission.aggregate([
          {
            $match: { createdAt: { $gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) } },
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),
        AssistantConversation.aggregate([
          { $unwind: "$messages" },
          { $match: { "messages.role": "assistant", "messages.intent": { $exists: true, $ne: null } } },
          { $group: { _id: "$messages.intent", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        ContactSubmission.find().sort({ createdAt: -1 }).limit(8).lean(),
      ]);

    return res.json({
      connected: true,
      leadCount,
      newsletterCount,
      subscriptionCount,
      statusBreakdown: statusBreakdown.map((s) => ({ status: s._id, count: s.count })),
      leadsByDay: leadsByDay.map((d) => ({ date: d._id, count: d.count })),
      intentBreakdown: intentBreakdown.map((i) => ({ intent: i._id, count: i.count })),
      recentLeads,
    });
  } catch (err) {
    console.error("[admin] stats query failed:", err.message);
    return res.status(500).json({ error: "Failed to load stats." });
  }
});

/** GET /api/admin/leads - paginated contact submissions, newest first. */
router.get("/leads", async (req, res) => {
  if (!isDbConnected()) return res.json({ ...NO_DB_RESPONSE, leads: [] });

  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, parseInt(req.query.limit, 10) || 20);

  try {
    const [leads, total] = await Promise.all([
      ContactSubmission.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ContactSubmission.countDocuments(),
    ]);
    return res.json({ connected: true, leads, total, page, limit });
  } catch (err) {
    console.error("[admin] leads query failed:", err.message);
    return res.status(500).json({ error: "Failed to load leads." });
  }
});

/** PATCH /api/admin/leads/:id - update a lead's status (new/contacted/closed). */
router.patch("/leads/:id", async (req, res) => {
  const { status } = req.body || {};
  if (!["new", "contacted", "closed"].includes(status)) {
    return res.status(400).json({ error: "status must be one of: new, contacted, closed." });
  }
  if (!isDbConnected()) return res.status(503).json({ error: "No database configured." });

  try {
    const previous = await ContactSubmission.findById(req.params.id).lean();
    const updated = await ContactSubmission.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: "Lead not found." });

    logAudit(
      "lead_status_change",
      req.ip,
      `Lead ${updated.email} status: ${previous?.status || "unknown"} -> ${status}`,
      { leadId: String(updated._id), previousStatus: previous?.status, newStatus: status }
    );

    return res.json({ ok: true, lead: updated });
  } catch (err) {
    console.error("[admin] lead update failed:", err.message);
    return res.status(500).json({ error: "Failed to update lead." });
  }
});

/** GET /api/admin/newsletter - all newsletter signups, newest first. */
router.get("/newsletter", async (req, res) => {
  if (!isDbConnected()) return res.json({ ...NO_DB_RESPONSE, signups: [] });
  try {
    const signups = await NewsletterSignup.find().sort({ createdAt: -1 }).limit(200).lean();
    return res.json({ connected: true, signups });
  } catch (err) {
    console.error("[admin] newsletter query failed:", err.message);
    return res.status(500).json({ error: "Failed to load newsletter signups." });
  }
});

/** GET /api/admin/subscriptions - mock billing records, newest first. */
router.get("/subscriptions", async (req, res) => {
  if (!isDbConnected()) return res.json({ ...NO_DB_RESPONSE, subscriptions: [] });
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 }).limit(200).lean();
    return res.json({ connected: true, subscriptions });
  } catch (err) {
    console.error("[admin] subscriptions query failed:", err.message);
    return res.status(500).json({ error: "Failed to load subscriptions." });
  }
});

/** GET /api/admin/audit-log - most recent admin actions, newest first. */
router.get("/audit-log", async (req, res) => {
  if (!isDbConnected()) return res.json({ ...NO_DB_RESPONSE, entries: [] });
  try {
    const entries = await AuditLog.find().sort({ createdAt: -1 }).limit(200).lean();
    return res.json({ connected: true, entries });
  } catch (err) {
    console.error("[admin] audit log query failed:", err.message);
    return res.status(500).json({ error: "Failed to load audit log." });
  }
});

export default router;
