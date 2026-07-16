import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import AssistantWidget from "./AssistantWidget";

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
    </div>
  );
}
