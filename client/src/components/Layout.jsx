import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import AssistantWidget from "./AssistantWidget";
import GlobalSearch from "./GlobalSearch";

/**
 * Shared page shell rendered around every route (see the single <Route
 * element={<Layout />}> wrapper in App.jsx). Renders the nav, the routed
 * page content via <Outlet />, the footer, and the floating assistant
 * widget, and resets scroll position on every route change so navigating
 * to a new page doesn't preserve the previous page's scroll offset.
 */
export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AssistantWidget />
      <GlobalSearch />
    </div>
  );
}
