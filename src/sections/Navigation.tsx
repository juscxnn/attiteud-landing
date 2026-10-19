import { useEffect, useRef, useState } from "react";
import Wordmark from "../components/Wordmark";
import type { ViewId } from "../views/types";

const views: { id: ViewId; label: string }[] = [
  { id: "index", label: "Index" },
  { id: "company", label: "Company" },
  { id: "ventures", label: "Ventures" },
  { id: "contact", label: "Contact" },
];

interface NavigationProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export default function Navigation({
  activeView,
  onNavigate,
}: NavigationProps) {
  const [open, setOpen] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const current =
    views.find((view) => view.id === activeView)?.label ?? "Index";

  useEffect(() => {
    if (!open) return;

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const toggle = toggleRef.current;

    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusFrame = window.requestAnimationFrame(() => {
      const activeLink = islandRef.current?.querySelector<HTMLAnchorElement>(
        '.island-link[aria-current="page"]'
      );
      const firstLink =
        islandRef.current?.querySelector<HTMLAnchorElement>(".island-link");
      (activeLink ?? firstLink)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);

  const select = (view: ViewId) => {
    setOpen(false);
    onNavigate(view);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Wordmark onClick={() => select("index")} />
      </div>

      <div
        ref={islandRef}
        className={`nav-island${open ? " is-open" : ""}`}
      >
        <button
          ref={toggleRef}
          type="button"
          className="island-toggle"
          aria-expanded={open}
          aria-controls="island-menu"
          aria-label={`${open ? "Close" : "Open"} navigation, ${current}`}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="island-dot" aria-hidden="true" />
          <span className="island-current">{current}</span>
          <span className="island-icon" aria-hidden="true" />
        </button>

        <div
          id="island-menu"
          className="island-menu"
          aria-hidden={!open}
          inert={!open}
        >
          {views.map((view) => (
            <a
              key={view.id}
              href={view.id === "index" ? "#index" : `#${view.id}`}
              className="island-link"
              aria-current={activeView === view.id ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                select(view.id);
              }}
            >
              <span>{view.label}</span>
              <span className="island-link-mark" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="island-backdrop"
          tabIndex={-1}
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
