import mongoose from "mongoose";

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
