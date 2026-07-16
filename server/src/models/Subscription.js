import mongoose from "mongoose";

/**
 * A mock subscription created by the self-serve checkout flow
 * (POST /api/billing/checkout, see server/src/routes/billing.js).
 *
 * No real payment is ever processed - see the doc comment on that route
 * for exactly what a real integration (e.g. Stripe) would replace here.
 * This model exists so the admin dashboard has real, queryable data to
 * show, and so the checkout flow round-trips through the database the
 * same way a real one would.
 */
const SubscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    planId: { type: String, required: true, enum: ["starter", "business", "enterprise"] },
    planName: { type: String, required: true },
    priceLabel: { type: String, required: true }, // e.g. "$799/month" - display only, not a real charge
    cardBrand: { type: String, trim: true }, // e.g. "Visa" - inferred from the mocked card number, never stored in full
    cardLast4: { type: String, trim: true, maxlength: 4 },
    mockInvoiceId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "canceled"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", SubscriptionSchema);
