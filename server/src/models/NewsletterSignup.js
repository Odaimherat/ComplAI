import mongoose from "mongoose";

/**
 * A newsletter subscription, written by POST /api/newsletter (see
 * server/src/routes/newsletter.js). `email` is unique at the schema
 * level so a duplicate signup is a no-op rather than a second row.
 *
 * Double opt-in: a signup starts `verified: false` with a random
 * `verificationToken`. GET /api/newsletter/verify/:token flips it to
 * `verified: true`. No real email is sent (see the route's doc comment
 * for what a real provider integration would replace) - the "sent"
 * verification link is returned directly in the signup response so the
 * flow is fully demoable without an inbox.
 */
const NewsletterSignupSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 320,
    },
    source: { type: String, trim: true, default: "website" }, // which page/section the signup came from
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("NewsletterSignup", NewsletterSignupSchema);
