import { frameworks } from "@shared/frameworks.js";
import { solutions } from "@shared/solutions.js";
import { articles } from "@shared/blog.js";

/**
 * Builds a flat, client-side search index once at module load. This is
 * intentionally not a search service or API call - the whole site's
 * content is small enough (a few dozen entries) that indexing it in the
 * browser is both simpler and faster than a network round-trip, and it
 * means the search works even if the API is unreachable.
 */
function buildIndex() {
  const entries = [
    { type: "Page", title: "Home", path: "/", keywords: "home compliance ai continuous" },
    { type: "Page", title: "About", path: "/about", keywords: "about mission team leadership story" },
    { type: "Page", title: "Solutions overview", path: "/solutions", keywords: "solutions products platform" },
    { type: "Page", title: "How Our AI Works", path: "/how-ai-works", keywords: "ai model evidence risk scoring triage" },
    { type: "Page", title: "Case Studies", path: "/case-studies", keywords: "case study customer results metrics" },
    { type: "Page", title: "Pricing", path: "/pricing", keywords: "pricing plans cost tiers starter business enterprise" },
    { type: "Page", title: "Resources", path: "/resources", keywords: "blog articles resources" },
    { type: "Page", title: "Contact", path: "/contact", keywords: "contact demo sales talk" },
    { type: "Page", title: "Ask ComplAI", path: "/assistant", keywords: "assistant chat ai help" },
    { type: "Page", title: "Trust Center", path: "/trust-center", keywords: "trust security status sub-processors certifications" },
    { type: "Page", title: "Privacy Policy", path: "/privacy", keywords: "privacy legal data" },
    { type: "Page", title: "Terms of Service", path: "/terms", keywords: "terms legal service" },
  ];

  solutions.forEach((s) => {
    entries.push({
      type: "Solution",
      title: s.name,
      path: s.path,
      keywords: `${s.shortName} ${s.tagline} solution product`,
    });
  });

  frameworks.forEach((f) => {
    entries.push({
      type: "Framework",
      title: f.fullName,
      path: "/frameworks",
      keywords: `${f.name} ${f.category} framework compliance`,
    });
  });

  articles.forEach((a) => {
    entries.push({
      type: "Article",
      title: a.title,
      path: `/resources/${a.slug}`,
      keywords: `${a.category} ${a.excerpt} article blog`,
    });
  });

  return entries;
}

export const searchIndex = buildIndex();

export function searchSite(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter((entry) => `${entry.title} ${entry.keywords}`.toLowerCase().includes(q))
    .slice(0, 8);
}
