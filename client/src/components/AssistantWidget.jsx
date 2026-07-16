import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import AssistantChat from "./AssistantChat";
import { useLanguage } from "../context/LanguageContext";

/**
 * Floating widget available on every page. Renders the same <AssistantChat>
 * used on the full /assistant page, just inside a popover shell, so there
 * is exactly one implementation of the chat UI and conversation logic.
 *
 * Positioned with logical `end-5` (not `right-5`) so it sits in the
 * bottom *trailing* corner regardless of text direction - bottom-right in
 * English, bottom-left in Arabic, matching where a reader's eye actually
 * lands last in each direction.
 */
export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 end-5 z-50 w-14 h-14 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-strong)] text-white flex items-center justify-center shadow-lg transition-colors"
        aria-label={open ? "Close ComplAI assistant" : "Open ComplAI assistant"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 end-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] card shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{t("assistant.widgetTitle")}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t("assistant.widgetSubtitle")}</p>
            </div>
            <Link to="/assistant" className="text-xs font-mono text-[var(--color-accent-strong)]" onClick={() => setOpen(false)}>
              {t("common.fullPage")}
            </Link>
          </div>
          <AssistantChat compact />
        </div>
      )}
    </>
  );
}
