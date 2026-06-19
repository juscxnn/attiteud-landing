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
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(line1.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.4")
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
        <span
          ref={labelRef}
          className="font-mono uppercase"
          style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#c45c26",
            marginBottom: "clamp(16px, 3vw, 32px)",
            opacity: 0,
            transform: "translateY(12px)",
          }}
        >
          {t("hero_label")}
        </span>

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
            fontSize: "clamp(13px, 1.3vw, 17px)",
            lineHeight: 1.55,
            letterSpacing: "0.01em",
            color: "#6b6560",
            maxWidth: "46ch",
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
              fontSize: "clamp(13px, 1.1vw, 14px)",
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
            onClick={() => onScrollTo("capabilities")}
            className="font-sans transition-all duration-300 w-full sm:w-auto"
            style={{
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: "#1e1c18",
              border: "1px solid rgba(30,28,24,0.18)",
              cursor: "pointer",
              fontSize: "clamp(13px, 1.1vw, 14px)",
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
