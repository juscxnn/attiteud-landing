import { useEffect, useRef } from "react";
import { relay } from "@lucasmarkes/hairline";

interface RelayFigureProps {
  active?: boolean;
  intensity?: number;
  theme?: "auto" | "light" | "dark";
  label?: string;
}

export default function RelayFigure({
  active = true,
  intensity = 0.7,
  theme = "dark",
  label = "A shared record: founders and investors move through one system.",
}: RelayFigureProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!active || !element) return;

    const figure = relay(element, { intensity, theme, label });
    return () => figure.destroy();
  }, [active, intensity, theme, label]);

  return (
    <div className="relay-slot">
      <div ref={ref} />
    </div>
  );
}
