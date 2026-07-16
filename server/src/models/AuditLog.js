import mongoose from "mongoose";

/**
 * Records every admin authentication attempt and every mutating admin
 * action (e.g. changing a lead's status). This is what turns "there's a
 * password-protected dashboard" into "there's an accountable admin
 * dashboard" - for a compliance company's own internal tooling,
 * being able to answer "who changed this lead's status, and when" is
 * exactly the kind of audit trail the product itself sells.
 *
 * `actor` is deliberately just "admin" (see the honest single-admin-
 * account scope note in adminAuth.js) rather than a per-user identity -
 * a real multi-admin system would record the specific admin's ID here.
 */
const AuditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["login_success", "login_failure", "lead_status_change"],
    },
    actor: { type: String, default: "admin" },
    ip: { type: String, trim: true },
    detail: { type: String, trim: true, maxlength: 500 }, // human-readable summary, e.g. "lead 64f... -> contacted"
    metadata: { type: mongoose.Schema.Types.Mixed }, // structured extra fields (leadId, previousStatus, newStatus, ...)
  },
  { timestamps: true }
);

AuditLogSchema.index({ createdAt: -1 });

export default mongoose.model("AuditLog", AuditLogSchema);
