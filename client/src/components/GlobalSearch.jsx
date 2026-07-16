import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, CornerDownLeft } from "lucide-react";
import { searchSite } from "../lib/searchIndex";

/**
 * Cmd/Ctrl+K command palette. Mounted once in Layout.jsx so it is
 * available from any page. Search runs entirely client-side against
 * lib/searchIndex.js - see that file for why this doesn't hit an API.
 */
export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchSite(query);

  useEffect(() => {
    function handleKeydown(e) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("complai:open-search", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("complai:open-search", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function go(path) {
    setOpen(false);
    navigate(path);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].path);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg card shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
          <Search size={16} className="text-[var(--color-text-faint)] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search frameworks, solutions, articles, pages..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button onClick={() => setOpen(false)} className="text-[var(--color-text-faint)]" aria-label="Close search">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query && results.length === 0 && (
            <p className="text-sm text-[var(--color-text-faint)] px-4 py-6 text-center">No results for &ldquo;{query}&rdquo;.</p>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.type}-${r.title}`}
              onClick={() => go(r.path)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors ${
                i === activeIndex ? "bg-[var(--color-surface-2)]" : ""
              }`}
            >
              <span className="text-sm truncate">{r.title}</span>
              <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-text-faint)] shrink-0">{r.type}</span>
            </button>
          ))}
          {!query && (
            <p className="text-xs text-[var(--color-text-faint)] px-4 py-4">
              Try &ldquo;SOC 2&rdquo;, &ldquo;pricing&rdquo;, or &ldquo;offensive security&rdquo;.
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-faint)] font-mono">
          <span className="flex items-center gap-1"><CornerDownLeft size={11} /> to select</span>
          <span>↑↓ to navigate</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
