import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "nichesim",
    url: "https://nichesim.com",
    nameKey: "client_nichesim_name",
    tagKey: "client_nichesim_tag",
    onelinerKey: "client_nichesim_oneliner",
    bgAccent: "rgba(196, 92, 38, 0.05)",
    borderAccent: "rgba(196, 92, 38, 0.15)",
  },
  {
    id: "copyscouts",
    url: "#",
    nameKey: "client_copyscouts_name",
    tagKey: "client_copyscouts_tag",
    onelinerKey: "client_copyscouts_oneliner",
    bgAccent: "rgba(122, 158, 126, 0.05)",
    borderAccent: "rgba(122, 158, 126, 0.15)",
  },
  {
    id: "podletter",
    url: "#",
    nameKey: "client_podletter_name",
    tagKey: "client_podletter_tag",
    onelinerKey: "client_podletter_oneliner",
    bgAccent: "rgba(232, 168, 124, 0.05)",
    borderAccent: "rgba(232, 168, 124, 0.15)",
  },
  {
    id: "gatekeep",
    url: "https://gatekeep.vc",
    nameKey: "client_gatekeep_name",
    tagKey: "client_gatekeep_tag",
    onelinerKey: "client_gatekeep_oneliner",
    bgAccent: "rgba(196, 92, 38, 0.05)",
    borderAccent: "rgba(196, 92, 38, 0.15)",
  },
];

interface SocialProofProps {
  onScrollTo: (id: string) => void;
}

export default function SocialProof({ onScrollTo }: SocialProofProps) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 + i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    });

    return () => { triggers.forEach((trig) => trig.kill()); };
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
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 48, opacity: 0 }}>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "clamp(8px, 1vw, 12px)" }}>
          {projects.map((project, i) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                display: "block",
                padding: "clamp(18px, 2.5vh, 24px) clamp(16px, 2vw, 20px)",
                border: "1px solid rgba(232, 228, 220, 0.06)",
                textDecoration: "none",
                opacity: 0,
                transition: "border-color 0.4s ease, background-color 0.4s ease, transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.borderAccent;
                e.currentTarget.style.backgroundColor = project.bgAccent;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232, 228, 220, 0.06)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 13,
                    color: "#e8e4dc",
                    letterSpacing: "0.02em",
                    transition: "color 0.3s ease",
                  }}
                >
                  {t(project.nameKey)}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: project.id === "copyscouts" || project.id === "podletter" ? "#7a9e7e" : "#e8a87c",
                    border: `1px solid ${project.id === "copyscouts" || project.id === "podletter" ? "rgba(122, 158, 126, 0.25)" : "rgba(232, 168, 124, 0.25)"}`,
                    padding: "2px 8px",
                  }}
                >
                  {t(project.tagKey)}
                </span>
              </div>
              <p
                className="font-sans"
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "#7a746d",
                  maxWidth: "32ch",
                }}
              >
                {t(project.onelinerKey)}
              </p>
            </a>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("partnership")} />
    </section>
  );
}
