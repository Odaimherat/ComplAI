import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import SolutionsIndex from "./pages/SolutionsIndex";
import SolutionDetail from "./pages/SolutionDetail";
import Frameworks from "./pages/Frameworks";
import HowAiWorks from "./pages/HowAiWorks";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import ResourceArticle from "./pages/ResourceArticle";
import Contact from "./pages/Contact";
import Assistant from "./pages/Assistant";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
