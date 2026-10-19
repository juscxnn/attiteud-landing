import { useEffect, useRef, useState } from "react";
import Wordmark from "../components/Wordmark";
import type { ViewId } from "../views/types";

const links: { label: string; view: ViewId; href: string }[] = [
  { label: "Company", view: "company", href: "#company" },
  { label: "Ventures", view: "ventures", href: "#ventures" },
  { label: "Contact", view: "contact", href: "#contact" },
];

interface NavigationProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export default function Navigation({
  activeView,
  onNavigate,
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const toggle = toggleRef.current;

    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusFrame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const select = (view: ViewId) => {
    setMenuOpen(false);
    onNavigate(view);
  };

  return (
    <>
      <header className={`site-header${menuOpen ? " is-open" : ""}`}>
        <div className="site-header-inner">
          <Wordmark onClick={() => select("index")} />

          <nav className="desktop-nav" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.view}
                href={link.href}
                className="nav-link"
                aria-current={activeView === link.view ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(link.view);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-label">
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className="menu-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {links.map((link, index) => (
            <a
              key={link.view}
              href={link.href}
              className="mobile-link"
              aria-current={activeView === link.view ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                select(link.view);
              }}
            >
              <span className="mobile-link-index" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="mobile-menu-foot">
          <a href="mailto:justin@attiteud.com">justin@attiteud.com</a>
          <span>Independent technology company</span>
        </div>
      </div>
    </>
  );
}
