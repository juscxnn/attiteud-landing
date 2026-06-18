import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const departments = [
  { name: "BD & Prospecting", tag: "Autonomous outreach", pain: "An AI agent researches across regions, preps outreach, handles email responses, and drafts agreements. Your team sells instead of admin-ing." },
  { name: "Sales", tag: "More selling", pain: "Reps lose hours to research and admin. AI handles prep work so they sell more and type less." },
  { name: "Customer Success", tag: "Faster resolution", pain: "A self-learning agent embeds with your team's knowledge, reduces tickets by 20%, and responds in under 5 minutes." },
  { name: "Operations", tag: "Cross-functional sync", pain: "An ops agent syncs logic across all functions, keeps teams aligned, and delivers daily intelligence without meetings." },
  { name: "Marketing", tag: "Scale output", pain: "Every campaign needs variations and wraps. AI handles production so strategy stays human." },
  { name: "Product & Engineering", tag: "Ship faster", pain: "AI agents handle competitive research, documentation, and ticket triage so teams ship 2x faster — even remotely." },
];

interface UseCasesProps {
  onScrollTo: (id: string) => void;
}

export default function UseCases({ onScrollTo }: UseCasesProps) {
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
      id="use-cases"
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
            Where We Help
          </span>
          <FlashingText
            text="By department"
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
          <p
            className="font-sans"
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#7a746d",
              maxWidth: "42ch",
              margin: "12px auto 0",
            }}
          >
            Off-the-shelf tools where they work. Custom agents where they do not. Deployed into Finance, Sales, Ops, Legal, Marketing, and Product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 12 }}>
          {departments.map((dept, i) => (
            <div
              key={dept.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group"
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
              <div className="flex items-baseline justify-between" style={{ marginBottom: 10 }}>
                <FlashingText
                  text={dept.name}
                  flashColor="#c45c26"
                  baseColor="#e8e4dc"
                  as="h3"
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: "#e8e4dc" }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: 10, letterSpacing: "0.06em", color: "#7a9e7e", textTransform: "uppercase" }}
                >
                  {dept.tag}
                </span>
              </div>
              <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.55, color: "#7a746d" }}>
                {dept.pain}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("contact")} />
    </section>
  );
}
