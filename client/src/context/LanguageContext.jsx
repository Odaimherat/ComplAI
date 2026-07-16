import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "complai-language";
const RTL_LANGUAGES = new Set(["ar"]);

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
}

/** Reads a dot-path like "nav.solutions" out of a nested object. */
function resolve(dict, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict);
}

/**
 * Provides `language`, `dir`, `toggleLanguage()`, and `t(path)` to the
 * app. Setting the language updates <html lang> and <html dir> directly,
 * which is what drives every RTL-aware CSS rule (see index.css and the
 * logical Tailwind utilities such as `ps-`/`pe-`/`start-`/`end-` used in
 * place of `pl-`/`pr-`/`left-`/`right-` throughout the layout
 * components), so the whole page mirrors correctly for Arabic without
 * per-component direction logic.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const dir = RTL_LANGUAGES.has(language) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language, dir]);

  function toggleLanguage() {
    setLanguage((l) => (l === "en" ? "ar" : "en"));
  }

  function t(path) {
    const value = resolve(translations[language], path) ?? resolve(translations.en, path);
    if (value === undefined) {
      console.warn(`[i18n] missing translation key: "${path}"`);
      return path;
    }
    return value;
  }

  return (
    <LanguageContext.Provider value={{ language, dir, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
