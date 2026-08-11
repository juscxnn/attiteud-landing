import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import AnimatedCounter from "../components/AnimatedCounter";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { figure: "90%", labelKey: "stat_1_label", source: "CB Insights" },
  { figure: "42%", labelKey: "stat_2_label", source: "CB Insights" },
  { figure: "228%", labelKey: "stat_3_label", source: "DMI" },
  { figure: "3-6mo", labelKey: "stat_4_label", source: "Industry avg" },
  { figure: "2-4wks", labelKey: "stat_5_label", source: "With Attiteud" },
  { figure: "$30K+", labelKey: "stat_6_label", source: "Agency avg" },
];

interface ResearchProps {
  onScrollTo: (id: string) => void;
}

export default function Research({ onScrollTo }: ResearchProps) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.filter(Boolean).forEach((card, i) => {
      const trig = gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.06,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    });

    return () => { triggers.forEach((trig) => trig.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
      data-dark-section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 140px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(8, 8, 8, 0.78)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 56, opacity: 0 }}>
          <span
            className="font-mono uppercase block"
            style={{ fontSize: 13, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
          >
            {t("research_stats_label")}
          </span>
          <FlashingText
            text={t("research_stats_heading")}
            flashColor="#c45c26"
            baseColor="#e8e4dc"
            as="h2"
            style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#e8e4dc",
              margin: "0 auto",
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 2 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.labelKey}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                padding: "clamp(28px, 4vh, 48px) 20px",
                border: "1px solid rgba(232, 228, 220, 0.06)",
                opacity: 0,
                transition: "border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(196, 92, 38, 0.25)";
                e.currentTarget.style.backgroundColor = "rgba(196, 92, 38, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232, 228, 220, 0.06)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <AnimatedCounter
                value={stat.figure}
                duration={1.8}
                style={{
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#e8a87c",
                  marginBottom: 12,
                  fontVariantNumeric: "tabular-nums",
                }}
              />
              <p
                className="font-sans"
                style={{ fontSize: 14, lineHeight: 1.5, color: "#e8e4dc", marginBottom: 8, maxWidth: "24ch" }}
              >
                {t(stat.labelKey)}
              </p>
              <span
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: "0.08em", color: "rgba(90, 84, 79, 0.7)", textTransform: "uppercase" }}
              >
                {stat.source}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("approach")} />
    </section>
  );
}
