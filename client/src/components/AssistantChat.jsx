import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { sendAssistantMessage } from "../lib/api";
import { useLanguage } from "../context/LanguageContext";

// These stay in English on purpose, even when the site is in Arabic: the
// backend intent matcher in server/src/lib/assistantEngine.js matches on
// English keywords (see design-and-research-report.md section 10), so a
// translated suggestion button would silently fail to match any intent.
// The user can still type a question in Arabic; it will just fall
// through to the assistant's fallback response rather than a matched
// intent, which is why the Arabic UI shows assistant.englishNote.
const SUGGESTIONS = [
  "Am I ready for SOC 2?",
  "Do you offer penetration testing?",
  "What frameworks do you support?",
  "How much does this cost?",
];

/**
 * Core assistant chat UI, shared by the floating widget and the full
 * /assistant page. Talks to POST /api/assistant/chat, which runs the
 * rule-based engine in server/src/lib/assistantEngine.js - see that file
 * for how a message becomes a response.
 */
export default function AssistantChat({ compact = false }) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([{ role: "assistant", text: t("assistant.welcome"), actions: [] }]);
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
              <p dir="auto">{m.text}</p>
              {m.actions?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {m.actions.map((a) => (
                    <button
                      key={a.path}
                      onClick={() => navigate(a.path)}
                      className="text-xs font-mono border border-[var(--color-accent-soft)] text-[var(--color-accent-strong)] rounded px-2 py-1 hover:bg-[var(--color-accent-soft)] transition-colors"
                      dir="ltr"
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
              {t("assistant.thinking")}
            </div>
          </div>
        )}
        {language === "ar" && messages.length <= 1 && (
          <p className="text-xs text-[var(--color-text-faint)] italic">{t("assistant.englishNote")}</p>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2" dir="ltr">
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
          placeholder={t("assistant.inputPlaceholder")}
          className="input flex-1"
          dir="auto"
        />
        <button type="submit" className="btn btn-primary px-3" disabled={loading} aria-label="Send message">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
