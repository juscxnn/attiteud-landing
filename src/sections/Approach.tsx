import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const stepKeys = [
  { number: "01", titleKey: "approach_step1_title", descKey: "approach_step1_text" },
  { number: "02", titleKey: "approach_step2_title", descKey: "approach_step2_text" },
  { number: "03", titleKey: "approach_step3_title", descKey: "approach_step3_text" },
  { number: "04", titleKey: "approach_step4_title", descKey: "approach_step4_text" },
];

interface ApproachProps {
  onScrollTo: (id: string) => void;
}

export default function Approach({ onScrollTo }: ApproachProps) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      const trig = gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    }

    stepsRef.current.filter(Boolean).forEach((step) => {
      const trig = gsap.fromTo(step,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    });

    return () => { triggers.forEach((trig) => trig.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      data-dark-section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 140px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(8, 8, 8, 0.78)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 64, opacity: 0 }}>
          <span
            className="font-mono uppercase block"
            style={{ fontSize: 15, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
          >
            {t("approach_label")}
          </span>
          <FlashingText
            text={t("approach_heading")}
            flashColor="#c45c26"
            baseColor="#e8e4dc"
            as="h2"
            style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#e8e4dc",
            }}
          />
        </div>

        <div style={{ position: "relative", paddingLeft: "clamp(32px, 6vw, 60px)" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "clamp(10px, 2vw, 16px)",
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, rgba(196, 92, 38, 0.4), rgba(196, 92, 38, 0.1), rgba(196, 92, 38, 0.4))",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px, 5vh, 56px)" }}>
            {stepKeys.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                style={{
                  position: "relative",
                  opacity: 0,
                  paddingLeft: "clamp(20px, 3vw, 32px)",
                }}
              >
                {/* Dot on timeline */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 4,
                    width: "clamp(8px, 1vw, 12px)",
                    height: "clamp(8px, 1vw, 12px)",
                    borderRadius: "50%",
                    backgroundColor: i === 0 ? "#c45c26" : "rgba(196, 92, 38, 0.4)",
                    transform: "translateX(-50%)",
                    transition: "background-color 0.4s ease, box-shadow 0.4s ease",
                    boxShadow: i === 0 ? "0 0 12px rgba(196, 92, 38, 0.3)" : "none",
                    marginLeft: "clamp(10px, 2vw, 16px)",
                  }}
                />

                {/* Number */}
                <span
                  className="font-mono block"
                  style={{
                    fontSize: "clamp(40px, 5vw, 64px)",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: "rgba(232, 228, 220, 0.06)",
                    position: "absolute",
                    left: "clamp(24px, 3vw, 36px)",
                    top: "-8px",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {step.number}
                </span>

                <FlashingText
                  text={t(step.titleKey)}
                  flashColor="#c45c26"
                  baseColor="#e8e4dc"
                  as="h3"
                  style={{
                    fontSize: "clamp(16px, 1.6vw, 20px)",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#e8e4dc",
                    marginBottom: 6,
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <p
                  className="font-sans"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "#7a746d",
                    maxWidth: "40ch",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("pricing")} />
    </section>
  );
}
