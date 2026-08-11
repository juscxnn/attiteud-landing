import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "React", "TypeScript", "Node.js", "Python",
  "Next.js", "Tailwind CSS", "PostgreSQL", "Vercel",
  "Figma", "Webflow", "GSAP", "OpenAI",
  "LangChain", "Stripe", "Resend", "Supabase",
];

export default function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const trigger = gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none none" },
      }
    );
    return () => { if (trigger.scrollTrigger) trigger.scrollTrigger.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-dark-section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(40px, 8vh, 80px) 0",
        backgroundColor: "rgba(8, 8, 8, 0.78)",
        overflow: "hidden",
        opacity: 0,
      }}
    >
      <div
        className="font-mono uppercase"
        style={{
          textAlign: "center",
          fontSize: 14,
          letterSpacing: "0.18em",
          color: "rgba(122, 116, 109, 0.5)",
          marginBottom: "clamp(20px, 3vh, 36px)",
        }}
      >
        Built with
      </div>

      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <div
          className="flex"
          style={{
            gap: "clamp(24px, 4vw, 48px)",
            animation: "marquee 30s linear infinite",
            width: "max-content",
            paddingRight: "clamp(24px, 4vw, 48px)",
          }}
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-mono whitespace-nowrap"
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                letterSpacing: "0.04em",
                color: i % 3 === 0 ? "#c45c26" : i % 3 === 1 ? "#7a9e7e" : "rgba(232, 228, 220, 0.4)",
                transition: "color 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#e8e4dc"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = i % 3 === 0 ? "#c45c26" : i % 3 === 1 ? "#7a9e7e" : "rgba(232, 228, 220, 0.4)";
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
