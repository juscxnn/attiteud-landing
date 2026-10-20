import { useEffect, useRef, useState } from "react";
import Wordmark from "../components/Wordmark";

const links = [
  { label: "Company", href: "#company", id: "company" },
  { label: "Ventures", href: "#ventures", id: "ventures" },
  { label: "Contact", href: "#contact", id: "contact" },
];

type HeaderTheme = "dark" | "light";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme>("dark");
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      const marker = window.innerHeight * 0.35;
      let current = "";

      links.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section && section.getBoundingClientRect().top <= marker) {
          current = link.id;
        }
      });

      setActive(current);

      const headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 84;
      const probe = window.scrollY + headerHeight;
      let nextTheme: HeaderTheme = "dark";

      document
        .querySelectorAll<HTMLElement>("[data-header-theme]")
        .forEach((section) => {
          const top = section.getBoundingClientRect().top + window.scrollY;
          const bottom = top + section.offsetHeight;
          if (top <= probe && bottom > probe) {
            nextTheme =
              section.dataset.headerTheme === "light" ? "light" : "dark";
          }
        });

      setTheme(nextTheme);
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
      const menu = menuRef.current;
      const initial =
        menu?.querySelector<HTMLAnchorElement>(".mobile-link.is-active") ??
        menu?.querySelector<HTMLAnchorElement>(".mobile-link");
      initial?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggle?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
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
          theme === "light" ? "is-light" : "",
          menuOpen ? "is-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header-inner">
          <Wordmark />

          <nav className="desktop-nav" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link${active === link.id ? " is-active" : ""}`}
                aria-current={active === link.id ? "location" : undefined}
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

      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-menu-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-link${active === link.id ? " is-active" : ""}`}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span>{link.label}</span>
              <span className="mobile-link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
        <div className="mobile-menu-foot">
          <a href="mailto:justin@attiteud.com">justin@attiteud.com</a>
          <span>Independent technology company</span>
        </div>
      </nav>
    </>
  );
}
