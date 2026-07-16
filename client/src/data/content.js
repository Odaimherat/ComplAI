// Thin re-export layer so pages import from "../data/content" rather than
// reaching across the project boundary directly. All real content lives in
// /shared, which is also consumed by the server (assistant knowledge base).
export * from "@shared/frameworks.js";
export * from "@shared/solutions.js";
export * from "@shared/pricing.js";
export * from "@shared/caseStudies.js";
export * from "@shared/blog.js";
export * from "@shared/company.js";
