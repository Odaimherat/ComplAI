import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import AssistantChat from "./AssistantChat";

/**
 * Floating widget available on every page. Renders the same <AssistantChat>
 * used on the full /assistant page, just inside a popover shell, so there
 * is exactly one implementation of the chat UI and conversation logic.
 */
export default function AssistantWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-strong)] text-white flex items-center justify-center shadow-lg transition-colors"
        aria-label={open ? "Close ComplAI assistant" : "Open ComplAI assistant"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] card shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">ComplAI Assistant</p>
              <p className="text-xs text-[var(--color-text-muted)]">Ask about frameworks, pricing, or our products</p>
            </div>
            <Link to="/assistant" className="text-xs font-mono text-[var(--color-accent-strong)]" onClick={() => setOpen(false)}>
              Full page
            </Link>
          </div>
          <AssistantChat compact />
        </div>
      )}
    </>
  );
}
