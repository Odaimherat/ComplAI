import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";

/**
 * Every route except Home is lazy-loaded.
 *
 * Home ships in the main bundle since it's what nearly every visitor
 * loads first; every other page is a separate chunk that Vite only
 * downloads when the person actually navigates there. On a marketing
 * site where most sessions only ever touch two or three pages, this
 * keeps the initial JS payload meaningfully smaller than shipping all 14
 * routes up front - a real, measurable performance choice, not just a
 * pattern for its own sake.
 */
const About = lazy(() => import("./pages/About"));
const SolutionsIndex = lazy(() => import("./pages/SolutionsIndex"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));
const Frameworks = lazy(() => import("./pages/Frameworks"));
const HowAiWorks = lazy(() => import("./pages/HowAiWorks"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceArticle = lazy(() => import("./pages/ResourceArticle"));
const Contact = lazy(() => import("./pages/Contact"));
const Assistant = lazy(() => import("./pages/Assistant"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));
const TrustCenter = lazy(() => import("./pages/TrustCenter"));
const FrameworkCompare = lazy(() => import("./pages/FrameworkCompare"));
const NewsletterVerify = lazy(() => import("./pages/NewsletterVerify"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

/** Minimal, theme-aware placeholder shown while a lazy page chunk loads. */
function RouteFallback() {
  return (
    <div className="container-page py-32 flex justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-accent)] animate-spin" />
    </div>
  );
}

/**
 * Root component: sets up client-side routing and the two cross-cutting
 * providers every page relies on.
 *
 *  - ThemeProvider: light/dark mode, see src/context/ThemeContext.jsx
 *  - LanguageProvider: English/Arabic + RTL, see src/context/LanguageContext.jsx
 *
 * Both are plain React Context, no external state library, since the
 * only global state the app needs is "which theme" and "which language."
 */
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/solutions" element={<SolutionsIndex />} />
                <Route path="/solutions/:id" element={<SolutionDetail />} />
                <Route path="/frameworks" element={<Frameworks />} />
                <Route path="/how-ai-works" element={<HowAiWorks />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:slug" element={<ResourceArticle />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/checkout/:planId" element={<Checkout />} />
                <Route path="/trust-center" element={<TrustCenter />} />
                <Route path="/frameworks/compare" element={<FrameworkCompare />} />
                <Route path="/newsletter/verify/:token" element={<NewsletterVerify />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
