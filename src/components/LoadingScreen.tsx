import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LETTERS = "Attiteud".split("");
const DELAY_ASTERISK = 400;
const DELAY_LETTER = 120;
const DELAY_HOLD = 600;
const DELAY_FADE = 800;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"asterisk" | "typing" | "hold" | "fade" | "done">("asterisk");
  const [visibleLetters, setVisibleLetters] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phase 1: show asterisk
    const t1 = setTimeout(() => {
      setPhase("typing");
    }, DELAY_ASTERISK);

    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    if (visibleLetters < LETTERS.length) {
      const t = setTimeout(() => {
        setVisibleLetters((n) => n + 1);
      }, DELAY_LETTER);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setPhase("hold");
      }, DELAY_LETTER);
      return () => clearTimeout(t);
    }
  }, [phase, visibleLetters]);

  useEffect(() => {
    if (phase !== "hold") return;

    const t = setTimeout(() => {
      setPhase("fade");
    }, DELAY_HOLD);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fade") return;

    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, DELAY_FADE);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 200,
        backgroundColor: "#f0ebe3",
        transition: phase === "fade" ? "opacity 0.8s ease" : "none",
        opacity: phase === "fade" ? 0 : 1,
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      <div className="flex items-baseline" style={{ gap: 2 }}>
        {/* Asterisk */}
        <span
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1,
            color: "#1e1c18",
            fontFamily: "'Times New Roman', Times, serif",
            opacity: phase === "asterisk" ? 0 : 1,
            transform: phase === "asterisk" ? "scale(0.5)" : "scale(1)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "inline-block",
          }}
        >
          ✽
        </span>

        {/* Typing letters */}
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1,
              color: "#1e1c18",
              fontFamily: "'Times New Roman', Times, serif",
              letterSpacing: "0.01em",
              opacity: i < visibleLetters ? 1 : 0,
              transition: "opacity 0.05s ease",
              display: "inline-block",
            }}
          >
            {letter}
          </span>
        ))}

        {/* Period */}
        <span
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1,
            color: "#1e1c18",
            fontFamily: "'Times New Roman', Times, serif",
            opacity: visibleLetters >= LETTERS.length ? 0.5 : 0,
            transition: "opacity 0.05s ease",
            display: "inline-block",
          }}
        >
          .
        </span>
      </div>
    </div>
  );
}
