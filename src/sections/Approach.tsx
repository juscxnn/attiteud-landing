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
      const t = gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    stepsRef.current.filter(Boolean).forEach((step) => {
      const t = gsap.fromTo(step,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 87%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    return () => { triggers.forEach((t) => t.kill()); };
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
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 56, opacity: 0 }}>
          <span
            className="font-mono uppercase block"
            style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(24px, 3vw, 40px)" }}>
          {stepKeys.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="flex"
              style={{ gap: 16, opacity: 0 }}
            >
              <span
                className="font-mono flex-shrink-0"
                style={{ fontSize: 11, letterSpacing: "0.06em", color: "rgba(232, 228, 220, 0.18)", width: 22, paddingTop: 3 }}
              >
                {step.number}
              </span>
              <div>
                <FlashingText
                  text={t(step.titleKey)}
                  flashColor="#c45c26"
                  baseColor="#e8e4dc"
                  as="h3"
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.35, color: "#e8e4dc", marginBottom: 6 }}
                />
                <p className="font-sans" style={{ fontSize: 14, lineHeight: 1.6, color: "#7a746d", maxWidth: "36ch" }}>
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("pricing")} />
    </section>
  );
}
