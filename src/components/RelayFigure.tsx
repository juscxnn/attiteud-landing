import { useEffect, useRef } from "react";
import { relay } from "@lucasmarkes/hairline";

interface RelayFigureProps {
  intensity?: number;
  theme?: "auto" | "light" | "dark";
  label?: string;
}

export default function RelayFigure({
  intensity = 0.7,
  theme = "dark",
  label = "A shared record: founders and investors move through one system.",
}: RelayFigureProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const figure = relay(element, { intensity, theme, label });
    return () => figure.destroy();
  }, [intensity, theme, label]);

  return <div ref={ref} />;
}
