import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const includeKeys = [
  "pricing_include_1",
  "pricing_include_2",
  "pricing_include_3",
  "pricing_include_4",
  "pricing_include_5",
  "pricing_include_6",
  "pricing_include_7",
];

interface PricingProps {
  onScrollTo: (id: string) => void;
}

export default function Pricing({ onScrollTo }: PricingProps) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const children = Array.from(contentRef.current.children);
    const triggers: ScrollTrigger[] = [];

    children.forEach((child, i) => {
      const trig = gsap.fromTo(child,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    });

    return () => { triggers.forEach((trig) => trig.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 140px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(240, 235, 227, 0.82)",
      }}
    >
      <div ref={contentRef} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <span
          className="font-mono uppercase block"
          style={{ fontSize: 13, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16, opacity: 0 }}
        >
          {t("pricing_label")}
        </span>

        <FlashingText
          text={t("pricing_heading")}
          flashColor="#c45c26"
          as="h2"
          style={{
            fontSize: "clamp(24px, 3vw, 38px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "#1e1c18",
            marginBottom: 12,
          }}
        />

        <p
          className="font-sans"
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#6b6560",
            maxWidth: "42ch",
            margin: "0 auto 40px",
            opacity: 0,
          }}
        >
          {t("pricing_subtitle")}
        </p>

        <div
          style={{
            border: "1px solid rgba(30, 28, 24, 0.08)",
            padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
            marginBottom: 48,
            opacity: 0,
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)",
            transition: "border-color 0.5s ease, box-shadow 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(196, 92, 38, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(30, 28, 24, 0.08)";
          }}
        >
          {/* Subtle glow */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(ellipse at center, rgba(196, 92, 38, 0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ marginBottom: 32, position: "relative" }}>
            <span
              className="font-sans"
              style={{
                fontSize: "clamp(48px, 7vw, 72px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#1e1c18",
              }}
            >
              $10,000
            </span>
            <span
              className="font-sans"
              style={{ fontSize: 16, color: "#6b6560", marginLeft: 6, letterSpacing: "-0.01em" }}
            >
              /mo
            </span>
          </div>

          <div
            className="flex flex-col items-start"
            style={{
              gap: "clamp(12px, 1.5vh, 14px)",
              maxWidth: 380,
              margin: "0 auto 40px",
              textAlign: "left",
              position: "relative",
            }}
          >
            {includeKeys.map((key) => (
              <div key={key} className="flex items-start group" style={{ gap: 12, transition: "transform 0.3s ease" }}>
                <span
                  style={{
                    fontSize: 14,
                    color: "#7a9e7e",
                    flexShrink: 0,
                    marginTop: 1,
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:scale-110 inline-block"
                >
                  ✓
                </span>
                <span className="font-sans" style={{ fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.5, color: "#6b6560" }}>
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://tidycal.com/attiteud/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans transition-all duration-300 inline-block"
            style={{
              padding: "16px 48px",
              backgroundColor: "#1e1c18",
              color: "#f0ebe3",
              border: "none",
              cursor: "pointer",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              letterSpacing: "0.02em",
              textDecoration: "none",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c45c26";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1e1c18";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("nav_cta")}
          </a>
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("research")} />
    </section>
  );
}
