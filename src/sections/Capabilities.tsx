import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const capKeys = [
  { titleKey: "cap_1_title", descKey: "cap_1_desc" },
  { titleKey: "cap_2_title", descKey: "cap_2_desc" },
  { titleKey: "cap_3_title", descKey: "cap_3_desc" },
];

interface CapabilitiesProps {
  onScrollTo: (id: string) => void;
}

export default function Capabilities({ onScrollTo }: CapabilitiesProps) {
  const { t } = useLang();
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
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 140px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(240, 235, 227, 0.72)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div ref={headerRef} style={{ marginBottom: 48, opacity: 0 }}>
          <span
            className="font-mono uppercase block"
            style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
          >
            {t("capabilities_label")}
          </span>
          <FlashingText
            text={t("capabilities_heading")}
            flashColor="#c45c26"
            as="h2"
            style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#1e1c18",
            }}
          />
        </div>

        <div className="flex flex-col" style={{ gap: 0 }}>
          {capKeys.map((cap, i) => (
            <div
              key={cap.titleKey}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                borderTop: "1px solid rgba(30, 28, 24, 0.08)",
                padding: "32px 0",
                opacity: 0,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start" style={{ gap: 24 }}>
                <span
                  className="font-mono flex-shrink-0"
                  style={{
                    fontSize: 12,
                    color: "rgba(30, 28, 24, 0.18)",
                    width: 32,
                    paddingTop: 4,
                  }}
                >
                  0{i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <FlashingText
                    text={t(cap.titleKey)}
                    flashColor="#c45c26"
                    as="h3"
                    style={{
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: "#1e1c18",
                      marginBottom: 6,
                    }}
                  />
                  <p
                    className="font-sans"
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "#6b6560",
                      maxWidth: "48ch",
                    }}
                  >
                    {t(cap.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("pricing")} />
    </section>
  );
}
