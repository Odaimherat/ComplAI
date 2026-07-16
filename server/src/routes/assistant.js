import { Router } from "express";
import { randomUUID } from "crypto";
import { getAssistantResponse } from "../lib/assistantEngine.js";
import AssistantConversation from "../models/AssistantConversation.js";
import { isDbConnected } from "../config/db.js";

const router = Router();

/**
 * POST /api/assistant/chat
 * Body: { message: string, sessionId?: string }
 *
 * Runs the message through the rule-based/retrieval assistant engine
 * (see server/src/lib/assistantEngine.js) and optionally logs the
 * exchange to Mongo for transcript history, purely best-effort: a logging
 * failure never blocks the chat response itself.
 */
router.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required." });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "message is too long." });
  }

  const response = getAssistantResponse(message);
  const currentSessionId = sessionId || randomUUID();

  if (isDbConnected()) {
    try {
      await AssistantConversation.findOneAndUpdate(
        { sessionId: currentSessionId },
        {
          $push: {
            messages: {
              $each: [
                { role: "user", text: message },
                { role: "assistant", text: response.text, intent: response.intent },
              ],
            },
          },
        },
        { upsert: true }
      );
    } catch (err) {
      console.error("[assistant] failed to log conversation:", err.message);
    }
  }

  return res.json({ ...response, sessionId: currentSessionId });
});

export default router;
