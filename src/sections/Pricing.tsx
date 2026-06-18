import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlashingText from "../components/FlashingText";
import SectionDivider from "../components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  "Full workflow audit",
  "AI strategy & tool selection",
  "Implementation into your systems",
  "Custom agents & automations",
  "Unlimited access to our team",
  "Monthly performance review",
  "Unsubscribe anytime after initial deployment",
];

interface PricingProps {
  onScrollTo: (id: string) => void;
}

export default function Pricing({ onScrollTo }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const children = Array.from(contentRef.current.children);
    const triggers: ScrollTrigger[] = [];

    children.forEach((child, i) => {
      const t = gsap.fromTo(child,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 12vh, 140px) clamp(20px, 4vw, 64px) 0",
        backgroundColor: "rgba(240, 235, 227, 0.82)",
      }}
    >
      <div ref={contentRef} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <span
          className="font-mono uppercase block"
          style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 16, opacity: 0 }}
        >
          Pricing
        </span>

        <FlashingText
          text="One flat fee. Full access."
          flashColor="#c45c26"
          as="h2"
          style={{
            fontSize: "clamp(24px, 3vw, 38px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "#1e1c18",
            marginBottom: 12,
          }}
        />

        <p
          className="font-sans"
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#6b6560",
            maxWidth: "40ch",
            margin: "0 auto 36px",
            opacity: 0,
          }}
        >
          A forward deployment studio for less than a senior hire. Unsubscribe anytime after the initial deployment phase — come back whenever you need us.
        </p>

        <div
          style={{
            border: "1px solid rgba(30, 28, 24, 0.1)",
            padding: "clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)",
            marginBottom: 48,
            opacity: 0,
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <span
              className="font-sans"
              style={{
                fontSize: "clamp(44px, 6vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#1e1c18",
              }}
            >
              $8,000
            </span>
            <span
              className="font-sans"
              style={{ fontSize: 15, color: "#6b6560", marginLeft: 4 }}
            >
              /mo
            </span>
          </div>

          <div
            className="flex flex-col items-start"
            style={{
              gap: 10,
              maxWidth: 340,
              margin: "0 auto 32px",
              textAlign: "left",
            }}
          >
            {includes.map((item) => (
              <div key={item} className="flex items-start" style={{ gap: 10 }}>
                <span style={{ fontSize: 12, color: "#7a9e7e", flexShrink: 0, marginTop: 3 }}>
                  ✓
                </span>
                <span className="font-sans" style={{ fontSize: 13, lineHeight: 1.5, color: "#6b6560" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://tidycal.com/attiteud/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans transition-all duration-300"
            style={{
              padding: "14px 36px",
              backgroundColor: "#1e1c18",
              color: "#f0ebe3",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              letterSpacing: "0.01em",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#c45c26"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e1c18"; }}
          >
            Book a Call
          </a>
        </div>
      </div>

      <SectionDivider onClick={() => onScrollTo("research")} />
    </section>
  );
}
