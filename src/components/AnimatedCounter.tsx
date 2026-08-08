import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function parseNumericValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: raw };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export default function AnimatedCounter({ value, duration = 1.5, style }: AnimatedCounterProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const { prefix, num, suffix } = parseNumericValue(value);
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(num * eased);
            const formatted = prefix + current.toLocaleString() + suffix;
            setDisplay(formatted);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="font-sans" style={style}>
      {display}
    </div>
  );
}
