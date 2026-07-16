import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { sendAssistantMessage } from "../lib/api";

const SUGGESTIONS = [
  "Am I ready for SOC 2?",
  "Do you offer penetration testing?",
  "What frameworks do you support?",
  "How much does this cost?",
];

const WELCOME = {
  role: "assistant",
  text:
    "Hi, I'm the ComplAI assistant. Ask me about our GRC platform, SOC/MDR, Defensive or Offensive Security, specific compliance frameworks, or pricing, and I'll point you to the right place.",
  actions: [],
};

export default function AssistantChat({ compact = false }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendAssistantMessage(trimmed, sessionId);
      setSessionId(res.sessionId);
      setMessages((m) => [...m, { role: "assistant", text: res.text, actions: res.actions || [] }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Something went wrong reaching the assistant. Please try again in a moment.", actions: [] },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${compact ? "" : "min-h-[400px]"}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)]"
              }`}
            >
              <p>{m.text}</p>
              {m.actions?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {m.actions.map((a) => (
                    <button
                      key={a.path}
                      onClick={() => navigate(a.path)}
                      className="text-xs font-mono border border-[var(--color-accent-soft)] text-[var(--color-accent-strong)] rounded px-2 py-1 hover:bg-[var(--color-accent-soft)] transition-colors"
                    >
                      {a.label} &rarr;
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--color-text-muted)]">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="text-xs border border-[var(--color-border-strong)] rounded-full px-3 py-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent-strong)] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-[var(--color-border)] p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about frameworks, pricing, or our products..."
          className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-strong)]"
        />
        <button type="submit" className="btn btn-primary px-3" disabled={loading} aria-label="Send message">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
