import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlashingText from "../components/FlashingText";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const children = Array.from(contentRef.current.children);
    const triggers: ScrollTrigger[] = [];

    children.forEach((child, i) => {
      const t = gsap.fromTo(child,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    if (calRef.current) {
      const t = gsap.fromTo(calRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: calRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    const existingScript = document.getElementById("tidycal-embed-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "tidycal-embed-script";
      script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 14vh, 160px) clamp(20px, 4vw, 64px) clamp(40px, 6vh, 80px)",
        backgroundColor: "rgba(240, 235, 227, 0.72)",
      }}
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center"
        style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: "0.18em", color: "#c45c26", marginBottom: 20, opacity: 0 }}
        >
          Start Here
        </span>

        <FlashingText
          text="Ready to move forward?"
          flashColor="#c45c26"
          as="h2"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#1e1c18",
            marginBottom: 12,
          }}
        />

        <p
          className="font-sans"
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "#6b6560",
            marginBottom: 28,
            maxWidth: "38ch",
            opacity: 0,
          }}
        >
          Book a 30-minute call. We will diagnose your biggest AI opportunity.
        </p>

        <div style={{ opacity: 0 }}>
          <a
            href="mailto:justin@attiteud.com"
            className="font-mono transition-all duration-300"
            style={{
              fontSize: 14,
              color: "#1e1c18",
              textDecoration: "none",
              borderBottom: "1px solid rgba(30, 28, 24, 0.2)",
              paddingBottom: 2,
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = "#c45c26";
              e.currentTarget.style.color = "#c45c26";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = "rgba(30, 28, 24, 0.2)";
              e.currentTarget.style.color = "#1e1c18";
            }}
          >
            justin@attiteud.com
          </a>
        </div>
      </div>

      <div
        ref={calRef}
        style={{ maxWidth: 600, margin: "40px auto 0", opacity: 0 }}
      >
        <div
          className="tidycal-embed"
          data-path="attiteud/chat"
          style={{ width: "100%" }}
        />
      </div>
    </section>
  );
}
