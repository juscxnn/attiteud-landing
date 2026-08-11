import { useEffect, useRef } from "react";
import { useLang } from "../hooks/useLang";
import gsap from "gsap";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

interface HeroProps {
  onScrollTo: (id: string) => void;
  loaded: boolean;
}

export default function Hero({ onScrollTo, loaded }: HeroProps) {
  const { t } = useLang();
  const brandRef = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });
    tl.to(brandRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(line1.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.3")
      .to(line2.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.95")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
    return () => { tl.kill(); };
  }, [loaded]);

  return (
    <section
      id="top"
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: "100dvh", zIndex: 1, textAlign: "center" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(240,235,227,0.88) 0%, rgba(240,235,227,0.5) 60%, transparent 100%)",
        }}
      />

      <div
        className="relative flex flex-col items-center w-full"
        style={{
          padding: "0 clamp(20px, 5vw, 48px)",
          maxWidth: "100%",
        }}
      >
        {/* Brand: ✽Attiteud. × Humbl Design */}
        <div
          ref={brandRef}
          className="flex items-center justify-center flex-wrap"
          style={{
            gap: "clamp(8px, 1.5vw, 16px)",
            marginBottom: "clamp(32px, 5vh, 56px)",
            opacity: 0,
            transform: "translateY(12px)",
          }}
        >
          <span
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(24px, 4vw, 48px)",
              lineHeight: 1,
              color: "#1e1c18",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "1.1em", marginRight: 2 }}>✽</span>
            <span>Attiteud</span>
            <span style={{ opacity: 0.5 }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 300,
              color: "#6b6560",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            ×
          </span>
          <a
            href="https://humbldesign.io"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-105"
            style={{
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              top: "clamp(1px, 0.2vw, 3px)",
            }}
          >
            <img
              src="/humbl-logo-white.svg"
              alt="Humbl Design"
              style={{
                height: "clamp(26px, 4.5vw, 50px)",
                width: "auto",
                filter: "brightness(0.12)",
                display: "block",
              }}
            />
          </a>
        </div>

        <h1 className="font-sans" style={{ marginBottom: "clamp(16px, 3vw, 32px)", width: "100%" }}>
          <div
            ref={line1}
            style={{
              fontSize: "clamp(28px, 7vw, 80px)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#1e1c18",
              opacity: 0,
              transform: "translateY(40px)",
              cursor: "default",
            }}
          >
            <FlashingText
              text={t("hero_line1")}
              flashColor="#c45c26"
              as="span"
              style={{
                fontSize: "inherit",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#1e1c18",
              }}
            />
          </div>
          <div
            ref={line2}
            style={{
              fontSize: "clamp(28px, 7vw, 80px)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#1e1c18",
              opacity: 0,
              transform: "translateY(40px)",
              cursor: "default",
            }}
          >
            <FlashingText
              text={t("hero_line2")}
              flashColor="#c45c26"
              as="span"
              style={{
                fontSize: "inherit",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#1e1c18",
              }}
            />
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="font-sans"
          style={{
            fontSize: "clamp(14px, 1.5vw, 18px)",
            lineHeight: 1.55,
            letterSpacing: "0.01em",
            color: "#6b6560",
            maxWidth: "48ch",
            marginBottom: "clamp(24px, 3vw, 40px)",
            opacity: 0,
            transform: "translateY(16px)",
            padding: "0 12px",
          }}
        >
          {t("hero_desc")}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center w-full"
          style={{ gap: "clamp(10px, 1.5vw, 16px)", opacity: 0, transform: "translateY(12px)" }}
        >
          <a
            href="https://tidycal.com/attiteud/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans transition-all duration-300 w-full sm:w-auto"
            style={{
              padding: "14px 32px",
              backgroundColor: "#1e1c18",
              color: "#f0ebe3",
              border: "none",
              cursor: "pointer",
              fontSize: "clamp(14px, 1.1vw, 15px)",
              letterSpacing: "0.01em",
              textDecoration: "none",
              display: "inline-block",
              textAlign: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#c45c26"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e1c18"; }}
          >
            {t("nav_cta")}
          </a>
          <button
            onClick={() => onScrollTo("clients")}
            className="font-sans transition-all duration-300 w-full sm:w-auto"
            style={{
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: "#1e1c18",
              border: "1px solid rgba(30,28,24,0.18)",
              cursor: "pointer",
              fontSize: "clamp(14px, 1.1vw, 15px)",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e1c18";
              e.currentTarget.style.color = "#f0ebe3";
              e.currentTarget.style.borderColor = "#1e1c18";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#1e1c18";
              e.currentTarget.style.borderColor = "rgba(30,28,24,0.18)";
            }}
          >
            {t("hero_explore")}
          </button>
        </div>
      </div>
      <SectionDivider onClick={() => onScrollTo("clients")} />
    </section>
  );
}
