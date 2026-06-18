import { useEffect, useState } from "react";

import { useLang } from "../hooks/useLang";
import LanguageToggle from "../components/LanguageToggle";

interface NavigationProps {
  onScrollTo: (id: string) => void;
}

export default function Navigation({ onScrollTo }: NavigationProps) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [inDark, setInDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      setMenuOpen(false);

      const darkEls = document.querySelectorAll("[data-dark-section]");
      let isInDark = false;
      const center = y + window.innerHeight / 2;
      darkEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + y;
        const bottom = top + r.height;
        if (center >= top && center <= bottom) isInDark = true;
      });
      setInDark(isInDark);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav_work"), id: "capabilities" },
    { label: t("nav_contact"), id: "contact" },
  ];

  const textColor = inDark ? "#e8e4dc" : "#1e1c18";
  const bgColor = scrolled
    ? inDark
      ? "rgba(10, 10, 10, 0.82)"
      : "rgba(240, 235, 227, 0.85)"
    : "transparent";

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between transition-all duration-500"
      style={{
        zIndex: 100,
        height: 72,
        paddingLeft: "clamp(20px, 4vw, 64px)",
        paddingRight: "clamp(20px, 4vw, 64px)",
        backgroundColor: menuOpen
          ? inDark
            ? "rgba(10, 10, 10, 0.96)"
            : "rgba(240, 235, 227, 0.98)"
          : bgColor,
        backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px) saturate(160%)" : "none",
      }}
    >
      <button
        onClick={() => { onScrollTo("top"); setMenuOpen(false); }}
        className="transition-opacity duration-300 hover:opacity-50"
        style={{
          color: textColor,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 26,
          letterSpacing: "0.02em",
          display: "flex",
          alignItems: "center",
          zIndex: 102,
        }}
      >
        <span style={{ fontSize: 30, lineHeight: 1, marginRight: 3 }}>✽</span>
        <span>Attiteud</span>
        <span style={{ opacity: 0.5 }}>.</span>
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center" style={{ gap: 32 }}>
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => onScrollTo(link.id)}
            className="font-sans text-sm relative group transition-opacity duration-300 hover:opacity-50"
            style={{ color: textColor, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.01em" }}
          >
            {link.label}
            <span
              className="absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300"
              style={{ height: 1, backgroundColor: textColor, bottom: -2 }}
            />
          </button>
        ))}
        <LanguageToggle />
        <a
          href="https://tidycal.com/attiteud/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm transition-all duration-300"
          style={{
            padding: "10px 22px",
            backgroundColor: inDark ? "#e8e4dc" : "#1e1c18",
            color: inDark ? "#1e1c18" : "#f0ebe3",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.01em",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {t("nav_cta")}
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 5,
          padding: 8,
          zIndex: 102,
        }}
        aria-label="Toggle menu"
      >
        <span
          style={{
            width: 22,
            height: 1.5,
            backgroundColor: textColor,
            transition: "all 0.3s ease",
            transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
          }}
        />
        <span
          style={{
            width: 22,
            height: 1.5,
            backgroundColor: textColor,
            transition: "all 0.3s ease",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            width: 22,
            height: 1.5,
            backgroundColor: textColor,
            transition: "all 0.3s ease",
            transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
          }}
        />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col items-center justify-center"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 101,
            backgroundColor: inDark ? "rgba(10, 10, 10, 0.98)" : "rgba(240, 235, 227, 0.98)",
            backdropFilter: "blur(20px)",
            gap: 32,
          }}
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { onScrollTo(link.id); setMenuOpen(false); }}
              className="font-sans transition-opacity duration-300 hover:opacity-60"
              style={{
                color: textColor,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 22,
                letterSpacing: "-0.01em",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://tidycal.com/attiteud/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans transition-all duration-300"
            style={{
              padding: "12px 32px",
              backgroundColor: inDark ? "#e8e4dc" : "#1e1c18",
              color: inDark ? "#1e1c18" : "#f0ebe3",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              letterSpacing: "0.01em",
              textDecoration: "none",
              display: "inline-block",
              marginTop: 8,
            }}
          >
            {t("nav_cta")}
          </a>
          <div style={{ marginTop: 16 }}>
            <LanguageToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
