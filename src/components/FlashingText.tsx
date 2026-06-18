import { useCallback, useEffect, useRef } from "react";

interface FlashingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  flashColor?: string;
  baseColor?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function FlashingText({
  text,
  className = "",
  style = {},
  flashColor = "#c45c26",
  baseColor,
  as: Tag = "span",
}: FlashingTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hoveredRef = useRef<Set<number>>(new Set());
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const flashChar = useCallback(
    (index: number) => {
      const el = charRefs.current[index];
      if (!el || hoveredRef.current.has(index)) return;
      el.style.color = flashColor;
      el.style.transition = "color 0.12s ease";
      hoveredRef.current.add(index);
      setTimeout(() => {
        if (baseColor) el.style.color = baseColor;
        else el.style.removeProperty("color");
        hoveredRef.current.delete(index);
      }, 350);
    },
    [flashColor, baseColor]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientY < rect.top - 20 ||
        e.clientY > rect.bottom + 20
      )
        return;

      charRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.sqrt(
          (e.clientX - cx) ** 2 + (e.clientY - cy) ** 2
        );
        if (dist < 28 && !hoveredRef.current.has(i)) {
          flashChar(i);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [flashChar]);

  const Component = Tag as any;

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{ ...style, cursor: "default" }}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          onMouseEnter={() => flashChar(i)}
          style={{
            display: "inline",
            transition: "color 0.12s ease",
            cursor: "default",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Component>
  );
}
