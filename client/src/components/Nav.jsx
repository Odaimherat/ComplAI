import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ShieldCheck, Sun, Moon, Languages, Search } from "lucide-react";
import { solutions } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

/**
 * Site-wide top navigation.
 *
 * Two things worth knowing before editing this file:
 *  1. The "Solutions" dropdown renders `solutions` (from shared/solutions.js)
 *     in array order. GRC is first in that array on purpose - see
 *     shared/solutions.js and design-and-research-report.md section 2 for
 *     why the flagship product always leads the list, in the nav and
 *     everywhere else it's rendered.
 *  2. Every "left"/"right" positioned element here uses Tailwind's
 *     logical-property utilities (`start-`/`end-`, `ps-`/`pe-`) instead of
 *     `left-`/`right-`/`pl-`/`pr-`, so the dropdown and mobile menu mirror
 *     correctly when the page is rendered right-to-left in Arabic
 *     (`dir="rtl"` is set on <html> by LanguageContext).
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  const solutionName = (s) => (language === "ar" ? s.nameAr : s.name);
  const solutionTagline = (s) => (language === "ar" ? s.taglineAr : s.tagline);

  const NAV_LINKS = [
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.frameworks"), path: "/frameworks" },
    { label: t("nav.howAiWorks"), path: "/how-ai-works" },
    { label: t("nav.caseStudies"), path: "/case-studies" },
    { label: t("nav.pricing"), path: "/pricing" },
    { label: t("nav.resources"), path: "/resources" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg shrink-0">
          <ShieldCheck size={22} className="text-[var(--color-accent-strong)]" aria-hidden="true" />
          ComplAI
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              {t("nav.solutions")} <ChevronDown size={14} />
            </button>
            {solutionsOpen && (
              <div className="absolute top-full start-0 pt-2 w-80">
                <div className="card p-2 shadow-xl">
                  {solutions.map((s) => (
                    <Link
                      key={s.id}
                      to={s.path}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-[var(--color-surface-2)] transition-colors"
                    >
                      <span className="text-sm font-medium flex items-center gap-2">
                        {solutionName(s)}
                        {s.flagship && (
                          <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent-strong)] border border-[var(--color-accent-soft)] rounded px-1.5 py-0.5">
                            {t("nav.flagship")}
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">{solutionTagline(s)}</span>
                    </Link>
                  ))}
                  <Link
                    to="/solutions"
                    className="block text-center text-xs font-mono text-[var(--color-accent-strong)] mt-1 py-2 border-t border-[var(--color-border)]"
                  >
                    {t("nav.viewAllSolutions")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("complai:open-search"))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-faint)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-muted)] transition-colors"
          >
            <Search size={14} /> Search
            <kbd className="text-[10px] font-mono border border-[var(--color-border-strong)] rounded px-1 py-0.5">⌘K</kbd>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
            aria-label="Switch language"
            title="العربية / English"
          >
            <Languages size={16} /> {language === "en" ? "AR" : "EN"}
          </button>
          <Link to="/assistant" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors px-2">
            {t("common.askComplai")}
          </Link>
          <Link to="/contact" className="btn btn-primary">
            {t("common.bookDemo")}
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--color-text)]"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleLanguage} className="p-2 text-[var(--color-text)]" aria-label="Switch language">
            <Languages size={20} />
          </button>
          <button
            className="p-2 text-[var(--color-text)]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="container-page py-4 flex flex-col gap-1">
            <p className="eyebrow px-1 pt-2">{t("nav.solutions")}</p>
            {solutions.map((s) => (
              <Link key={s.id} to={s.path} className="px-1 py-2 text-sm">
                {solutionName(s)}
              </Link>
            ))}
            <div className="h-px bg-[var(--color-border)] my-2" />
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="px-1 py-2 text-sm">
                {link.label}
              </Link>
            ))}
            <Link to="/assistant" className="px-1 py-2 text-sm">
              {t("common.askComplai")}
            </Link>
            <Link to="/contact" className="btn btn-primary mt-3 justify-center">
              {t("common.bookDemo")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
