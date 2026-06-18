import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { figure: "$15.7T", label: "Added to global GDP by 2030", source: "McKinsey" },
  { figure: "~40%", label: "Productivity uplift from AI teams", source: "Accenture" },
  { figure: "74%", label: "Of SMEs have no AI strategy", source: "Gartner" },
  { figure: "~30%", label: "Reduction in back-office time", source: "Deloitte" },
  { figure: "70%", label: "Of AI projects never ship", source: "McKinsey" },
  { figure: "18mo", label: "Typical payback period", source: "PwC" },
];

interface ResearchProps {
  onScrollTo: (id: string) => void;
}

export default function Research({ onScrollTo }: ResearchProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      const t = gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    cardsRef.current.filter(Boolean).forEach((card, i) => {
      const t = gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.06,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    return () => { triggers.forEach((t) => t.kill()); };
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
            style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
          >
            The Market
          </span>
          <FlashingText
            text="The numbers speak"
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

        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 12 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                padding: "28px 20px",
                border: "1px solid rgba(232, 228, 220, 0.06)",
                opacity: 0,
                transition: "border-color 0.4s ease, background-color 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232, 228, 220, 0.14)";
                e.currentTarget.style.backgroundColor = "rgba(232, 228, 220, 0.025)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232, 228, 220, 0.06)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                className="font-sans"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#e8a87c",
                  marginBottom: 10,
                }}
              >
                {stat.figure}
              </div>
              <p
                className="font-sans"
                style={{ fontSize: 13, lineHeight: 1.5, color: "#e8e4dc", marginBottom: 6 }}
              >
                {stat.label}
              </p>
              <span
                className="font-mono"
                style={{ fontSize: 10, letterSpacing: "0.06em", color: "#5a544f", textTransform: "uppercase" }}
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
