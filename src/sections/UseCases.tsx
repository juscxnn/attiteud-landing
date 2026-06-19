import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../hooks/useLang";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const deptKeys = [
  { id: "bd", nameKey: "uc_bd_name", tagKey: "uc_bd_tag", painKey: "uc_bd_pain" },
  { id: "sales", nameKey: "uc_sales_name", tagKey: "uc_sales_tag", painKey: "uc_sales_pain" },
  { id: "cs", nameKey: "uc_cs_name", tagKey: "uc_cs_tag", painKey: "uc_cs_pain" },
  { id: "ops", nameKey: "uc_ops_name", tagKey: "uc_ops_tag", painKey: "uc_ops_pain" },
  { id: "marketing", nameKey: "uc_marketing_name", tagKey: "uc_marketing_tag", painKey: "uc_marketing_pain" },
  { id: "product", nameKey: "uc_product_name", tagKey: "uc_product_tag", painKey: "uc_product_pain" },
];

interface UseCasesProps {
  onScrollTo: (id: string) => void;
}

export default function UseCases({ onScrollTo }: UseCasesProps) {
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
            {t("usecases_label")}
          </span>
          <FlashingText
            text={t("usecases_heading")}
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
            {t("usecases_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 12 }}>
          {deptKeys.map((dept, i) => (
            <div
              key={dept.id}
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
                  text={t(dept.nameKey)}
                  flashColor="#c45c26"
                  baseColor="#e8e4dc"
                  as="h3"
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: "#e8e4dc" }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: 10, letterSpacing: "0.06em", color: "#7a9e7e", textTransform: "uppercase" }}
                >
                  {t(dept.tagKey)}
                </span>
              </div>
              <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.55, color: "#7a746d" }}>
                {t(dept.painKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("research")} />
    </section>
  );
}
