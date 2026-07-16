import mongoose from "mongoose";

const ContactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    company: { type: String, trim: true, maxlength: 200 },
    companySize: { type: String, trim: true, maxlength: 50 },
    frameworksOfInterest: [{ type: String, trim: true }],
    message: { type: String, required: true, maxlength: 5000 },
    requestedDemo: { type: Boolean, default: false },
    demoSlot: { type: String, trim: true }, // mock "book a demo" slot label, e.g. "Tue Jul 21, 2:00 PM"
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactSubmission", ContactSubmissionSchema);
