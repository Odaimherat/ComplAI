import mongoose from "mongoose";

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
