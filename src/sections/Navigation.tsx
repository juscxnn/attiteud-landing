import { useEffect, useRef, useState } from "react";
import Wordmark from "../components/Wordmark";

const links = [
  { label: "Company", href: "#company" },
  { label: "Ventures", href: "#ventures" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      let dark = false;
      document.querySelectorAll<HTMLElement>('[data-tone="dark"]').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 38 && rect.bottom > 38) dark = true;
      });
      setOnDark(dark);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
      if (window.innerWidth > 840) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={[
          "site-header",
          scrolled ? "is-scrolled" : "",
          onDark ? "is-dark" : "",
          menuOpen ? "is-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header-inner">
          <Wordmark onClick={() => setMenuOpen(false)} />

          <nav className="desktop-nav" aria-label="Primary">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
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
        className={[
          "mobile-menu",
          menuOpen ? "is-open" : "",
          onDark ? "is-dark" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
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
