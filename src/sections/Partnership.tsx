import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const humblStats = [
  { key: "partnership_stat_1", icon: "⏱" },
  { key: "partnership_stat_2", icon: "◆" },
  { key: "partnership_stat_3", icon: "▲" },
  { key: "partnership_stat_4", icon: "∞" },
];

interface PartnershipProps {
  onScrollTo: (id: string) => void;
}

export default function Partnership({ onScrollTo }: PartnershipProps) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      const trig = gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    }

    [logoRef, bodyRef, statsRef, ctaRef].forEach((ref) => {
      if (ref.current) {
        const trig = gsap.fromTo(ref.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
          }
        );
        if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
      }
    });

    return () => { triggers.forEach((trig) => trig.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partnership"
      data-dark-section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 140px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(8, 8, 8, 0.78)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <div ref={headerRef} style={{ marginBottom: 36, opacity: 0 }}>
          <span
            className="font-mono uppercase block"
            style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
          >
            {t("partnership_label")}
          </span>

          {/* Logo row */}
          <div
            ref={logoRef}
            className="flex items-center justify-center"
            style={{ gap: 16, marginBottom: 28, opacity: 0 }}
          >
            <span
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(22px, 3vw, 30px)",
                color: "#e8e4dc",
                letterSpacing: "0.02em",
              }}
            >
              ✽Attiteud<span style={{ opacity: 0.5 }}>.</span>
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: "clamp(14px, 2vw, 20px)",
                fontWeight: 400,
                color: "#7a746d",
                letterSpacing: "0.04em",
              }}
            >
              ×
            </span>
            <a
              href="https://humbldesign.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-105"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <img
                src="/humbl-logo-white.svg"
                alt="Humbl Design"
                style={{
                  height: "clamp(20px, 2.5vw, 28px)",
                  width: "auto",
                }}
              />
            </a>
          </div>

          <p
            className="font-sans"
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#7a746d",
              maxWidth: "44ch",
              margin: "12px auto 0",
            }}
          >
            {t("partnership_subtitle")}
          </p>
        </div>

        <div ref={bodyRef} style={{ opacity: 0, marginBottom: 40 }}>
          <p
            className="font-sans"
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "#7a746d",
              maxWidth: "54ch",
              margin: "0 auto",
            }}
          >
            {t("partnership_body")}
          </p>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 12, marginBottom: 40, opacity: 0 }}
        >
          {humblStats.map((stat) => (
            <div
              key={stat.key}
              style={{
                padding: "24px 16px",
                border: "1px solid rgba(232, 228, 220, 0.06)",
                transition: "border-color 0.4s ease, background-color 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(196, 92, 38, 0.3)";
                e.currentTarget.style.backgroundColor = "rgba(196, 92, 38, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232, 228, 220, 0.06)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                className="font-sans"
                style={{
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  fontWeight: 400,
                  color: "#e8a87c",
                  marginBottom: 8,
                  lineHeight: 1,
                }}
              >
                {stat.icon}
              </div>
              <span
                className="font-sans"
                style={{ fontSize: 12, lineHeight: 1.45, color: "#7a746d" }}
              >
                {t(stat.key)}
              </span>
            </div>
          ))}
        </div>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <a
            href="https://humbldesign.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans transition-all duration-300 inline-block"
            style={{
              padding: "14px 36px",
              backgroundColor: "#e8e4dc",
              color: "#1e1c18",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              letterSpacing: "0.01em",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c45c26";
              e.currentTarget.style.color = "#f0ebe3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#e8e4dc";
              e.currentTarget.style.color = "#1e1c18";
            }}
          >
            {t("partnership_btn")}
          </a>
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("capabilities")} />
    </section>
  );
}
