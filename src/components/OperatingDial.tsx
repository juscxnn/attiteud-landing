import { useEffect, useState } from "react";
import Asterisk from "./Asterisk";

const steps = [
  { number: "01", label: "Develop", angle: -90 },
  { number: "02", label: "Own", angle: 30 },
  { number: "03", label: "Operate", angle: 150 },
];

const polar = (radius: number, angle: number) => {
  const radians = (angle * Math.PI) / 180;
  return [300 + Math.cos(radians) * radius, 300 + Math.sin(radians) * radius];
};

const arc = (radius: number, start: number, end: number) => {
  const [x1, y1] = polar(radius, start);
  const [x2, y2] = polar(radius, end);
  const large = end - start > 180 ? 1 : 0;
  return `M${x1} ${y1}A${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
};

const ticks = Array.from({ length: 60 }, (_, index) => {
  const angle = index * 6 - 90;
  const [x1, y1] = polar(252, angle);
  const [x2, y2] = polar(index % 5 === 0 ? 241 : 247, angle);
  return { index, x1, y1, x2, y2, major: index % 5 === 0 };
});

export default function OperatingDial() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 3600);

    return () => window.clearTimeout(timer);
  }, [active, paused, reduced]);

  const select = (index: number) => {
    setActive(index);
  };

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div
      className="dial"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !event.currentTarget.contains(next)) resume();
      }}
    >
      <svg
        className="dial-art"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle className="dial-outer" cx="300" cy="300" r="252" />
        <circle className="dial-dashed" cx="300" cy="300" r="232" />
        <circle className="dial-track" cx="300" cy="300" r="212" />
        <circle className="dial-inner" cx="300" cy="300" r="150" />

        <g className="dial-ticks">
          {ticks.map((tick) => (
            <line
              key={tick.index}
              className={tick.major ? "is-major" : ""}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
            />
          ))}
        </g>

        <g className="dial-arcs">
          {steps.map((step, index) => {
            const next = steps[(index + 1) % steps.length];
            const end = next.angle < step.angle ? next.angle + 360 : next.angle;
            return (
              <path
                key={step.number}
                className={`dial-arc${active === index ? " is-active" : ""}`}
                d={arc(212, step.angle, end)}
              />
            );
          })}
        </g>

        <g className="dial-pulse">
          <circle cx="300" cy="48" r="2.4" />
        </g>

        <g className="dial-nodes">
          {steps.map((step, index) => {
            const [x, y] = polar(212, step.angle);
            return (
              <g
                key={step.number}
                className={`dial-node${active === index ? " is-active" : ""}`}
              >
                <circle className="dial-node-ring" cx={x} cy={y} r="15" />
                <circle className="dial-node-dot" cx={x} cy={y} r="4.4" />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="dial-mark">
        <Asterisk className="dial-asterisk" />
      </div>

      <div className="dial-steps">
        {steps.map((step, index) => {
          const [x, y] = polar(280, step.angle);
          return (
            <button
              key={step.number}
              type="button"
              className={`dial-step${active === index ? " is-active" : ""}`}
              style={{ left: `${x / 6}%`, top: `${y / 6}%` }}
              aria-pressed={active === index}
              onPointerEnter={() => select(index)}
              onFocus={() => select(index)}
              onClick={() => select(index)}
            >
              <span className="dial-step-number">{step.number}</span>
              <span className="dial-step-name">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
