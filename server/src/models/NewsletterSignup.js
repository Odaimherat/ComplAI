import mongoose from "mongoose";

/**
 * A newsletter subscription, written by POST /api/newsletter (see
 * server/src/routes/newsletter.js). `email` is unique at the schema
 * level so a duplicate signup is a no-op rather than a second row.
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
  },
  { timestamps: true }
);

export default mongoose.model("NewsletterSignup", NewsletterSignupSchema);
