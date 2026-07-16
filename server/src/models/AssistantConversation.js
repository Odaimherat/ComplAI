import mongoose from "mongoose";

/**
 * Stores AI assistant chat transcripts, keyed by a client-generated
 * `sessionId` (see server/src/routes/assistant.js). Purely for
 * quality/analytics purposes - logging failures never block a chat
 * response, and the app works fine with this collection empty or with
 * no database configured at all.
 */
const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    text: { type: String, required: true, maxlength: 4000 },
    intent: { type: String, trim: true }, // which intent the engine matched, for debugging/analytics
  },
  { _id: false, timestamps: true }
);

const AssistantConversationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("AssistantConversation", AssistantConversationSchema);
