import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  onClick: () => void;
}

export default function SectionDivider({ onClick }: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const tween = gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 93%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center"
      style={{
        position: "relative",
        zIndex: 5,
        padding: "32px 0 0",
        opacity: 0,
      }}
    >
      {/* Subtle line */}
      <div
        style={{
          width: "100%",
          maxWidth: 200,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232, 168, 124, 0.2) 50%, transparent 100%)",
          marginBottom: 16,
        }}
      />

      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "8px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          transition: "all 0.3s ease",
        }}
      >
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 9,
            letterSpacing: "0.22em",
            color: hovered ? "#e8a87c" : "rgba(232, 168, 124, 0.6)",
            transition: "color 0.3s ease",
          }}
        >
          Continue
        </span>
        <span
          style={{
            fontSize: 26,
            lineHeight: 1,
            color: "#e8a87c",
            display: "inline-block",
            animation: "spinAsterisk 16s linear infinite",
            transformOrigin: "center center",
            filter: hovered
              ? "drop-shadow(0 0 6px rgba(232, 168, 124, 0.5))"
              : "none",
            transition: "filter 0.3s ease",
          }}
        >
          ✽
        </span>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          style={{
            opacity: hovered ? 0.9 : 0.4,
            transform: hovered ? "translateY(2px)" : "translateY(0)",
            transition: "all 0.25s ease",
          }}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="#e8a87c"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <style>{`
        @keyframes spinAsterisk {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
