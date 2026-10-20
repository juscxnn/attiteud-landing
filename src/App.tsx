import { useCallback, useEffect, useRef, useState } from "react";
import GridBackdrop from "./components/GridBackdrop";
import Navigation from "./sections/Navigation";
import Footer from "./sections/Footer";
import EntryView from "./views/EntryView";
import CompanyView from "./views/CompanyView";
import VenturesView from "./views/VenturesView";
import ContactView from "./views/ContactView";
import { parseViewHash, type ViewId } from "./views/types";

export default function App() {
  const [view, setView] = useState<ViewId>(parseViewHash);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const sync = () => setView(parseViewHash());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    const titles: Record<ViewId, string> = {
      index: "Attiteud — a small thing that makes a big difference.",
      company: "Company — Attiteud",
      ventures: "Ventures — Attiteud",
      contact: "Contact — Attiteud",
    };
    document.title = titles[view];
    window.scrollTo(0, 0);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const heading = document.querySelector<HTMLElement>(
      `#${view} [data-view-heading]`
    );
    heading?.focus({ preventScroll: true });
  }, [view]);

  const navigate = useCallback((next: ViewId) => {
    setView(next);

    const hash = next === "index" ? "" : `#${next}`;
    if (window.location.hash !== hash) {
      const url =
        next === "index"
          ? `${window.location.pathname}${window.location.search}`
          : hash;
      window.history.pushState(null, "", url);
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="site-shell">
      <GridBackdrop />

      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus({ preventScroll: true });
        }}
      >
        Skip to entry
      </a>

      <Navigation activeView={view} onNavigate={navigate} />

      <main id="main" className="view-shell" tabIndex={-1}>
        <EntryView active={view === "index"} onNavigate={navigate} />
        <CompanyView active={view === "company"} />
        <VenturesView active={view === "ventures"} />
        <ContactView active={view === "contact"} />
      </main>

      <Footer />
    </div>
  );
}
