import mongoose from "mongoose";

/**
 * Connects to MongoDB using MONGODB_URI from the environment.
 *
 * This is a portfolio build with zero paid dependencies, so we do not want
 * a missing/unreachable database to crash the whole API: the marketing
 * pages, pricing, frameworks, and the rule-based assistant should all keep
 * working even with no DB configured. Only the contact form and newsletter
 * signup actually need persistence, and their routes check
 * `isDbConnected()` before writing.
 */
let connected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[db] MONGODB_URI not set - running without a database. " +
        "Contact form and newsletter signups will be accepted but not persisted. " +
        "Set MONGODB_URI (e.g. a free MongoDB Atlas cluster or local mongod) to enable storage."
    );
    return;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    connected = true;
    console.log("[db] connected to MongoDB");
  } catch (err) {
    console.error("[db] failed to connect, continuing without persistence:", err.message);
    connected = false;
  }
}

export function isDbConnected() {
  return connected || mongoose.connection.readyState === 1;
}
