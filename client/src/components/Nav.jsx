import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ShieldCheck } from "lucide-react";
import { solutions } from "../data/content";

const NAV_LINKS = [
  { label: "About", path: "/about" },
  { label: "Frameworks", path: "/frameworks" },
  { label: "How Our AI Works", path: "/how-ai-works" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Pricing", path: "/pricing" },
  { label: "Resources", path: "/resources" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
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
              Solutions <ChevronDown size={14} />
            </button>
            {solutionsOpen && (
              <div className="absolute top-full left-0 pt-2 w-80">
                <div className="card p-2 shadow-xl">
                  {solutions.map((s) => (
                    <Link
                      key={s.id}
                      to={s.path}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-[var(--color-surface-2)] transition-colors"
                    >
                      <span className="text-sm font-medium flex items-center gap-2">
                        {s.name}
                        {s.flagship && (
                          <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent-strong)] border border-[var(--color-accent-soft)] rounded px-1.5 py-0.5">
                            Flagship
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">{s.tagline}</span>
                    </Link>
                  ))}
                  <Link
                    to="/solutions"
                    className="block text-center text-xs font-mono text-[var(--color-accent-strong)] mt-1 py-2 border-t border-[var(--color-border)]"
                  >
                    View all solutions
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

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/assistant" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            Ask ComplAI
          </Link>
          <Link to="/contact" className="btn btn-primary">
            Book a demo
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-[var(--color-text)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="container-page py-4 flex flex-col gap-1">
            <p className="eyebrow px-1 pt-2">Solutions</p>
            {solutions.map((s) => (
              <Link key={s.id} to={s.path} className="px-1 py-2 text-sm">
                {s.name}
              </Link>
            ))}
            <div className="h-px bg-[var(--color-border)] my-2" />
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="px-1 py-2 text-sm">
                {link.label}
              </Link>
            ))}
            <Link to="/assistant" className="px-1 py-2 text-sm">
              Ask ComplAI
            </Link>
            <Link to="/contact" className="btn btn-primary mt-3 justify-center">
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
