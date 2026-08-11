import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";

gsap.registerPlugin(ScrollTrigger);

export default function Founders() {
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
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.15,
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      if (trig.scrollTrigger) triggers.push(trig.scrollTrigger);
    });

    return () => { triggers.forEach((trig) => trig.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founders"
      data-dark-section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 120px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(8, 8, 8, 0.78)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 56, opacity: 0 }}>
          <span
            className="font-mono uppercase block"
            style={{ fontSize: 13, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16 }}
          >
            {t("founders_label")}
          </span>
          <FlashingText
            text={t("founders_heading")}
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

        <div className="flex flex-col md:flex-row justify-center" style={{ gap: "clamp(32px, 5vw, 64px)" }}>
          {/* Justin Chua */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            style={{
              flex: 1,
              maxWidth: 360,
              textAlign: "center",
              opacity: 0,
            }}
          >
            <div
              style={{
                width: "clamp(100px, 14vw, 140px)",
                height: "clamp(100px, 14vw, 140px)",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 20px",
                border: "2px solid rgba(232, 228, 220, 0.08)",
              }}
            >
              <img
                src="/justin-pp-gatekeep.png"
                alt="Justin Chua"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(30%)",
                }}
              />
            </div>
            <h3
              className="font-sans"
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#e8e4dc",
                lineHeight: 1.3,
                marginBottom: 4,
              }}
            >
              {t("founders_justin_name")}
            </h3>
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "#c45c26",
                marginBottom: 12,
              }}
            >
              {t("founders_justin_role")}
            </span>
            <p
              className="font-sans"
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "#7a746d",
                maxWidth: "32ch",
                margin: "0 auto",
              }}
            >
              {t("founders_justin_bio")}
            </p>
          </div>

          {/* David Pokorny */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            style={{
              flex: 1,
              maxWidth: 360,
              textAlign: "center",
              opacity: 0,
            }}
          >
            <div
              style={{
                width: "clamp(100px, 14vw, 140px)",
                height: "clamp(100px, 14vw, 140px)",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 20px",
                border: "2px solid rgba(232, 228, 220, 0.08)",
              }}
            >
              <img
                src="/david-pokorny.png"
                alt="David Pokorny"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(30%)",
                }}
              />
            </div>
            <h3
              className="font-sans"
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#e8e4dc",
                lineHeight: 1.3,
                marginBottom: 4,
              }}
            >
              {t("founders_david_name")}
            </h3>
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "#c45c26",
                marginBottom: 12,
              }}
            >
              {t("founders_david_role")}
            </span>
            <p
              className="font-sans"
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "#7a746d",
                maxWidth: "32ch",
                margin: "0 auto",
              }}
            >
              {t("founders_david_bio")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
