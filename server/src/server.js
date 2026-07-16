import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import contactRouter from "./routes/contact.js";
import newsletterRouter from "./routes/newsletter.js";
import assistantRouter from "./routes/assistant.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "100kb" }));
app.use(morgan("dev"));

// Basic abuse protection on write/chat endpoints. Generous limits since
// this is a marketing site, not an authenticated app.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", apiLimiter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "complai-api", time: new Date().toISOString() });
});

app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/assistant", assistantRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[server] unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] ComplAI API listening on port ${PORT}`);
  });
}

start();
