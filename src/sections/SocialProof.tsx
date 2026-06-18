import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const clientKeys = [
  {
    id: "nichesim",
    logo: "/nichesim-logo.png",
    nameKey: "client_nichesim_name",
    tagKey: "client_nichesim_tag",
    storyKey: "client_nichesim_story",
    metricsKey: "client_nichesim_metrics",
  },
  {
    id: "gaib",
    logo: "/gaib-logo.png",
    nameKey: "client_gaib_name",
    tagKey: "client_gaib_tag",
    storyKey: "client_gaib_story",
    metricsKey: "client_gaib_metrics",
  },
  {
    id: "confidential",
    logo: null,
    nameKey: "client_confidential_name",
    tagKey: "client_confidential_tag",
    storyKey: "client_confidential_story",
    metricsKey: "client_confidential_metrics",
  },
];

interface SocialProofProps {
  onScrollTo: (id: string) => void;
}

export default function SocialProof({ onScrollTo }: SocialProofProps) {
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
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.12,
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
      id="clients"
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
            {t("clients_label")}
          </span>
          <FlashingText
            text={t("clients_heading")}
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
            {t("clients_subtitle")}
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: 0 }}>
          {clientKeys.map((client, i) => (
            <div
              key={client.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                borderTop: "1px solid rgba(232, 228, 220, 0.06)",
                padding: "clamp(32px, 4vh, 48px) 0",
                opacity: 0,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start" style={{ gap: 24 }}>
                {/* Logo / name area */}
                <div className="flex-shrink-0" style={{ width: 140, minHeight: 40 }}>
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={t(client.nameKey)}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 40,
                        objectFit: "contain",
                        filter: client.id === "nichesim" ? "invert(1)" : "none",
                      }}
                    />
                  ) : (
                    <span
                      className="font-sans"
                      style={{ fontSize: 14, fontWeight: 500, color: "#e8e4dc", letterSpacing: "0.01em" }}
                    >
                      {t(client.nameKey)}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div className="flex items-baseline flex-wrap" style={{ gap: 12, marginBottom: 10 }}>
                    <FlashingText
                      text={t(client.nameKey)}
                      flashColor="#c45c26"
                      baseColor="#e8e4dc"
                      as="h3"
                      style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: "#e8e4dc" }}
                    />
                    <span
                      className="font-mono"
                      style={{ fontSize: 10, letterSpacing: "0.06em", color: "#7a9e7e", textTransform: "uppercase" }}
                    >
                      {t(client.tagKey)}
                    </span>
                  </div>

                  <p
                    className="font-sans"
                    style={{ fontSize: 13, lineHeight: 1.55, color: "#7a746d", maxWidth: "50ch", marginBottom: 12 }}
                  >
                    {t(client.storyKey)}
                  </p>

                  <div className="flex flex-wrap" style={{ gap: 8 }}>
                    {t(client.metricsKey).split(",").map((metric) => (
                      <span
                        key={metric.trim()}
                        className="font-mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          color: "#7a9e7e",
                          textTransform: "uppercase",
                          border: "1px solid rgba(122, 158, 126, 0.3)",
                          padding: "4px 10px",
                        }}
                      >
                        {metric.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("approach")} />
    </section>
  );
}
